
import styles from './SubmitButton.module.css'

const SubmitButton = ({ text , customClass}) => {
    return (
        <div>
            <button className={`${styles.btn} ${styles[customClass]}`}>
                {text}
            </button>
        </div>
    );
};

export default SubmitButton;