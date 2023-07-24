import styles from './LinkButton.module.css'
import { NavLink} from 'react-router-dom';

const LinkButton = ({ to, text, customClass }) => {
    return (
        <NavLink className={`${styles.btn} ${styles[customClass]}`} to={to}>
            {text}
        </NavLink>
    );
};

export default LinkButton;