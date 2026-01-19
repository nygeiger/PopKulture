import { useState } from "react";
import { getQuestions } from "../../../lib/actions";
import { SceneDict, type Question, type QuestionsResponseJSON } from "../../../lib/definitions";
import { LOCAL_SERVER_PORT } from "../../../lib/utils";
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
        const serverResp = await fetch( `http://localhost:${LOCAL_SERVER_PORT}/hello-server`);
        const serverRespText = await serverResp.text()
        console.log("Hello Server Response Obj: " + serverResp)
        console.log(serverRespText)
        alert(serverRespText)
    }

    return (
        <div className="devGame">
            <button className="testQRespButton" onClick={() => testQuestionsRequest()}>Test Question Response !!!</button>
            <button className="testQRespButton" onClick={() => getHelloFromBE()}>Hello Server :)</button>
            <button className="testQRespButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
            <GameBoard gameboardText="labubu" questions={questionsList}/>
        </div>
    )
}