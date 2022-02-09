import { TransHistRowProps } from "./TransHistRowModel";
import CitiBankLogo from '../../../../assets/images/bankLogos/citi.png'
import { COLORS } from "../../../../constants/NewColorScheme";
import './TransHistRow.css'

const TransHistRow: React.FC<TransHistRowProps> = ({ transHistRowModel }: TransHistRowProps) => {
    return (
        <div className="trans-hist-row-main">
            <img className="trans-hist-rown-bank-image" src={CitiBankLogo} />

            <div className="trans-hist-row-col-1">
                <label className="trans-hist-row-card-number" style={{ color: COLORS.textPrimary }}>{transHistRowModel.cardNumber}</label>
                <div className="trans-hist-row-payment-info">
                    <label className="trans-hist-row-transaction-type" style={{ color: COLORS.textSecondary }}>{transHistRowModel.transactionType}</label>
                    <label className="trans-hist-row-floating-dot" style={{ color: COLORS.textSecondary }}>&#8226;</label>
                    <label className="trans-hist-row-paid-date" style={{ color: COLORS.textSecondary }}>{transHistRowModel.paidDate}</label>
                </div>

            </div>

            <div className="trans-hist-row-col-2">
                <label className="trans-hist-row-amount-paid" style={{ color: COLORS.textPrimaryLight }}>{'$' + transHistRowModel.amountPaid}</label>
                <label className="trans-hist-row-points-earned" style={{ color: COLORS.textSuccess }}>{'+ ' + transHistRowModel.pointsEarned + ' pts'}</label>
            </div>

        </div >
    )
}

export default TransHistRow;