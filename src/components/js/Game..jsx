import "/src/components/stylesheet/gameStyle.scss";
import { useState, useEffect } from 'react';

export default function Game() {
    const [score, setScore] = useState(0);
    const [bubbles, setBubbles] = useState([]);
    const [timer, setTimer] = useState(60);

    const updateScore = () => {
        setScore(score + 1);
    };

    const createBubbles = () => {
        const size = Math.random() * 60;
        const left = Math.random() * innerWidth;
        setBubbles(bubbles => [...bubbles, { size, left, isBurst: false }]);
    };

    const burstBubble = (index) => {
        // Update the score
        updateScore();
        // Set isBurst to true for the clicked bubble
        setBubbles(bubbles => bubbles.map((bubble, i) =>
            i === index ? { ...bubble, isBurst: true } : bubble
        ));
    };

    useEffect(() => {
        const interval = setInterval(createBubbles, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(timer => {
                if (timer === 1) {
                    setScore(0);  // reset the score
                    setBubbles([]);  // clear the bubbles
                    return 60;  // reset the timer
                } else {
                    return timer - 1;
                }
            });
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setScore(0);
            setBubbles([]);
            setTimer(60);
        }
    }, [timer]);

    return (
        <>
            <div className="game-container">
                <div className="timer-container">Time Left : {timer}</div>
                <div className="score-container">
                    <span className="score">Score: {score}</span>
                </div>
                <div className="bubble-container">
                    {bubbles.map((bubble, index) => bubble.isBurst ? null : (
                        <span
                            key={index}
                            className={`bubble ${bubble.isBurst ? 'burst' : ''}`}
                            onClick={() => burstBubble(index)}
                            style={{
                                width: bubble.size + 'px',
                                height: bubble.size + 'px',
                                left: bubble.left + 'px'
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}