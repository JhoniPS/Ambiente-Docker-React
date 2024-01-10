import { NavLink } from 'react-router-dom';

const LinkButton = ({ to, text, icon, customClass }) => {
    return (
        <NavLink
            className={`btn btn-${customClass} px-4`}
            to={to}
        >
            <span className="d-flex align-items-center">
                {icon}{text}
            </span>
        </NavLink>
    );
};

export default LinkButton;