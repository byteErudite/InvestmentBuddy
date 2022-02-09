import { RoundButtonProps } from "./RoundButtonModel";
import './RoundButton.css'

const RoundButton: React.FC<RoundButtonProps> = ({ roundButtonModel }: RoundButtonProps) => {
    return (
        <div>
            <button className='custom-button-round'
                onClick={roundButtonModel.onClickFunction}
                style={{
                    backgroundColor: roundButtonModel.backgroundColor,
                    color: roundButtonModel.textColor,
                    border: roundButtonModel.border
                }}>{roundButtonModel.text}</button>

        </div>
    )
}

export default RoundButton;