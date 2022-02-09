
import React from 'react'
import List from '@material-ui/core/List';
import CardContent from '@material-ui/core/CardContent';
import Carddetail from './CardDetail';
import './creditCardStyles.css';
import Card from '@material-ui/core/Card';
import CreditCardIcon from '../../../assets/images/credit-card.svg';
import { CARDS, CITI } from '../../../constants/CreditCardData';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddCardForm from './AddCard/AddCardForm';
import { CardModel } from '../models/CardModel'
const CreditCardsContainer = () => {
    const [addCardPopup, setAddCardPopup] = React.useState(false);
    const [cards, setCards] = React.useState<CardModel[]>(CARDS)

    const showAddCardPopupHandler = () => {
        setAddCardPopup(true);
    }

    const closeAddCardPopupHandler = () => {
        setAddCardPopup(false);
    }

    const deleteCardHandler = (id: number) => {
        const updatedCards = cards.filter(card => card.id !== id);
        setCards(updatedCards);
    }

    const addCardHandler = (card: CardModel) => {
        //call api on backedn
        card.id = Math.floor(Math.random() * 10000);
        card.bank = CITI;
        card.dueAmount = 1000;
        card.dueDate = "24-06-2021"
        const updatedCards = cards;
        updatedCards.push(card);
        setCards(updatedCards);
    }

    return (
        <Card>
            <div className="credit-card-header">
                <img className="credit-card-icon" alt="creditCardIcon" src={CreditCardIcon} />
                <label className="credit-card-title">Credit Cards</label>
                <Button onClick={showAddCardPopupHandler} startIcon={<PlaylistAddIcon />}>Add Card</Button>
                {addCardPopup && <AddCardForm addCardPopup={addCardPopup} closePopup={closeAddCardPopupHandler} saveCardHandler={addCardHandler} />}
            </div>
            <List>
                {cards.map((card) => {
                    return (<CardContent className="cards">
                        <Carddetail deleteCard={deleteCardHandler} card={card} />
                    </CardContent>)
                })}
            </List>
        </Card>
    )
}

export default CreditCardsContainer;