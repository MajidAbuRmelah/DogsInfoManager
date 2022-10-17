import '../css/SubmitButton.css';

function SubmitButton({content, className, onClick, type = "submit"}) {
    return (
        <button className={`submit-button ${className}`} type={type} onClick={onClick}>
            {content}
        </button>
    );
}

export default SubmitButton;