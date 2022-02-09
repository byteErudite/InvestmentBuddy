import UserImage from '../../../../assets/images/mainDashboard/user.png'
import './UserWelcomePallette.css'

const UserWelcomePallette = ({ displayName }: any) => {
    return (
        <div className="user-welcome-main">
            <img className="user-welcome-user-image" src={UserImage}></img>

            <div className="user-welcome-content">
                <label className="user-welcome-salutation">Welcome Back</label>
                <label className="user-welcome-name">{displayName + ' !'}</label>
            </div>
        </div>
    )
}

export default UserWelcomePallette;