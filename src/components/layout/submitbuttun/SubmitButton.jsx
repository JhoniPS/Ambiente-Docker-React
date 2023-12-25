
import styles from './SubmitButton.module.css'

const SubmitButton = ({ text, customClass, onClick, value, onChange, icon }) => {
    return (
        <div>
            <button
                className="btn btn-warning"
                onClick={onClick}
                value={value}
                onChange={onChange}
            >
                {icon}{text}
            </button>
        </div>
    );
};

export default SubmitButton;