import { CardDetailsRowModel, CardDetailsRowProps } from "../CardDetailsRow/CardDetailsRowModel";
import { COLORS } from "../../../../constants/NewColorScheme";

import { getBankLogo, getCardLines, getCardBackground } from '../../../../utilities/BankUtilities'


import './CardPallette.css'

const CardPallette = (props: { cardDetailsRowModel: CardDetailsRowModel }) => {

    return (
        props.cardDetailsRowModel ?
            <div className="card-pallette-main" style={{ backgroundColor: getCardBackground(props.cardDetailsRowModel.bankName) }}>
                <div className="card-pallette-heading">
                    <label className="card-pallette-bank-name">{props?.cardDetailsRowModel?.bankName == undefined ? '' : props.cardDetailsRowModel.bankName.toUpperCase()}</label>
                    <img className="card-pallette-bank-logo" src={getBankLogo(props.cardDetailsRowModel.bankName)} />
                </div>

                <label className="card-pallette-amount-due" style={{
                    fontWeight: props.cardDetailsRowModel.bankName?.toUpperCase() === 'SAVE EASY BANK' ? 500 : 600,
                    fontSize: props.cardDetailsRowModel.bankName?.toUpperCase() === 'SAVE EASY BANK' ? '23px' : '26px',
                }}>{props.cardDetailsRowModel.bankName?.toUpperCase() === 'SAVE EASY BANK' ? props.cardDetailsRowModel.cardNumber : '$ ' + props.cardDetailsRowModel.dueAmount}</label>

                <label className="card-pallette-card-numer">{props.cardDetailsRowModel.bankName?.toUpperCase() === 'SAVE EASY BANK' ? props.cardDetailsRowModel.dueDate : props.cardDetailsRowModel.cardNumber}</label>
                <label className="card-pallette-due-date">{props.cardDetailsRowModel.bankName?.toUpperCase() === 'SAVE EASY BANK' ? '' : props.cardDetailsRowModel.dueAmount == "0" ? 'No Payment Due' : 'DUE:   ' + props.cardDetailsRowModel.dueDate}</label>

                <img className="card-pallette-lines" src={getCardLines(props.cardDetailsRowModel.bankName)} />
            </div> : null
    )
}

export default CardPallette;