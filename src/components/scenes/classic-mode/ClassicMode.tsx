import { useState } from "react";
import { SceneDict, type Question, type Team } from "../../../lib/definitions";
import QuestionCard from "../../question-card/QuestionCard";
import { getRandomInt, POINTS_TO_WIN } from "../../../lib/utils";
import "./ClassicMode.css";

export type ClassicGameProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void;
    setWinningTeam: (teamIndex: number) => void;
    questions: Question[];
    teams: Team[];
}

export default function ClassicGame(props: ClassicGameProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomInt(0, props.questions.length));
    const [currentTeamIndex, serCurrentTeamIndex] = useState(0);
    const [additionalPoints, setAdditionalPoints] = useState(0);

    const isSoloGame = props.teams.length === 1;
    const currentTeam = props.teams[currentTeamIndex];

    const handleGetNewQuestion = () => {
        currentTeam.points += additionalPoints;
        if (currentTeam.points >= POINTS_TO_WIN) {
            props.setWinningTeam(currentTeamIndex)
            props.handleChangeSceneButtonClick(SceneDict.WINNER_SCENE)
        }
        setAdditionalPoints(0);
        setCurrentQuestionIndex(getRandomInt(0, props.questions.length));
    }

    const addTeamPoints = (addPoints: number) => {
        setAdditionalPoints(addPoints)
    }

    const incrementCurrTeam = () => {
        if (currentTeamIndex >= props.teams.length - 1) {
            serCurrentTeamIndex(0);
        } else {
            serCurrentTeamIndex(currentTeamIndex + 1);
        }
    }

    // TODO: Add suspense and skeleton to question card
    // ?: Create new component for teams? HTML may be difficult to read
    return (
        <div className="classicGame">
            <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
            <div className="classicGameHeader">Classic Mode</div>
            {props.questions[0] ? <QuestionCard question={props.questions[currentQuestionIndex]} nextQuestion={handleGetNewQuestion} addTeamPoints={addTeamPoints} incrementCurrTeam={incrementCurrTeam} /> : <span>...Loading Question :)</span>}
            <div className="teams">
                <div className="currentTeam"><div>{isSoloGame ? "Your Score" : currentTeam.name}</div><div>{additionalPoints ? <>{currentTeam.points}<span style={{ color: "green" }}>{` +${additionalPoints}`}</span></> : currentTeam.points}</div></div>
                <div>{isSoloGame || props.teams.map((e, i) => {
                    return i === currentTeamIndex ? "" : (<div className="team" key={e.name}><div>{isSoloGame ? "Your Score" : e.name}</div><div>{e.points}</div></div>)
                })}
                </div>
            </div>
        </div>
    )
}