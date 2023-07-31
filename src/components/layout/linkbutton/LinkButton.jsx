import styles from './LinkButton.module.css'
import { NavLink } from 'react-router-dom';

const LinkButton = ({ to, text, customClass, icon }) => {
    return (
        <NavLink
            className={`${styles.btn} ${styles[customClass]}`}
            icon={icon}
            to={to}
        >
            {icon}{text}
        </NavLink>
    );
};

export default LinkButton;