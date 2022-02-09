import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COLORS } from '../../../../constants/NewColorScheme'
import './NavbarItem.css'
import { useHistory } from 'react-router'
import { ACCESS_TOKEN } from '../../../../constants/app-config'


const NavbarItem = (props: { selected: boolean, icon, label, goTo }) => {

    const history = useHistory();

    const goToPage = () => {
        if (props.goTo == '/home') {
            localStorage.setItem(ACCESS_TOKEN, '');
            localStorage.setItem("userName", '');
        }
        history.push(props.goTo);
    }

    return (
        <div className="navbar-item-main" onClick={goToPage} style={{ backgroundColor: props.selected && props.label != 'Log Out' ? COLORS.navbarItemSelected : COLORS.navbar, color: props.selected ? 'white' : 'grey' }}>
            <FontAwesomeIcon icon={props.icon} className="navbar-item-icon" />
            <label className="navbar-item-label">{props.label}</label>
        </div>
    )
}

export default NavbarItem