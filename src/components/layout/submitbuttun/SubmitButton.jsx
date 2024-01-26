
const SubmitButton = ({ text, onClick, value, onChange, icon }) => {
    return (
        <div>
            <button
                className="btn"
                onClick={onClick}
                value={value}
                style={{ background: '#19535F', color: 'white'}}
                onChange={onChange}
            >
                {icon}{text}
            </button>
        </div>
    );
};

export default SubmitButton;