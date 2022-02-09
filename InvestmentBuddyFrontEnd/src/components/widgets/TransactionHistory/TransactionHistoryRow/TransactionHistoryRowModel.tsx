export interface TransactionHistoryRowModel {
    cardCompany: String;
    cardNumber: String;
    amountPaid: String;
    paidDate: String;
    transactionType: String;
    pointsEarned: String;
}

export interface TransactionHistoryRowProps {
    transactionHistoryRowModel: TransactionHistoryRowModel
}
