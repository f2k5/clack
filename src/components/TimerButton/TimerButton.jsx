import "./TimerButton.css";

export default function TimerButton ({ buttonText, onButtonPress, buttonSelected }) {
    return (
        <button className={buttonSelected ? "btnSelected" : ""}
            onClick={() => onButtonPress(buttonText)}
        >
            {buttonText}s
        </button>
    );
}