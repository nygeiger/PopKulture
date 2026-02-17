import { useEffect, useRef, useState } from "react";
import { SceneDict, type Question } from "../../../lib/definitions";
import { CHALLENGE_MODE_TIME_LIMIT, getRandomInt, IS_DEBUG } from "../../../lib/utils";
import ChallengeQuestionCard, { type ChallengeQuestionCardProps } from "../../question-card/ChallengeQuestionCard";
import "./ChallengeMode.css"


export type ChallengeModeProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void;
    setChallengeScore: (score: number) => void;
    questions: Question[];
};

export default function ChallengeMode(props: ChallengeModeProps) {
    const {handleChangeSceneButtonClick, setChallengeScore, questions} = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomInt(0, questions.length));
    const [currentScore, setCurrentScore] = useState(0);
    const [additionalPoints, setAdditionalPoints] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(CHALLENGE_MODE_TIME_LIMIT);
    const visitedQuestions = useRef(new Set<string>());

    useEffect(() => {
        setChallengeScore(0);
    }, [])

    useEffect(() => {
        if (questions.length >= 1) {
            const timeoutId = setTimeout(() => {
                secondsRemaining > 0 ? setSecondsRemaining(secondsRemaining - 1) : handleChangeSceneButtonClick(SceneDict.CHALLENGE_OVER)
            }, 1000);
            return () => clearTimeout(timeoutId)
        }
    }, [secondsRemaining, questions.length])

    function getNextQuestIndex(): number {
        if (visitedQuestions.current.size === questions.length) {
            visitedQuestions.current.clear();
        }

        let newQuestionIndex: number | null = null;

        // TODO: Should be fine for now. Find more efficient process for when there are more questions
        while (newQuestionIndex === null) {
            const newIndex = getRandomInt(0, questions.length ?? 0)

            IS_DEBUG && console.log("Getting new int: " + newIndex);
            if (!visitedQuestions.current.has(questions[newIndex].id)) {
                IS_DEBUG && console.log("Setting new ind: " + newIndex);
                newQuestionIndex = newIndex;
            }
        }
        visitedQuestions.current.add(questions[newQuestionIndex].id)
        return newQuestionIndex;
    }

    const handleNextQuestion = () => {
        setAdditionalPoints(0)
        setCurrentScore(currentScore + additionalPoints)
        setCurrentQuestionIndex(getNextQuestIndex());
    }

    const addPoints = (additionalPoints: number) => {
        setChallengeScore(currentScore + additionalPoints);
        setAdditionalPoints(additionalPoints)
    }

    const challengeQuestionCardProps: ChallengeQuestionCardProps = { question: questions[currentQuestionIndex], addPoints, nextQuestion: handleNextQuestion, }

    // TODO: extract Side Labels into it's on component
    return (
        <div className="challengeMode">
            <div className="toMenuButtons">
                <button className="toMainMenuButton" onClick={() => handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
                <button style={{height: "1.5rem"}} onClick={() => handleChangeSceneButtonClick(SceneDict.CHALLENGE_GAME_MENU)}>Challenge Mode Menu</button>
            </div>
            <span className="challengeGameHeader">Challenge Mode</span>
            <p>{`Seconds left: ${secondsRemaining}`}</p>
            <div className="gameSection">
                <div className="score">
                    <div className="currentScore"><div>{"Your Score"}</div><div>{additionalPoints ? <>{currentScore}<span style={{ color: "green" }}>{` +${additionalPoints}`}</span></> : currentScore}</div></div>
                </div>
                <ChallengeQuestionCard {...challengeQuestionCardProps} />
            </div>
        </div>
    )
}
