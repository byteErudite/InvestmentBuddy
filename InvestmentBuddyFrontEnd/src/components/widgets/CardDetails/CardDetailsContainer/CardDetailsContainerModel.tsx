export interface CardDetailsContainerModel {
    username: string
    payNowFunction: any
    onPaymentSuccessFunction: any
    reload: any

}

export interface CardDetailsContainerProps {
    cardDetailContainerModel: CardDetailsContainerModel
}