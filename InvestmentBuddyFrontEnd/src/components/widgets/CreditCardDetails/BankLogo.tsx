import BOB_LOGO from '../../../assets/images/bankLogos/bob.png'
import HDFC_LOGO from '../../../assets/images/bankLogos/hdfc.jpg'
import SBI_LOGO from '../../../assets/images/bankLogos/sbi.png'
import CITI_BANK_LOGO from '../../../assets/images/bankLogos/citi.png'
import './creditCardStyles.css'
import { BANK_OF_BARODA, SBI, HDFC, CITI } from '../../../constants/CreditCardData'
const BankLogo = (props: { bank: string }) => {
    return (
        <div >
            {props.bank === BANK_OF_BARODA && <img className="bank-logo" alt={props.bank} src={BOB_LOGO}></img>}
            {props.bank === SBI && <img className="bank-logo" alt={props.bank} src={SBI_LOGO}></img>}
            {props.bank === HDFC && <img className="bank-logo" alt={props.bank} src={HDFC_LOGO}></img>}
            {props.bank === CITI && <img className="bank-logo" alt={props.bank} src={CITI_BANK_LOGO}></img>}
        </div>
    )
}



export default BankLogo;