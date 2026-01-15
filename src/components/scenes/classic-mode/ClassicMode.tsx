import { useEffect, useState } from "react";
import { getQuestions } from "../../../lib/actions";
import { SceneDict, type Question, type QuestionsResponseJSON } from "../../../lib/definitions";
import QuestionCard from "../../question-card/QuestionCard";
import { getRandomNum } from "../../../lib/utils";
import "./ClassicMode.css";

type ClassicGameProps = {
    handleMenuButtonClick: (newSceneName: string) => void
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
        setQuestionsList( getQuestResponse.data ) // TODO: Currently setting the array to all questions in database (no bueno)
        setCurrentQuestionIndex(randomIndex)
        } catch (e) {
            console.error(e);
            return {}
        }
    }

    const handleGetNewQuestion = () => {
        const randomIndex = Math.floor(getRandomNum(0, questionsList.length)); //TODO: take magic number out
        setCurrentQuestionIndex(randomIndex);

    }

    // No dice since entire page is un-rendered, will most likely have to redux for extra-component memory

    useEffect((() => {
        retrieveQuestions()
    }),[])



    return (
        <div className="classicGame">
            <button className="testQRespButton" onClick={() => props.handleMenuButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
            <div className="classicGameHeader">Classic Mode</div>
            {questionsList[0] &&  <QuestionCard question={questionsList[currentQuestionIndex]} nextQuestion={handleGetNewQuestion} />}
        </div>
    )
}