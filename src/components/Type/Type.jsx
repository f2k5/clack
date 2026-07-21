import { useState, useEffect, useRef } from "react";
import TimerButton from "../TimerButton/TimerButton";
import Result from "../Result/Result";
import getSentence from "../../wordDB/wordDB";
import "./Type.css"

const NUM_WORDS_TO_SHOW = 10;
const TIMER_DURATION = 30; //seconds
const SECOND = 1000;

const UNTYPED   = "#646669";
const CORRECT   = "#82FF62";
const INCORRECT = "#CA4754";

export default function Type () {
    const [words, setWords] = useState(() => getSentence().split(" "));
    const [currWordIdx, setCurrWordIdx] = useState(0); //The current word index from words the user is typing
    const [currWord, setCurrWord] = useState(words[currWordIdx]);//The current word from words the user is typing
    const [typed, setTyped] = useState("");//What the user is tying in real time
    const [currWordGroup10, setCurrWordGroup10] = useState(words.slice(0, NUM_WORDS_TO_SHOW));
    const [duration, setDuration] = useState(TIMER_DURATION);
    const [timer, setTimer] = useState(TIMER_DURATION);
    const [testStarted, setTestStarted] = useState(null);
    const [history, setHistory] = useState({ correct: [], incorrect: [] });
    const [focus, setFocus] = useState(true);
    const inputRef = useRef(null);
        
    const chars = [];

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    useEffect(function () {
        if (!testStarted) return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCurrWordGroup10([]);
                    setTestStarted(false);
                    return 0;
                }
                return prev - 1;
            })
        }, SECOND);

        return () => clearInterval(interval)
    }, [testStarted])

    //Loop through all the words
    currWordGroup10.forEach((word, wordIdx) => {
        const letters = word.split("");
        letters.forEach((letter, letterIdx) => {
            let letterColor = UNTYPED;
            if (word === currWord) {
                if (letterIdx < typed.length) {
                    letterColor = typed[letterIdx] === letter ? CORRECT : INCORRECT;
                }
            } 
            
            chars.push(
                <span 
                    key={crypto.randomUUID()}
                    className={wordIdx === 0 ? 'word-focus': ''}
                    style={{
                        color: letterColor,
                        fontSize: wordIdx === 0 ? "100px" : "60px",
                        opacity: wordIdx === 0 ? 1 : 0.6,
                    }}
                >
                    {letter}
                </span>
            );
        });

        //Come here only when the user has typed sth
        //and the word length typed whether correct/incorrect
        //is equal to the expected word length.
        if (typed && word === currWord) {
            if (typed.length > word.length) {
                typed.slice(word.length).split("").forEach(extraChar => {
                    chars.push(
                        <span
                            key={crypto.randomUUID()}
                            className={wordIdx === 0 ? 'word-focus': ''}
                            style={{
                                color: INCORRECT,
                                fontSize: wordIdx === 0 ? "100px" : "60px",
                            }}
                        >
                            {extraChar}
                        </span>
                    );
                });
            }
        }
        //Add space at the end of the word:
        chars.push(<span key={crypto.randomUUID()}> </span>);
    });

    const correctChars = history.correct.join(' ').length;
    const secondsElapsed = duration - timer;
    const wpm = secondsElapsed <= 0 ? 0 : Math.round((correctChars * 12) / secondsElapsed);

    const totalWords = history.correct.length + history.incorrect.length;
    const accuracy = totalWords > 0 ? Math.round((history.correct.length / totalWords) * 100) : 0;

    const handleDurationChange = (duration) => {
        setDuration(duration);
        setTimer(duration);
        setTimeout(() => inputRef.current.focus(), 0);
    }

    const resetTest = () => {
        const newWords = getSentence().split(" ");
        setWords(newWords);
        setCurrWord(newWords[0]);
        setCurrWordGroup10(newWords.slice(0, NUM_WORDS_TO_SHOW));
        setCurrWordIdx(0);
        setTyped("");
        setHistory({ correct: [], incorrect: [] });
        setTestStarted(null);
        setTimer(duration);
        setTimeout(() => inputRef.current.focus(), 0);
    }

    return (
        <div className="page">
            <div className={`header ${testStarted === false ? "hide" : ""}`}>
                <p className="timeRemaining">{timer}</p>
                <div className={`btnContainer ${testStarted === true ? "hide" : ""}`}>
                    <TimerButton 
                        buttonText={15} 
                        buttonSelected={duration === 15 ? true : false} 
                        onButtonPress={handleDurationChange}
                    />
                    <TimerButton 
                        buttonText={30} 
                        buttonSelected={duration === 30 ? true : false} 
                        onButtonPress={handleDurationChange}
                    />
                    <TimerButton 
                        buttonText={60} 
                        buttonSelected={duration === 60 ? true : false} 
                        onButtonPress={handleDurationChange}
                    />
                </div>
            </div>

            <p className={`lostFocusText incorrect ${focus ? "hide" : ""}`}
                >lost focus, click here to regain focus
            </p>
            <div className={`wordsContainer ${focus ? "" : "blur"}`}>
                <div className="typing-area" onClick={() => inputRef.current.focus()}>
                    <input ref={inputRef}
                        disabled={timer === 0}
                        value={typed}
                        onChange={(e) => {
                            setTyped(e.target.value);
                            if (e.target.value.length === 1 && !testStarted) {
                                setTestStarted(true);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === " ") {
                                e.preventDefault();
                                const nextWordIdx = currWordIdx + 1;
                                setCurrWordGroup10(words.slice(nextWordIdx, nextWordIdx+NUM_WORDS_TO_SHOW));
                                setCurrWordIdx(nextWordIdx);
                                setCurrWord(words[nextWordIdx]);
                                if (typed === words[currWordIdx]) {
                                    setHistory(prev => ({ ...prev, correct: [...prev.correct, typed] }));
                                } else {
                                    const show = `${typed} (${words[currWordIdx]})`
                                    setHistory(prev => ({ ...prev, incorrect: [...prev.incorrect, show] }));
                                }
                                setTyped("");
                            } else if (e.key === "Tab") {
                                e.preventDefault();
                                resetTest();
                            }
                        }}
                        onFocus={() => {setFocus(true);}}
                        onBlur={() =>  {setFocus(false);}}
                    />
                    <p>{chars}</p>
                </div>
                {testStarted === false && 
                    <Result
                        wpm={wpm} 
                        accuracy={accuracy} 
                        correctWords={history.correct} 
                        incorrectWords={history.incorrect} 
                        duration={duration}
                        onRestart={resetTest}
                    />
                }
            </div>
        </div>
    )
}