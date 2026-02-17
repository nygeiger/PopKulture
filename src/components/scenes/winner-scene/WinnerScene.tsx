import { SceneDict, type Team } from "../../../lib/definitions"
import winnerStyles from "./WinnerScene.module.css"

export type WinnerSceneProps = {
    isSoloGame: boolean;
    winningTeam: Team;
    handleChangeSceneButtonClick: (newSceneName: string) => void
}

export default function WinnerScene(props: WinnerSceneProps) {
    const { isSoloGame, winningTeam, handleChangeSceneButtonClick } = props;
    return (
        <div className={winnerStyles.winnerScene}>
            <button className="toMainMenuButton toMenuButtons" onClick={() => handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Main Menu</button>
            <div className={winnerStyles.congratsText}>{`Congratulations ${isSoloGame ? "" : winningTeam.name}!!`}</div>
            <div style={{ paddingBottom: "40px" }}>{`You win with ${props.winningTeam.points.toLocaleString()} points`}</div>
            <button onClick={() => handleChangeSceneButtonClick(SceneDict.CLASSIC_GAME_MENU)}>Play Again</button>
        </div>
    )
}