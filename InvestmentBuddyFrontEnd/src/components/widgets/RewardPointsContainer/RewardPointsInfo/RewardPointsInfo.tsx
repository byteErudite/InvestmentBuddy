import './RewardPointsInfo.css'

const RewardPointsInfo = ({ image, value1, value2 }: any) => {
    return (
        <div className="reward-points-info-main">
            <img className='reward-points-info-image' src={image} />

            <div className="reward-points-info-content">
                <label className="reward-points-info-content-value1">{value1}</label>
                <label className="reward-points-info-content-value2">{value2}</label>
            </div>
        </div>
    )
}

export default RewardPointsInfo;