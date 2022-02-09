import React, { useState, useEffect } from "react";

import QuestionRadio from "./Question/QuestionRadio";
import { Link } from 'react-router-dom';

import {
  qaTemplate,
  QUESTIONS,
  intialScore,
} from "../../model-chakresh/Questionare-static-content";
import InvestingBro from "../Util/InvestingBroImage";
import "./Questionare.css";
import Button from '@material-ui/core/Button';
import Navbar from "../widgets/Navbar/Navbar";
import { COLORS } from "../../constants/NewColorScheme";
import { SERVER_URL } from "../../constants/NetworkData";
import { useHistory } from 'react-router'

const Questionare = (props: { retake }) => {
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(0);
  const [score, setScore] = useState<number[]>(intialScore);
  const [questions, setQuestion] = useState(QUESTIONS);
  const [disable, setDisable] = useState(true);
  const [totalScore, setToalScore] = React.useState<number>(0);
  const [username, setUsername] = useState(localStorage.getItem('userName'));
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(false);

  const history = useHistory()
  if (username == undefined || username == '') {
    history.push('/home')
  }

  useEffect(() => {
    console.log(selectedQuestionCount)
    setToalScore(score.reduce((a, b) => a + b, 0));
    if (selectedQuestionCount === 13) {
      setDisable(false);
    }
  }, [selectedQuestionCount])

  const updateScore = (questionNumber: number, optionScore: number) => {
    const newScores = [...score];
    console.log(`question number: ${questionNumber} , optionScore: ${optionScore}`);
    newScores[questionNumber - 1] = optionScore;
    setScore(newScores);
  };


  const updateCount = () => {
    console.log("inside the updation count method")
    console.log(selectedQuestionCount, "selectedQuestionCount");
    setSelectedQuestionCount(selectedQuestionCount + 1);
  };


  const goToPage = (goTo) => {
    history.push(goTo);
  }

  const fetchUserScore = async (url: string, token: string) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).
      then((resp) => resp.json()).
      then((data) => {

        if (data != undefined && data['overallScore'] != undefined) {
          goToPage('/performance/' + data['overallScore'])
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!props.retake) {
      setLoading(true)
      fetchUserScore(SERVER_URL + '/userScore/' + username, token);
    }
  }, [])

  return (
    <div className="questionnaire-main-outer">

      <Navbar page="risk"></Navbar>
      {!loading && <div className="questionnaire-main">

        <div className="questionnaire-header">
          <div className="questionnaire-heading-wrapper">
            <label className="questionnaire-heading">Risk Profile Questionnaire</label>
            <label className="questionnaire-sub-heading">The questions will accurately determine your risk appetite.</label>
          </div>
          <div className="questionnaire-count-wrapper">
            <label className="questionnaire-count">{selectedQuestionCount}/13</label>
            <label className="questionnaire-count-static">Question Answered</label>
          </div>

        </div>
        <div className="questionnaire-questions-outer">
          <div className="questionnaire-questions">
            {questions.questions.map((ques: qaTemplate, index) => {
              return (
                <div>
                  <QuestionRadio
                    question={ques}
                    index={ques.sl_no}
                    setCountHandler={updateCount}
                    setScoreHandler={updateScore}
                  />
                </div>
              )
            })}

          </div>
        </div>
        <div className="questionanire-submit-button-wrapper" >
          <Link to={{ pathname: `/performance/${totalScore}` }} style={{ textDecoration: 'none' }}>
            <Button className="questionanire-submit-button" disabled={disable} variant="contained" color="secondary">
              NEXT
            </Button>
          </Link>
        </div>

        <div className="questionnaire-image">

        </div>


      </div>}
    </div>

    // <div>
    //   <div className="container">
    //     <div className="imageCount">
    //       <h3>How do you want to fund your portfolio?</h3>
    //       <div className="image">
    //         <InvestingBro />
    //       </div>
    //       <div className="countdiv">
    //         <h1 className="count">{selectedQuestionCount}/13</h1>
    //         <h3>Question Answered</h3>
    //       </div>
    //     </div>

    //     <div className="questions">
    //       {questions.questions.map((ques: qaTemplate, index) => {
    //         return (
    //           <div>
    //             <QuestionRadio
    //               question={ques}
    //               index={ques.sl_no}
    //               setCountHandler={updateCount}
    //               setScoreHandler={updateScore}
    //             />
    //           </div>
    //         )
    //       })}
    //     </div>
    //   </div>
    //   <div className="profie-score-btn">
    //     <Link to={{ pathname: `/performance/${totalScore}` }}>
    //       <Button disabled={disable} variant="contained" color="secondary">
    //         NEXT
    // </Button>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default Questionare;