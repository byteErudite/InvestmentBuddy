


import CitiBankLogo from '../../../assets/images/bankLogos/citi.png'
import { COLORS } from "../../../constants/NewColorScheme";
import './TransactionDetailRow.css'
import {TransactionModel} from '../TransHist/TransHistContainer/TransHistContainerModel'

const TransactionDetailRow = (props: { transactionRowModel:TransactionModel }) => {
    return (
        <div className="trans-hist-row-main">
            <div className="trans-hist-row-id"><label style={{ color: COLORS.textPrimary }}>{props.transactionRowModel.id}.  </label></div>
            <img className="trans-hist-rown-bank-image" src={CitiBankLogo} />

            <div className="trans-hist-row-col-1">
                <label className="trans-hist-row-card-number" style={{ color: COLORS.textPrimary }}>{props.transactionRowModel.cardNumber}</label>
                <div className="trans-hist-row-payment-info">
                    <label className="trans-hist-row-transaction-type" style={{ color: COLORS.textSecondary }}>{props.transactionRowModel.transactionType}</label>
                    <label className="trans-hist-row-floating-dot" style={{ color: COLORS.textSecondary }}>&#8226;</label>
                    <label className="trans-hist-row-paid-date" style={{ color: COLORS.textSecondary }}>{props.transactionRowModel.paymentDate}</label>
                </div>

            </div>

            <div className="trans-hist-row-col-2">
                <label className="trans-hist-row-amount-paid" style={{ color: COLORS.textPrimaryLight }}>{'$' + props.transactionRowModel.amountPaid}</label>
                <label className="trans-hist-row-points-earned" style={{ color: COLORS.textSuccess }}>{'+ ' + props.transactionRowModel.rewardsEarned + ' pts'}</label>
            </div>

        </div >
    )
}

export default TransactionDetailRow;