import { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import PerformanceMeter from "./PerformanceMeter";
import { useHistory, useParams } from 'react-router-dom';
import Navbar from "../widgets/Navbar/Navbar";
import './ProfileScore.css'
import { COLORS } from "../../constants/NewColorScheme";
import { SERVER_URL } from "../../constants/NetworkData";

interface scoreTemplate {
  totalScore: string
}
const ProfileMeter = (props: { score: number }) => {
  const url = SERVER_URL + `/userScore/`;

  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [riskProfile, setRiskProfile] = useState("");
  const [overallScore, setOverallScore] = useState(0);
  const scoreBox: scoreTemplate = useParams();
  const history = useHistory();

  if (userName == undefined || userName == '') {
    history.push('/home')
  }

  useEffect(() => {
    console.log('inside useffect: totalScore: ', scoreBox.totalScore);
    setRiskProfileValue();
    setOverallScore(parseInt(scoreBox.totalScore));
  })

  const goToquestionnaire = () => {
    history.push('/questionnaire/retake');
  }

  const goTodashBoard = () => {
    history.push('/newDashboard');
  }

  const setRiskProfileValue = () => {
    if (props.score < 40) {
      setRiskProfile("Low")
    } else if (props.score < 75) {
      setRiskProfile("Moderate")
    } else {
      setRiskProfile("High")
    }
  }

  const postScore = (url: string, data, token: string) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json()).
      then(json => {
        if ('error' in json) {
          alert('network call failed');
          console.log('network call failed', json);
        } else {
          goTodashBoard();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function saveScore() {
    const data = {
      userName: userName,
      riskProfile: riskProfile,
      overallScore: overallScore,
      isAssessmentTaken: true
    };
    postScore(url, data, token);
  }


  return (
    <div className="profile-score-main-outer">

      <Navbar page="risk"></Navbar>
      <div className="profile-score-main">
        <div className="profile-score-header">
          <div className="profile-score-heading-wrapper">
            <label className="profile-score-heading">Risk Profile Summary</label>
            <label className="profile-score-sub-heading">Based on your responses your financial exposure is</label>
          </div>
        </div>

        <div className="profile-score-content">
          <div className="profile-score-performance">
            <PerformanceMeter score={overallScore} />
          </div>

          <div className="profile-score-content-right">
            <div className="profile-score-number">
              <label>{overallScore}</label>
              <label className="profile-score-key-score">Risk Score</label>
            </div>
            <div className="profile-score-text">
              <label>{riskProfile}</label>
              <label className="profile-score-key-profile">Risk Profile</label>
            </div>
          </div>
        </div>

        <div className="profile-score-footer">

          <label onClick={goToquestionnaire} className="profile-score-retake-assessment" style={{ backgroundColor: COLORS.textWarn }}>Retake Assessment</label>
          <label onClick={saveScore} className="profile-score-dashboard" style={{ backgroundColor: COLORS.navbar }}>Go to Dashboard</label>

        </div>


      </div>
    </div >

    // <div className="profileMeter">
    //   <h3>BRAVO!</h3>
    //   <h5>You Have completed the risk profiling.</h5>
    //   <PerformanceMeter score={overallScore} />
    //   <p>Based on your responses your financial exposure is {riskProfile}.</p>
    //   <Button variant="contained" color="secondary" onClick={saveScore}>
    //     CONTINUE
    //   </Button>
    //   <br />
    //   <Button onClick={goToquestionnaire} variant="outlined" color="secondary" size="large">
    //     RETAKE ASSESSMENT
    //   </Button>


    // </div>

  );
};

export default ProfileMeter;
