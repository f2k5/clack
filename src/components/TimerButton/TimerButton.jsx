import "./TimerButton.css";

export default function TimerButton ({ buttonText, onButtonPress, buttonSelected, disableBtn }) {
    return (
        <button 
            onMouseDown={(e) => {
                e.preventDefault();
                if (!disableBtn) onButtonPress(buttonText)
            }}
            className={buttonSelected ? "btnSelected" : ""}
        >
            {buttonText}s
        </button>
    );
}