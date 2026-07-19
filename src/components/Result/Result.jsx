import "./Result.css";

export default function Result ({wpm, accuracy, correctWords, incorrectWords, onRestart, duration}) {
    const noIncorrectMsg = "Damn, damn. No incorrect words!"
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
                    Correct words:<br></br>
                    <span className="correct statSizeName">{correctWords.join(", ")}</span>
                </div>
            }

            {incorrectWords.length !== 0 ?
                <div className="statSizeName" style={{marginBottom: "50px"}}>
                    Incorrect words:
                    <div className="incorrectWordContainer">
                        {incorrectWords.map((word, index) => {
                            const wrongWord = word.split(" ");
                            return (
                                <div>
                                    <span className="incorrect">{wrongWord[0]}</span>&nbsp;
                                    <span className="missedCorrectWord">{wrongWord[1]}</span>
                                    {index === incorrectWords.length-1 ? 
                                        "" : <span className="missedCorrectWord">,&nbsp;</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>
                :
                <div className="statSizeName incorrect">{noIncorrectMsg}</div>
            }

            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <button style={{marginLeft: "0"}} onClick={onRestart}>try again</button>
            </div>
        </div>
    );
}