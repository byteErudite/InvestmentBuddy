import { CardDetailsRowModel } from '../components/widgets/CardDetails/CardDetailsRow/CardDetailsRowModel';
import { CardModel } from '../components/widgets/models/CardModel'

export const CARDS: CardModel[] = [{ id: 1, cardNumber: "12XX XXXX XXXX XX08", bank: "HDFC", dueDate: "25-04-2021", dueAmount: 45, cardHolder: "none", expiry: "26-06-2027", cvv: "123" },
{ id: 2, bank: "SBI", cardNumber: "17XX-XXXX XXXX XX62", dueDate: "16-04-2021", dueAmount: 145, cardHolder: "none", expiry: "26-06-2027", cvv: "123" },
{ id: 3, bank: "Bank of Baroda", cardNumber: "18XX XXXX XXXX XX85", dueDate: "25-04-2021", dueAmount: 127, cardHolder: "none", expiry: "26-06-2027", cvv: "123" },
{ id: 4, bank: "Citi Bank", cardNumber: "1234 XXXX XXXX 6789", dueDate: "25-04-2021", dueAmount: 1000, cardHolder: "none", expiry: "26-06-2027", cvv: "123" }];

export const BANK_OF_BARODA = "Bank of Baroda";
export const SBI = 'SBI';
export const HDFC = 'HDFC'
export const CITI = 'Citi Bank';
export const BOA = 'Bank of America';
export const CHASE = 'Chase Bank';
export const WELLS = 'Wells Fargo'

export const DUE_DATE = 'Due Date';
export const DUE_AMOUNT = 'Due Amount';

