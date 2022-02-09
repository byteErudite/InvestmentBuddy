export interface CardDetailsRowModel {
    id: number,
    bankName: string,
    cardNumber: string,
    dueDate: string,
    dueAmount: string,
    cardNumberUnmasked: string
}

export interface CardDetailsRowProps {
    cardDetailsRowModel: CardDetailsRowModel
}