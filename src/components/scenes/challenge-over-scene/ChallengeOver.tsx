// import { SceneDict, type Team } from "../../../lib/definitions"
import { SceneDict } from "../../../lib/definitions";
import "./ChallengeOver.css"

export type ChallengeOverProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void;
    points: number;
}

export default function ChallengeOverScene(props: ChallengeOverProps){
    return (
        <div className="winnerScene">
            <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
            <div style={{paddingBottom: "10px"}}>Well Done !!</div>
            <div style={{paddingBottom: "40px"}}><span>You got </span><span style={{fontWeight: "bold"}}>{props.points.toLocaleString()}</span><span> points</span></div>
            <button onClick={() => props.handleChangeSceneButtonClick(SceneDict.CHALLENGE_GAME_MENU)}>PLAY AGAIN</button>
        </div>
    )
}