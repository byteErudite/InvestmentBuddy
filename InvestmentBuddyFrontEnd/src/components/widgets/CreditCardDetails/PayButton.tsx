import Button from '@material-ui/core/Button'
import './creditCardStyles.css'
import PaymentIcon from '@material-ui/icons/Payment';

const PayButton = (props:{paymentPopup:boolean ,openPaymentPopup:()=> void}) => {
    return (
        <Button onClick = {props.openPaymentPopup} startIcon = {<PaymentIcon/>} variant="outlined" color="primary">Pay now</Button>
    )
}

export default PayButton;