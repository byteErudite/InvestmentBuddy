import { IconInfoPalletteProps } from "./IconInfoPalletteModel";
import './IconInfoPallette.css'

const IconInfoPallette: React.FC<IconInfoPalletteProps> = ({ iconInfoPalletteModel }: IconInfoPalletteProps) => {
    return (
        <div className="icon-info-pallette-main">
            {iconInfoPalletteModel.iconPosition == 'left' && <img className="icon-info-pallete-icon" src={iconInfoPalletteModel.iconImage} />}

            <div className="icon-info-pallette-content" style={{ backgroundColor: iconInfoPalletteModel.backgroundColor }}>
                <div className="icon-info-pallette-main-text-line">
                    <label className="icon-info-pallette-main-text" style={{ color: iconInfoPalletteModel.mainTextColor }}>{iconInfoPalletteModel.mainText}</label>
                    <label className="icon-info-pallette-main-small-text" style={{ color: iconInfoPalletteModel.mainTextColor }}>pts</label>
                </div>
                <label className="icon-info-pallette-sub-text">{iconInfoPalletteModel.subText}</label>
            </div>

            {iconInfoPalletteModel.iconPosition == 'right' && <img className="icon-info-pallete-icon" src={iconInfoPalletteModel.iconImage} />}
        </div>
    )
}

export default IconInfoPallette;