import React from "react";
import { TransactionHistoryRowModel, TransactionHistoryRowProps } from "./TransactionHistoryRowModel";
import CitiLogo from '../../../../assets/images/bankLogos/citi.png'
import InfoPair from "../../InfoPair/InfoPair";
import './TransactionHistoryRow.css'
import { COLORS } from "../../../../constants/ColorScheme";

const TransactionHistoryRow: React.FC<TransactionHistoryRowProps> = ({ transactionHistoryRowModel }: TransactionHistoryRowProps) => {
    return (
        <div className="transaction-history-row-main">
            <div className="transaction-history-row-container">
                <img className="transaction-history-bank-img" src={CitiLogo} />
                <InfoPair value1={transactionHistoryRowModel.cardCompany} value2={transactionHistoryRowModel.cardNumber} />
                <InfoPair value1="Amount Paid" value2={'$' + transactionHistoryRowModel.amountPaid} textColor2={COLORS.blueLight} />
                <InfoPair value1="Paid Date" value2={transactionHistoryRowModel.paidDate} />
                <InfoPair value1="Transaction Type" value2={transactionHistoryRowModel.transactionType} />
                <InfoPair value1="Reward Points Earned" value2={transactionHistoryRowModel.pointsEarned} textColor2={COLORS.green} />
            </div>
            <hr className="transaction-history-line-grey" />
        </div>
    )
}

export default TransactionHistoryRow;