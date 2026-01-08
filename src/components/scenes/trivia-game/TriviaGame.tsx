import { getQuestions } from "../../../lib/actions";
import type { QuestionsResponseJSON } from "../../../lib/definitions";
import { LOCAL_SERVER_PORT } from "../../../lib/utils";
import GameBoard from "../../game-board/GameBoard";

export default function TriviaGame() {
    const testQuestionsRequest = async () => {
        try {
        const getQuestResponse: QuestionsResponseJSON = await getQuestions();
        console.log("testQuestionsRequest3 " + JSON.stringify(getQuestResponse.data[0]))
        } catch (e) {
            console.error(e);
        }
    }

    const getHelloFromBE = async () => {
        const serverResp = await fetch( `http://localhost:${LOCAL_SERVER_PORT}/hello-server`);
        console.log("Hello Server Response Obj: " + serverResp)
        console.log(await serverResp.text())
    }

    return (
        <div className="triviaGame">
            <button className="testQRespButton" onClick={() => testQuestionsRequest()}>Test Question Response !!!</button>
            <button className="testQRespButton" onClick={() => getHelloFromBE()}>Hello Server :)</button>
            <GameBoard gameboardText="labubu"/>
        </div>
    )
}