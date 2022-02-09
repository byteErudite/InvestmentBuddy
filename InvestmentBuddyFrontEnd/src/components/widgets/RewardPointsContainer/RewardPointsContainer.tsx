import { RewardPointsContainerProps } from "./RewardPointsContainerModel";
import RewardIcon from '../../../assets/icons/reward.png'
import ProfilePerson from '../../../assets/images/mainDashboard/user.png'
import RoundButton from "../RoundButton/RoundButton";
import { RoundButtonModel } from "../RoundButton/RoundButtonModel";
import { COLORS } from "../../../constants/ColorScheme";
import RewardPointsInfo from "./RewardPointsInfo/RewardPointsInfo";
import RewardPointsEarnedImage from "../../../assets/images/rewardPoints/rewardPointsEarned.svg"
import RewardPointsInvestedImage from "../../../assets/images/rewardPoints/rewardPointsInvested.svg"
import RewardPointsUpcomingImage from "../../../assets/images/rewardPoints/rewardPointsUpcoming.svg"
import './RewardPointsContainer.css'

const RewardPointsContainer: React.FC<RewardPointsContainerProps> = ({ rewardPointsContainerModel }: RewardPointsContainerProps) => {
    const roundButtonModel: RoundButtonModel = {
        backgroundColor: COLORS.blueMedium,
        border: '0',
        onClickFunction: undefined,
        text: 'Manage',
        textColor: '#FFF'
    }

    return (
        <div className="reward-points-container-main">
            <div className="reward-points-container-heading">
                <img className="reward-points-container-heading-icon" src={RewardIcon} />
                <label className="reward-points-container-title">Reward Points</label>
            </div>

            <div className="reward-points-container-content">
                <div className="reward-points-container-profile">
                    <div className="reward-points-container-profile-left">
                        <img className="reward-points-container-profile-image" src={ProfilePerson} />

                        <div className="reward-points-container-profile-user-info">
                            <label className="reward-points-container-profile-salutation">Congratulations</label>
                            <label className="reward-points-container-profile-name">{rewardPointsContainerModel.displayName + '!'}</label>
                        </div>
                    </div>

                    <div className="reward-points-container-profile-right">
                        <RoundButton roundButtonModel={roundButtonModel} />
                    </div>
                </div>

                <div className="reward-points-container-row-1">
                    <RewardPointsInfo image={RewardPointsEarnedImage} value1="Points Earned"
                        value2={rewardPointsContainerModel.pointsEarned} ></RewardPointsInfo>
                    <RewardPointsInfo image={RewardPointsInvestedImage} value1="Points Invested"
                        value2={rewardPointsContainerModel.pointsInvested} ></RewardPointsInfo>
                </div>

                <div className="reward-points-container-row-2">
                    <RewardPointsInfo image={RewardPointsUpcomingImage} value1="Upcoming Milestone"
                        value2={rewardPointsContainerModel.upcomingMilestone} ></RewardPointsInfo>
                    <label className="reward-points-container-amount-left">Paying {rewardPointsContainerModel.amountLeft} of your credit card to reach your Milestone.</label>
                </div>


            </div>
        </div>
    )
}

export default RewardPointsContainer;