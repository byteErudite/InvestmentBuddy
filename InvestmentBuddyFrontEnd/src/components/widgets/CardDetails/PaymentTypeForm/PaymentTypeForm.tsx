import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './PaymentTypeForm.css';
import Backdrop from '../DeletePopup/BackDrop'
import { CardModel } from '../../models/CardModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faTimes, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { COLORS } from '../../../../constants/NewColorScheme';
import CitiLogoWhite from '../../../../assets/images/bankLogos/citiWhite.png'
import BoaLogoWhite from '../../../../assets/images/bankLogos/boaWhite.png'
import ChaseLogoWhite from '../../../../assets/images/bankLogos/chaseWhite.png'
import WellsLogoWhite from '../../../../assets/images/bankLogos/wellsWhite.jpg'
import { BOA, CHASE, CITI, WELLS } from '../../../../constants/CreditCardData';

const PaymentTypeForm = (props: { paymentTypePopup: boolean, closePopup: () => void, paymentChosenHandler: (amount, paymentType) => void, amountDue }) => {

    const newCard: CardModel = {
        id: 1,
        bank: "",
        cardHolder: "",
        cardNumber: "",
        cvv: "",
        dueAmount: 0,
        dueDate: "",
        expiry: ""
    }
    const [card, setCard] = React.useState<CardModel>(newCard);
    const [amountIndex, setAmountIndex] = useState(0);
    const [customAmount, setCustomAmount] = useState("");

    const cardHolderChangeHandler = (event) => {

        event.target.value = event.target.value.length == 1 && event.target.value.charAt(0) != '$' ? '$' + event.target.value : event.target.value.length == 0 ? '' : event.target.value
        setCustomAmount(event.target.value)
    }
    const cvvChangeHandler = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/, '')
        setCard({
            ...card,
            cvv: event.target.value
        })
    }
    const cardNumberChangeHandler = (event) => {
        event.target.value = event.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1  ').trim();
        setCard({
            ...card,
            cardNumber: event.target.value
        })
    }
    const expiryChangeHandler = (event) => {
        setCard({
            ...card,
            expiry: event.target.value
        })
    }

    const saveCard = () => {
        //TODO: Form Validation
        var finalAmount = "";
        var finalPaymentType = "";

        if (amountIndex == 0) {
            finalAmount = ('' + parseInt(props.amountDue) / 10).split('.')[0];
            finalPaymentType = "Partial Amount"
        }

        if (amountIndex == 1) {
            finalAmount = '' + props.amountDue;
            finalPaymentType = "Full Amount"
        }

        if (amountIndex == 2) {
            finalAmount = customAmount;
            finalAmount = finalAmount.substr(1, finalAmount.length)
            if (parseInt(finalAmount) >= parseInt(props.amountDue))
                finalPaymentType = "Full Amount"
            else
                finalPaymentType = "Partial Amount"
        }
        props.paymentChosenHandler(finalAmount, finalPaymentType);
        props.closePopup();
    }

    const getBankName = (cardNumber: string) => {
        if (cardNumber.length < 4) return ''
        const num = parseInt(cardNumber.charAt(3))

        if (num % 4 == 0) return CITI
        if (num % 4 == 1) return BOA
        if (num % 4 == 2) return CHASE
        if (num % 4 == 3) return WELLS
    }

    const setCardImage = (cardNumber: string) => {
        if (cardNumber.length < 4) return ''
        const num = parseInt(cardNumber.charAt(3))

        if (num % 4 == 0) return CitiLogoWhite
        if (num % 4 == 1) return BoaLogoWhite
        if (num % 4 == 2) return ChaseLogoWhite
        if (num % 4 == 3) return WellsLogoWhite
    }

    return (
        <div className="payment-type-form-main">
            {props.paymentTypePopup && <Backdrop onClick={props.closePopup} />}

            <div className='payment-type-form-modal'>
                <div className="payment-type-form-heading-wrapper">
                    <div className="payment-type-form-heading">
                        <label className="payment-type-form-heading-title" style={{ color: COLORS.textPrimary }}>Payment Options</label>
                        <label className="payment-type-form-heading-sub-title">Choose amount to be paid</label>
                    </div>
                    <div className="payment-type-form-close">
                        <FontAwesomeIcon icon={faTimes} style={{ color: COLORS.textSecondary }} onClick={props.closePopup} />
                    </div>
                </div>

                <div className="payment-type-form-content">
                    <div className="payment-type-form-content-left">
                        <div className="payment-type-form-date-cvv-row">

                            <div className="payment-type-form-card-data-wrapper payment-type-form-date" onClick={() => setAmountIndex(0)} style={{ border: amountIndex == 0 ? '2.5px solid ' + COLORS.textPrimaryLight : 0 }}>
                                <label className="payment-type-form-field-heading">MINIMUM AMOUNT</label>
                                <label className="payment-type-form-field-input payment-type-date-input" placeholder="MM/YY" onChange={expiryChangeHandler} >${('' + parseInt(props.amountDue) / 10).split('.')[0]}</label>
                            </div>

                            <div className="payment-type-form-card-data-wrapper" onClick={() => setAmountIndex(1)} style={{ border: amountIndex == 1 ? '2.5px solid ' + COLORS.textPrimaryLight : 0 }}>
                                <label className="payment-type-form-field-heading">FULL AMOUNT</label>
                                <label className="payment-type-form-field-input payment-type-form-cvv-input" onChange={cvvChangeHandler}>${props.amountDue}</label>
                            </div>
                        </div>


                        <div className="payment-type-form-date-cvv-row">
                            <div className="payment-type-form-card-data-wrapper" onClick={() => setAmountIndex(2)} style={{ border: amountIndex == 2 ? '2.5px solid ' + COLORS.textPrimaryLight : 0 }}>
                                <label className="payment-type-form-field-heading">CUSTOM AMOUNT</label>
                                <input className="payment-type-form-field-input payment-type-form-custom-amount" placeholder="$" type="text" onChange={cardHolderChangeHandler} value={customAmount}></input>
                            </div>
                            <div className="payment-type-form-submit">
                                <FontAwesomeIcon onClick={() => saveCard()} icon={faArrowCircleRight} style={{ color: COLORS.textPrimary }} />
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>

    );
}

export default PaymentTypeForm;