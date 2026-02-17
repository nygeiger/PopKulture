import { useRef, useState } from "react";
import { SceneDict, type Question, type Team } from "../../../lib/definitions";
import { getRandomInt, IS_DEBUG, POINTS_TO_WIN } from "../../../lib/utils";
import ClassicQuestionCard from "../../question-card/ClassicQuestionCard";
import "./ClassicMode.css";

export type ClassicGameProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void;
    setWinningTeam: (teamIndex: number) => void;
    questions: Question[];
    teams: Team[];
}

export default function ClassicGame(props: ClassicGameProps) {
    const {handleChangeSceneButtonClick, setWinningTeam, questions, teams} = props;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(getRandomInt(0, props.questions.length));
    const [currentTeamIndex, serCurrentTeamIndex] = useState(0);
    const [additionalPoints, setAdditionalPoints] = useState(0);
    const visitedQuestions = useRef(new Set<string>())

    const isSoloGame = teams.length === 1;
    const currentTeam = teams[currentTeamIndex];

    const addTeamPoints = (additionalPoints: number) => {
        setAdditionalPoints(additionalPoints)
    }

    const incrementCurrTeam = () => {
        if (currentTeamIndex >= teams.length - 1) {
            serCurrentTeamIndex(0);
        } else {
            serCurrentTeamIndex(currentTeamIndex + 1);
        }
    }

    function getNextQuestIndex(): number {
        if (visitedQuestions.current.size === questions.length) {
            visitedQuestions.current.clear()
        }

        let newQuestionIndex: number | null = null;

        // TODO: Should be fine for now. Find more efficient process for when there are more questions
        while (newQuestionIndex === null) {
            const newIndex = getRandomInt(0, questions.length ?? 0)

            IS_DEBUG && console.log("Getting new int: " + newIndex)
            if (!visitedQuestions.current.has(questions[newIndex].id)) {
                IS_DEBUG && console.log("Setting new ind: " + newIndex)
                newQuestionIndex = newIndex
            }
        }
        visitedQuestions.current.add(questions[newQuestionIndex].id)
        return newQuestionIndex;
    }

    const handleNextQuestion = () => {
        currentTeam.points += additionalPoints;
        if (currentTeam.points >= POINTS_TO_WIN) {
            setWinningTeam(currentTeamIndex)
            handleChangeSceneButtonClick(SceneDict.WINNER_SCENE)
        }
        setAdditionalPoints(0);
        setCurrentQuestionIndex(getNextQuestIndex());
    }

    // TODO: Create new component for teams? HTML may be difficult to read
    return (
        <div className="classicGame">
            <div className="toMenuButtons" style={{ position: "fixed", top: "3%", left: "3%" }}>
                <button onClick={() => handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
                <button onClick={() => handleChangeSceneButtonClick(SceneDict.CLASSIC_GAME_MENU)}>Classic Mode Menu</button>
            </div>

            <div className="classicGameHeader">Classic Mode</div>
            <div className="gameSection">
                <div className="teams">
                    <div className="currentTeam"><div>{isSoloGame ? "Your Score" : currentTeam.name}</div><div>{additionalPoints ? <>{currentTeam.points}<span style={{ color: "green" }}>{` +${additionalPoints}`}</span></> : currentTeam.points}</div></div>
                    <div>
                        {isSoloGame || teams.map((e, i) => {
                            return i === currentTeamIndex ? "" : (<div className="team" key={e.name}><div>{isSoloGame ? "Your Score" : e.name}</div><div>{e.points}</div></div>)
                        })}
                    </div>
                </div>
                <ClassicQuestionCard question={questions[currentQuestionIndex]} nextQuestion={handleNextQuestion} addTeamPoints={addTeamPoints} incrementCurrTeam={incrementCurrTeam} />
            </div>
        </div>
    )
}
