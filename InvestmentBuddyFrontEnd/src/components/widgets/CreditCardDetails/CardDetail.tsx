import React from 'react'
import Button from '@material-ui/core/Button'
import './creditCardStyles.css'
import { CardModel } from '../models/CardModel';
import DeleteIcon from '@material-ui/icons/Delete'
import BankLogo from './BankLogo'
import InfoPair from '../InfoPair/InfoPair'
import { DUE_AMOUNT, DUE_DATE } from '../../../constants/CreditCardData'
import PayButton from './PayButton';
import DeletePopup from './DeletePopup/DeletePopup'
import AcceptPayment from '../../Payment/acceptPayment';


const Carddetail = (props: { card: CardModel, deleteCard: (id:number) => void }) => {
    const [deletePopup, setDeletePopup] = React.useState(false);

    function showDeletePopupHandler() {
        setDeletePopup(true);
    }

    function closeDeletePopupHandler() {
        setDeletePopup(false);
    }

    const deleteCurrentCard = () => {
        props.deleteCard(props.card.id);
    }

    return (
        <div className="card-detail">
            <BankLogo bank={props.card.bank} />
            <InfoPair value1={props.card.bank} value2={props.card.cardNumber} />
            <InfoPair value1={DUE_DATE} value2={props.card.dueDate} />
            <InfoPair value1={DUE_AMOUNT} value2={props.card.dueAmount} />
            <AcceptPayment />
            <Button onClick={showDeletePopupHandler} startIcon={<DeleteIcon />}></Button>
            {deletePopup && <DeletePopup deleteCard = {deleteCurrentCard} deletePopup={deletePopup} closeDeletePopup={closeDeletePopupHandler} />}
        </div>
    )
}

export default Carddetail;