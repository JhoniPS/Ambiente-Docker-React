
const SubmitButton = ({ text, onClick, value, onChange, icon }) => {
    return (
        <div>
            <button
                className="btn"
                onClick={onClick}
                value={value}
                style={{ background: '#F2E29F', color:'#080705'}}
                onChange={onChange}
            >
                {icon}{text}
            </button>
        </div>
    );
};

export default SubmitButton;