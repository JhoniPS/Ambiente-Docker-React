import styles from './LinkButton.module.css'
import { Link } from 'react-router-dom';

const LinkButton = ({ to, text, customClass}) => {
    return (
        <Link className={`${styles.btn} ${styles[customClass]}`} to={to}>
            {text}
        </Link>
    );
};

export default LinkButton;