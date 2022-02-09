import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './addCard.css';
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

const AddCardForm = (props: { addCardPopup: boolean, closePopup: () => void, saveCardHandler: (card: CardModel) => void }) => {

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

    const cardHolderChangeHandler = (event) => {
        setCard({
            ...card,
            cardHolder: event.target.value
        })
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

    const saveCard = (card: CardModel) => {
        //TODO: Form Validation
        const bankName = getBankName(card.cardNumber)
        card.bank = bankName
        props.saveCardHandler(card);
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
        <div className="add-card-form-main">
            {props.addCardPopup && <Backdrop onClick={props.closePopup} />}

            <div className='add-card-form-modal'>
                <div className="add-card-form-heading-wrapper">
                    <div className="add-card-form-heading">
                        <label className="add-card-form-heading-title" style={{ color: COLORS.textPrimary }}>Add your card</label>
                        <label className="add-card-form-heading-sub-title">Fill in the details below</label>
                    </div>
                    <div className="add-card-form-close">
                        <FontAwesomeIcon icon={faTimes} style={{ color: COLORS.textSecondary }} onClick={props.closePopup} />
                    </div>
                </div>

                <div className="add-card-form-content">
                    <div className="add-card-form-content-left">
                        <div className="add-card-form-number-logo-row">
                            <div className="add-card-form-card-data-wrapper">
                                <label className="add-card-form-field-heading">CARD NUMBER</label>
                                <input className="add-card-form-field-input" placeholder="XXXX  XXXX  XXXX  XXXX" type="text" onChange={cardNumberChangeHandler} value={card.cardNumber} maxLength={22}></input>
                            </div>

                            <img className="add-card-form-bank-logo" src={setCardImage(card.cardNumber)}></img>
                        </div>

                        <div className="add-card-form-card-data-wrapper">
                            <label className="add-card-form-field-heading">CARD HOLDER NAME</label>
                            <input className="add-card-form-field-input" placeholder="Name on Card" type="text" onChange={cardHolderChangeHandler} value={card.cardHolder}></input>
                        </div>

                        <div className="add-card-form-date-cvv-row">
                            <div className="add-card-form-card-data-wrapper add-card-form-date">
                                <label className="add-card-form-field-heading">EXPIRES ON</label>
                                <input className="add-card-form-field-input add-card-date-input" placeholder="MM/YY" type="text" onChange={expiryChangeHandler} value={card.expiry} maxLength={5}></input>
                            </div>

                            <div className="add-card-form-card-data-wrapper">
                                <label className="add-card-form-field-heading">CVV</label>
                                <input className="add-card-form-field-input add-card-form-cvv-input" placeholder="***" type="password" onChange={cvvChangeHandler} value={card.cvv} maxLength={3}></input>
                            </div>

                            <FontAwesomeIcon onClick={props.closePopup} className="add-card-form-card-icon" icon={faCreditCard} style={{ color: COLORS.textSecondary }} />

                            <div className="add-card-form-submit">
                                <FontAwesomeIcon onClick={() => saveCard(card)} icon={faArrowCircleRight} style={{ color: COLORS.textPrimary }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default AddCardForm;