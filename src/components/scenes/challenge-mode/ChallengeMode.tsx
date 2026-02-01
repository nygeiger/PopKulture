import { useEffect, useState } from "react";
import "./ChallengeMode.css"
import { SceneDict, type Question } from "../../../lib/definitions";
import QuestionCard, { type QuestionCardProps } from "../../question-card/QuestionCard";
import { getRandomInt } from "../../../lib/utils";

export type ChallengeModeProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void;
    questions: Question[];
};

export default function ChallengeMode(props: ChallengeModeProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomInt(0, props.questions.length));
    const [secondsRemaining, setSecondsRemaining] = useState(120)

    const handleNextQuestion = () => {
            setCurrentQuestionIndex(getRandomInt(0, props.questions.length));
        }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (secondsRemaining > 0) setSecondsRemaining(secondsRemaining - 1)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [secondsRemaining])

    const questionCardProps: QuestionCardProps = {question: props.questions[currentQuestionIndex], nextQuestion: handleNextQuestion}

    return (
        <div className="challengeMode">
            Challenge Mode
            <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
            <p>{`Seconds left: ${secondsRemaining}`}</p>
            {props.questions[0] ? <QuestionCard {...questionCardProps} /> : <span>...Loading Question :)</span>}
        </div>
    )
}
