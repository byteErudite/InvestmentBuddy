import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './RoundIconButton.css'

const RoundIconButton = ({ icon, text, textColor, backgroundColor, iconColor, iconBackground }: any) => {
    return (
        <div className="round-icon-button" style={{ backgroundColor: backgroundColor }}>
            <div className="round-icon-button-icon-wrapper" style={{ backgroundColor: iconBackground }}>
                <FontAwesomeIcon className="round-icon-button-icon" icon={icon} style={{ color: iconColor }} />
            </div>
            <label className="round-icon-button-text" style={{ color: textColor }}> {text} </label>
        </div>
    )
}

export default RoundIconButton