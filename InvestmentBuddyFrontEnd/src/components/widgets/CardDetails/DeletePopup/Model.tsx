import './deletePopup.css';

function Modal(props:{text:string, onClose:() => void, deleteCard:() => void}) {
  const deleteCard = () => {
    props.deleteCard();
    props.onClose();
  }
    return (
      <div className='modal'>
        <p>{props.text}</p>
        <button className='btn btn--alt' onClick={props.onClose}>
          Cancel
        </button>
        <button className='btn' onClick={deleteCard}>
          Confirm
        </button>
      </div>
    );
  }
  
  export default Modal;