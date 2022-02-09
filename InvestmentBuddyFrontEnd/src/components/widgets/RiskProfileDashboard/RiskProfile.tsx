import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ScoreModel } from '../../../constants/Interfaces'
import { SERVER_URL, FORWARD_SLASH, USER_SCORE } from "../../../constants/NetworkData"
import PerformanceMeter from '../../ProfileScore/PerformanceMeter'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import './Risk.css'
import RoundIconButton from "../../widgets/RoundButton/RoundButton";
import { faBolt } from '@fortawesome/free-solid-svg-icons'

const RiskProfile = () => {
    const [userScore, setUserScore] = React.useState(0);
    const [risk, setRiskScore] = React.useState("");
    const [backGround, setBackGround] = React.useState("white");
    useEffect(() => {
        populateUserScore();
    }, []);

    const populateUserScore = () => {
        const result = fetch(SERVER_URL + FORWARD_SLASH + USER_SCORE + FORWARD_SLASH + localStorage.getItem("userName"), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).
            then((resp) => resp.json()).
            then((data) => {
                let scoreValue: ScoreModel = {
                    id: data['id'],
                    overallScore: data['overallScore'],
                    riskProfile: data['riskProfile'],
                    userName: data['userName'],
                    assessmentTaken: data['assessmentTaken']
                }
                setUserScore(scoreValue.overallScore);
                setRiskScore(scoreValue.riskProfile);
                if (scoreValue.riskProfile === "High") {
                    setBackGround("red")
                } else if (scoreValue.riskProfile === "High") {
                    setBackGround("green");
                } else {
                    setBackGround("green")
                }
            });
    }

    const history = useHistory();
    const goToquestionnaire = () => {
        history.push('/questionnaire');
    }

    return (
        <Card style={{ backgroundColor: "cyan" }} className="risk-container-card"><div className="risk-container">
            <PerformanceMeter score={userScore} />
            <Card style={{ backgroundColor: backGround }} className="risk-text"><h1>{risk} (score : {userScore})</h1></Card>
            <button onClick={goToquestionnaire} className="assessment-button" >Retake Assessment</button>
        </div></Card>
    )
}

export default RiskProfile;