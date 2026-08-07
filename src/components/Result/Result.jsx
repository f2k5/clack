import { useEffect } from "react";
import "./Result.css";

export default function Result ({wpm, accuracy, correctWords, incorrectWords, onRestart, duration}) {
    const NO_INCORRECT_WORDS_MSG = "Damn, damn. No incorrect words!"
    const SKIPPED_WORD_TEXT = "skipped word";

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                onRestart()
            };
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onRestart]);

    return (
        <div>
            <div className="headerStatContainer">
                <div className="statContainer">
                    <p className="statSizeBig">{wpm}</p>
                    <p className="missedCorrectWord statSizeName">wpm</p>
                </div>
                <div className="statContainer">
                    <p className="statSizeBig">{accuracy}%</p>
                    <p className="missedCorrectWord statSizeName">accuracy</p>
                </div>
                <div className="statContainer">
                    <p className="statSizeBig correct">{correctWords.length}</p>
                    <p className="missedCorrectWord statSizeName">correct</p>
                </div>
                <div className="statContainer">
                    <p className="statSizeBig incorrect">{incorrectWords.length}</p>
                    <p className="missedCorrectWord statSizeName">incorrect</p>
                </div>
                 <div className="statContainer">
                    <p className="statSizeBig">{duration}s</p>
                    <p className="missedCorrectWord statSizeName">duration</p>
                </div>
            </div>

            <hr className="lineBreak"></hr>

            {correctWords.length !== 0 &&
                <div className="statSizeName" style={{marginBottom: "20px"}}>
                    correct words:<br></br>
                    {correctWords.map((element, index) => {
                        {console.log(element)}
                        return (
                            <span 
                                key={index} 
                                className="correct statSizeName">
                                {element}
                                {index < correctWords.length-1 && <span className="missedCorrectWord">, </span>}
                            </span>
                        );
                    })}
                </div>
            }

            {incorrectWords.length !== 0 ?
                <div className="statSizeName" style={{marginBottom: "50px"}}>
                    incorrect words:
                    <div className="incorrectWordContainer">
                        {incorrectWords.map((word, index) => {
                            const [typedWord, correctWord] = word.split(" ");
                            const typedWordToShow = typedWord === "" ? SKIPPED_WORD_TEXT : typedWord;
                            return (
                                <div>
                                    <span 
                                        className={`incorrect 
                                            ${typedWordToShow === SKIPPED_WORD_TEXT ? 
                                                "italicize" : ""}`
                                    }>
                                        {typedWordToShow}
                                    </span>&nbsp;
                                    <span className="missedCorrectWord">{correctWord}</span>
                                    {index === incorrectWords.length-1 ? 
                                        "" : <span className="missedCorrectWord">,&nbsp;</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>
                :
                <div className="statSizeName incorrect">{NO_INCORRECT_WORDS_MSG}</div>
            }

            <div className="restartTestCaptionContainer">
                <button className="restartButton" onClick={onRestart}>click here to try again or hit tab</button>
            </div>
        </div>
    );
}