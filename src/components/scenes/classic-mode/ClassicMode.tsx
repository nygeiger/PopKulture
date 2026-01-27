import { useEffect, useState } from "react";
import { getQuestions } from "../../../lib/actions";
import { SceneDict, type Question, type QuestionsResponseJSON, type Team } from "../../../lib/definitions";
import QuestionCard from "../../question-card/QuestionCard";
import { getRandomNum } from "../../../lib/utils";
import "./ClassicMode.css";

export type ClassicGameProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void
    teams: Team[]
}

export default function ClassicGame(props: ClassicGameProps) {
    const [questionsList, setQuestionsList] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const retrieveQuestions = async () => {
        try {
            const getQuestResponse: QuestionsResponseJSON = await getQuestions(); //TODO: DOn't have a fetch for all questions
            const randomIndex = Math.floor(getRandomNum(0, getQuestResponse.data.length))
            console.log("randomIndex: " + randomIndex)
            console.log("chosen questions: \n " + JSON.stringify(getQuestResponse.data[randomIndex]))
            // setQuestionsList( getQuestResponse.data.slice(4))
            // setQuestionsList( Array(1).fill(getQuestResponse.data[randomIndex]))
            setQuestionsList(getQuestResponse.data) // TODO: Currently setting the array to all questions in database (no bueno)
            setCurrentQuestionIndex(randomIndex)
        } catch (e) {
            console.error(e);
            return {}
        }
    }

    const handleGetNewQuestion = () => {
        const randomIndex = Math.floor(getRandomNum(0, questionsList.length));
        setCurrentQuestionIndex(randomIndex);

    }

    // No dice since entire page is un-rendered, will most likely have to redux for extra-component memory

    useEffect((() => {
        retrieveQuestions()
    }), [])



    return (
        <div className="classicGame">
            <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
            <div className="classicGameHeader">Classic Mode with {props.teams.length} teams</div>
            {questionsList[0] && <QuestionCard question={questionsList[currentQuestionIndex]} nextQuestion={handleGetNewQuestion} />}
        </div>
    )
}