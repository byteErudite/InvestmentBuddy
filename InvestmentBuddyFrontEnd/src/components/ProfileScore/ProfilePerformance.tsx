import InvestingBro from "../Util/InvestingBroImage";
import ProfileScoreMeter from "./ProfileScore";
import { useParams } from 'react-router';
import {scoreTemplate} from '../widgets/models/CardModel'
import "./profilePerformance.css";

const ProfilePerformance = () => {
  const totalScoreValue:scoreTemplate = useParams();
  const scoreValue = parseInt(totalScoreValue.totalScore);
  console.log(`Total score in performance component: ${totalScoreValue.totalScore}`)
  return (
    <div className="container">
      <div className="leftimage">
        <InvestingBro />
      </div>
      <div className="scoremeter">
        <ProfileScoreMeter score={scoreValue} />
      </div>
    </div>
  );
};

export default ProfilePerformance;
