import { useState } from "react";
import { SceneDict, type Question, type Team } from "../../../lib/definitions";
import QuestionCard from "../../question-card/QuestionCard";
import { getRandomInt } from "../../../lib/utils";
import "./ClassicMode.css";

export type ClassicGameProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void;
    questions: Question[];
    teams: Team[];
}

export default function ClassicGame(props: ClassicGameProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomInt(0, props.questions.length));

    const handleGetNewQuestion = () => {
        setCurrentQuestionIndex(getRandomInt(0, props.questions.length));
    }

    // TODO: Add suspense and skeleton to question card
    return (
        <div className="classicGame">
            <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
            <div className="classicGameHeader">Classic Mode</div>
            {props.questions[0] && <QuestionCard question={props.questions[currentQuestionIndex]} nextQuestion={handleGetNewQuestion} />}
        </div>
    )
}