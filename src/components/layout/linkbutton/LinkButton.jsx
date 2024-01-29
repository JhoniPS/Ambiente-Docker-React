import { NavLink } from 'react-router-dom';

const LinkButton = ({ to, text, icon }) => {
    return (
        <NavLink
            className={`btn px-3`}
            style={{ background: '#545F66', color: 'white' }}
            to={to}
        >
            <span className="d-flex gap-2 justify-content-center align-items-center">
                {icon}{text}
            </span>
        </NavLink>
    );
};

export default LinkButton;