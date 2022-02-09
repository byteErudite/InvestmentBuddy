import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './addCard.css';
import Backdrop from '../DeletePopup/BackDrop'
import { CardModel } from '../../models/CardModel';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));



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
        setCard({
            ...card,
            cvv: event.target.value
        })
    }
    const cardNumberChangeHandler = (event) => {
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
        props.saveCardHandler(card);
        props.closePopup();
    }
    const classes = useStyles();
    return (
        <div>
            {props.addCardPopup && <Backdrop onClick={props.closePopup} />}
            <div className='modal'>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="card-number" variant="outlined" onChange={cardNumberChangeHandler} value={card.cardNumber} />
                    <TextField id="outlined-basic" label="card-holder-name" variant="outlined" onChange={cardHolderChangeHandler} value={card.cardHolder} />
                    <TextField id="outlined-basic" label="expiry" variant="outlined" onChange={expiryChangeHandler} value={card.expiry} />
                    <TextField id="outlined-basic" label="cvv" variant="outlined" onChange={cvvChangeHandler} value={card.cvv} />

                    <button className='btn --alt' onClick={() => saveCard(card)}>Add</button>
                    <button type='submit' className='btn' onClick={props.closePopup}>Cancel</button>
                </form>
            </div>
        </div>

    );
}

export default AddCardForm;