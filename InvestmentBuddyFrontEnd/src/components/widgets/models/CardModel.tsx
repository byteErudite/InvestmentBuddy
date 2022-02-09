
export interface CardModel {
    "id": number,
    "bank": string,
    "cardNumber": string,
    "dueDate": string,
    "dueAmount": number,
    "cardHolder": string,
    "expiry": string,
    "cvv": string
}

export interface CardDataModel {
    "id": number,
    "userid": number,
    "number": String,
    "bank": String,
    "cvv": number,
    "dueDate": String
    "cardHolder": String,
    "expiry": String
}

export interface scoreTemplate {
    totalScore: string
}