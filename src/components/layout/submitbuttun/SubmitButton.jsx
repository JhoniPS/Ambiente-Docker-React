
const SubmitButton = ({ text, onClick, value, onChange, icon }) => {
    return (
        <div>
            <button
                className="btn"
                onClick={onClick}
                value={value}
                style={{ background: '#FEBE98', color:'#522a28'}}
                onChange={onChange}
            >
                {icon}{text}
            </button>
        </div>
    );
};

export default SubmitButton;