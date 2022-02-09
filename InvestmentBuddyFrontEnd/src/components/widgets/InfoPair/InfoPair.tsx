import { COLORS } from "../../../constants/ColorScheme"
import './InfoPair.css'

const InfoPair = ({ value1, value2, textColor1, textColor2, fontWeight1, fontWeight2 }: any) => {
    return (
        <div className="info-pair-main">
            <label className="info-pair-value1" style={{ color: textColor1, fontWeight: fontWeight1 }}>{value1}</label>
            <label className="info-pair-value2" style={{ color: textColor2, fontWeight: fontWeight2 }}>{value2}</label>
        </div >
    )
}

InfoPair.defaultProps = {
    textColor1: COLORS.backgroundPage,
    textColor2: COLORS.text,
    fontWeight1: 500,
    fontWeight2: 600
}

export default InfoPair