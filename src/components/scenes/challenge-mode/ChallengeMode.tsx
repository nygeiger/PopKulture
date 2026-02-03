import { useEffect, useRef, useState } from "react";
import "./ChallengeMode.css"
import { SceneDict, type Question } from "../../../lib/definitions";
import { getRandomInt } from "../../../lib/utils";
import ChallengeQuestionCard, { type ChallengeQuestionCardProps } from "../../question-card/ChallengeQuestionCard";

export type ChallengeModeProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void;
    setChallengeScore: (score: number) => void
    questions: Question[];
};

export default function ChallengeMode(props: ChallengeModeProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomInt(0, props.questions.length));
    const [currentScore, setCurrentScore] = useState(0);
    const [additionalPoints, setAdditionalPoints] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(90)
    const visitedQuestions = useRef(new Set<string>())


    useEffect(() => {
        props.setChallengeScore(0)
    }, [])

    useEffect(() => {
        if (props.questions.length >= 1) {
            const timeoutId = setTimeout(() => {
                secondsRemaining > 0 ? setSecondsRemaining(secondsRemaining - 1) : props.handleChangeSceneButtonClick(SceneDict.CHALLENGE_OVER)
            }, 1000)
            return () => clearTimeout(timeoutId)
        }
    }, [secondsRemaining, props.questions.length])

    function getNextQuestIndex(): number {
        if (visitedQuestions.current.size === props.questions.length) {
            visitedQuestions.current.clear()
        }

        let newQuestionIndex: number | null = null;

        // TODO: Should be fine for now. Find more efficient process for when there are more questions
        while (newQuestionIndex === null) {
            const newIndex = getRandomInt(0, props.questions.length ?? 0)

            console.log("Getting new int: " + newIndex)
            if (!visitedQuestions.current.has(props.questions[newIndex].id)) {
                console.log("Setting new ind: " + newIndex)
                newQuestionIndex = newIndex
            }
        }
        visitedQuestions.current.add(props.questions[newQuestionIndex].id)
        return newQuestionIndex;
    }

    const handleNextQuestion = () => {
        setAdditionalPoints(0)
        setCurrentScore(currentScore + additionalPoints)
        setCurrentQuestionIndex(getNextQuestIndex());
    }

    const addPoints = (additionalPoints: number) => {
        props.setChallengeScore(currentScore + additionalPoints);
        setAdditionalPoints(additionalPoints)
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
