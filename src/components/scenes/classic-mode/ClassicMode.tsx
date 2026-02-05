import { useRef, useState } from "react";
import { SceneDict, type Question, type Team } from "../../../lib/definitions";
import { getRandomInt, POINTS_TO_WIN } from "../../../lib/utils";
import "./ClassicMode.css";
import ClassicQuestionCard from "../../question-card/ClassicQuestionCard";

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
    const visitedQuestions = useRef(new Set<string>())

    const isSoloGame = props.teams.length === 1;
    const currentTeam = props.teams[currentTeamIndex];

    const addTeamPoints = (additionalPoints: number) => {
        setAdditionalPoints(additionalPoints)
    }

    const incrementCurrTeam = () => {
        if (currentTeamIndex >= props.teams.length - 1) {
            serCurrentTeamIndex(0);
        } else {
            serCurrentTeamIndex(currentTeamIndex + 1);
        }
    }

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
        currentTeam.points += additionalPoints;
        if (currentTeam.points >= POINTS_TO_WIN) {
            props.setWinningTeam(currentTeamIndex)
            props.handleChangeSceneButtonClick(SceneDict.WINNER_SCENE)
        }
        setAdditionalPoints(0);
        setCurrentQuestionIndex(getNextQuestIndex());
    }

    // TODO: Add suspense and skeleton to question card
    // ?: Create new component for teams? HTML may be difficult to read
    return (
        <div className="gameBackground">
            <div className="classicGame">
                <button className="toMainMenuButton" style={{ position: "absolute", top: "3%", left: "3%" }} onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
                <div className="classicGameHeader">Classic Mode</div>
                <div className="gameSection">
                    <div className="teams">
                        <div className="currentTeam"><div>{isSoloGame ? "Your Score" : currentTeam.name}</div><div>{additionalPoints ? <>{currentTeam.points}<span style={{ color: "green" }}>{` +${additionalPoints}`}</span></> : currentTeam.points}</div></div>
                        <div>
                            {isSoloGame || props.teams.map((e, i) => {
                                return i === currentTeamIndex ? "" : (<div className="team" key={e.name}><div>{isSoloGame ? "Your Score" : e.name}</div><div>{e.points}</div></div>)
                            })}
                        </div>
                    </div>
                    {props.questions[0] ? <ClassicQuestionCard question={props.questions[currentQuestionIndex]} nextQuestion={handleNextQuestion} addTeamPoints={addTeamPoints} incrementCurrTeam={incrementCurrTeam} /> : <span>...Loading Question :)</span>}
                </div>
            </div>
        </div>
    )
}
