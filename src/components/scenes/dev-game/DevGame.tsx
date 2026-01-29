import { useState } from "react";
import { getQuestions, helloBackend } from "../../../lib/actions";
import { SceneDict, type Question, type QuestionsResponseJSON } from "../../../lib/definitions";
import GameBoard from "../../game-board/GameBoard";


type DevGameProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void
}

export default function DevGame(props: DevGameProps) {
    const [questionsList, setQuestionsList] = useState<Question[]>([])

    const testQuestionsRequest = async () => {
        try {
            const getQuestResponse: QuestionsResponseJSON = await getQuestions();
            console.log("testQuestionsRequest3 " + JSON.stringify(getQuestResponse.data[0]))
            setQuestionsList(getQuestResponse.data.slice(4))
        } catch (e) {
            console.error(e);
        }
    }

    const getHelloFromBE = async () => {
        const serverResp = await helloBackend();
        console.log("Hello Server Response Obj: " + serverResp)
        console.log(serverResp)
        alert(serverResp)
    }

    const canReadENVVariable = () => {

        alert(import.meta.env.VITE_IS_NETLIFY)
    }

    return (
        <div className="devGame">
            <button className="testQRespButton" onClick={() => testQuestionsRequest()}>Test Question Response !!!</button>
            <button className="testQRespButton" onClick={() => getHelloFromBE()}>Hello Server :)</button>
            <button className="testQRespButton" onClick={() => canReadENVVariable()}>Is NETLIFY Env</button>
            <button className="testQRespButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
            <GameBoard gameboardText="labubu" questions={questionsList} />
        </div>
    )
}