import { NavLink } from 'react-router-dom';

const LinkButton = ({ to, text, icon, customClass }) => {
    return (
        <NavLink
            className='btn px-4'
            style={{ background: `${((customClass === '#6C757D') ? '#6C757D' : '#2978A0')}`, color: 'white' }}
            to={to}
        >
            <span className="d-flex gap-2 justify-content-center align-items-center">
                {icon}{text}
            </span>
        </NavLink>
    );
};

export default LinkButton;