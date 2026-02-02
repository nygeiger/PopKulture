import { useEffect, useState } from "react";
import "./ChallengeMode.css"
import { SceneDict, type Question } from "../../../lib/definitions";
import { getRandomInt } from "../../../lib/utils";
import ChallengeQuestionCard, { type ChallengeQuestionCardProps } from "../../question-card/ChallengeQuestionCard";

export type ChallengeModeProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void;
    setChallengeScore: (score: number) => void
    questions: Question[];
    visitedQuestions: Set<string>;
};

export default function ChallengeMode(props: ChallengeModeProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomInt(0, props.questions.length));
    const [currentScore, setCurrentScore] = useState(0);
    const [additionalPoints, setAdditionalPoints] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(90)

    useEffect(() => {
        props.setChallengeScore(0)
        props.visitedQuestions.clear()
    }, [])

    useEffect(() => {
        if (props.questions[0]) {
            const intervalId = setInterval(() => {
                secondsRemaining > 0 ? setSecondsRemaining(secondsRemaining - 1) : props.handleChangeSceneButtonClick(SceneDict.CHALLENGE_OVER)
            }, 1000)
            return () => clearInterval(intervalId)
        }
    }, [secondsRemaining])

    function getNextQuestInd(): number {
        if (props.visitedQuestions.size === props.questions.length) {
            props.visitedQuestions.clear() // ?: Put in useEffect
        }

        let newQuestionIndex;

        // TODO: Should be fine for now. Find more efficient process for when there are more questions
        while (!newQuestionIndex) {
            const newIndex = getRandomInt(0, props.questions.length)

            if (!props.visitedQuestions.has(props.questions[newIndex].id)) {
                newQuestionIndex = newIndex
            }
        }
        return newQuestionIndex;
    }

    const handleNextQuestion = () => {
        setAdditionalPoints(0)
        setCurrentScore(currentScore + additionalPoints)

        let nextQuestInd = getRandomInt(0, props.questions.length);
        if (props.visitedQuestions.has(props.questions[nextQuestInd].id))
        setCurrentQuestionIndex(getNextQuestInd());
    }

    const addPoints = (addPoints: number) => {
        props.setChallengeScore(currentScore + addPoints);
        setAdditionalPoints(addPoints)
    }

    const challengeQuestionCardProps: ChallengeQuestionCardProps = { question: props.questions[currentQuestionIndex], addPoints, nextQuestion: handleNextQuestion, }

    // TODO: extract Side Labels into it's on component
    return (
        <div className="challengeMode">
            Challenge Mode
            <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
            <p>{`Seconds left: ${secondsRemaining}`}</p>
            <div className="gameSection">
                <div className="score">
                    <div className="currentScore"><div>{"Your Score"}</div><div>{additionalPoints ? <>{currentScore}<span style={{ color: "green" }}>{` +${additionalPoints}`}</span></> : currentScore}</div></div>
                </div>
                {props.questions[0] ? <ChallengeQuestionCard {...challengeQuestionCardProps} /> : <span>...Loading Question :)</span>}
            </div>
        </div>
    )
}
