import { SceneDict, type Team } from "../../../lib/definitions"
import "./WinnerScene.css"

export type WinnerSceneProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void
    winningTeam: Team
}

export default function WinnerScene(props: WinnerSceneProps){

    return (
        <div className="winnerScene">
            <div style={{paddingBottom: "10px"}}>{`Congratulations ${props.winningTeam.name}!!`}</div>
            <div style={{paddingBottom: "40px"}}>{`You win with ${props.winningTeam.points.toLocaleString()} points`}</div>
            <button onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
        </div>
    )
}