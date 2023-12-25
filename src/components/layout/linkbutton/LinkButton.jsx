import styles from './LinkButton.module.css'
import { NavLink } from 'react-router-dom';

const LinkButton = ({ to, text, icon }) => {
    return (
        <NavLink
            className="btn btn-primary"
            to={to}
        >
            <span className="d-flex align-items-center">
                {icon}{text}
            </span>
        </NavLink>
    );
};

export default LinkButton;