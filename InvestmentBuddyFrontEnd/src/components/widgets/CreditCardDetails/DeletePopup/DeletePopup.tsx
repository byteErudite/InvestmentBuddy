import Backdrop from './BackDrop'
import Modal from './Model'

const DeletePopup = (props:{deletePopup:boolean, closeDeletePopup: () => void, deleteCard: () => void}) => {

    const deleteCard = () => {
        props.deleteCard();
        props.closeDeletePopup();
    }
return (<div>
    {props.deletePopup && <Backdrop onClick={props.closeDeletePopup} />}
            {props.deletePopup && <Modal deleteCard= {deleteCard} text='Are you sure?' onClose={props.closeDeletePopup} />}
</div>)
}

export default DeletePopup;