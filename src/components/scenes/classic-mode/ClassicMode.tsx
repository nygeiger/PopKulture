import { useEffect, useState } from "react";
import { getQuestions } from "../../../lib/actions";
import { SceneDict, type Question, type QuestionsResponseJSON } from "../../../lib/definitions";
import QuestionCard from "../../question-card/QuestionCard";
import "./ClassicMode.css"

type ClassicGameProps = {
    handleMenuButtonClick: (newSceneName: string) => void
}

export default function ClassicGame(props: ClassicGameProps) {
    const [questionsList, setQuestionsList] = useState<Question[]>([])

    const retrieveQuestions = async () => {
        try {
        const getQuestResponse: QuestionsResponseJSON = await getQuestions();
        setQuestionsList( getQuestResponse.data.slice(4))
        } catch (e) {
            console.error(e);
            return {}
        }
    }

    // No dice since entire page is unrednered, will mostlikely have to redux for extra-component memory

    useEffect((() => {
        retrieveQuestions()
    }),[])



    return (
        <div className="classicGame">
            <button className="testQRespButton" onClick={() => props.handleMenuButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
            <div className="classicGameHeader">Classic Mode</div>
            {questionsList[0] &&  <QuestionCard question={questionsList[0]}/>}
        </div>
    )
}