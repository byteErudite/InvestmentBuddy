import { TransactionHistoryRowModel } from "../TransactionHistoryRow/TransactionHistoryRowModel";
import { TransactionHistoryContainerProps } from "./TransactionHistoryContainerModel";
import TransactionHistoryRow from '../TransactionHistoryRow/TransactionHistoryRow'
import TransactionHistoryIcon from '../../../../assets/icons/transactionHistory.png'
import './TransactionHistoryContainer.css'
import { RoundButtonModel } from "../../RoundButton/RoundButtonModel";
import { COLORS } from "../../../../constants/ColorScheme";
import RoundButton from "../../RoundButton/RoundButton";

const TransactionHistoryContainer: React.FC<TransactionHistoryContainerProps> = ({ transactionHistoryContainerModel }: TransactionHistoryContainerProps) => {
    const transactionHistoryRowModel: TransactionHistoryRowModel = {
        cardCompany: 'Citi Bank',
        amountPaid: '5000',
        cardNumber: '1234 XXXX XXXX 6789',
        paidDate: 'May 24, 2021',
        pointsEarned: '1000',
        transactionType: 'Full Amount'
    }


    const viewMoreButton: RoundButtonModel = {
        backgroundColor: '#FFF',
        border: '2.5px solid ' + COLORS.blueMedium,
        text: 'View More',
        textColor: COLORS.blueMedium,
        onClickFunction: undefined
    }

    return (
        <div className="transaction-history-container-main">
            <div className="transaction-history-container-heading">
                <img className="transaction-history-container-heading-icon" src={TransactionHistoryIcon} />
                <label className="transaction-history-container-title">Transaction History</label>
            </div>

            <div className="transaction-history-container-content">
                <TransactionHistoryRow transactionHistoryRowModel={transactionHistoryRowModel} />
                <TransactionHistoryRow transactionHistoryRowModel={transactionHistoryRowModel} />
                <TransactionHistoryRow transactionHistoryRowModel={transactionHistoryRowModel} />
            </div>

            <div className="transaction-history-container-footer">
                <RoundButton roundButtonModel={viewMoreButton}></RoundButton>
            </div>

        </div>
    )
}

export default TransactionHistoryContainer;