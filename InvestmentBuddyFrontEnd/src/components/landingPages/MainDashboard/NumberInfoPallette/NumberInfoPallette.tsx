import './NumberInfoPallette.css'

const NumberInfoPallette = ({ number, text, backgroundColor }: any) => {
    return (
        <div className="number-info-pallette-main" style={{ backgroundColor: backgroundColor }}>
            <label className="number-info-pallette-number">{number}</label>
            <label className="number-info-pallette-text">{text}</label>
        </div>
    )
}

export default NumberInfoPallette