import { useState } from "react";
import { SceneDict } from "../../../lib/definitions";
import "./ClassicModeMenu.css"

type ClassicGameMenuProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void
}

export default function ClassicGameMenu(props: ClassicGameMenuProps) {
    const [numTeams, setNumTeams] = useState(0);

    return (
        <div className="classicGameMenu">
            <p className="cmmenuTitleText">Get ready for Pop Kulture (Classic Mode) !!</p>
            <p>Reach 1,000 points to win</p>
            <div className="cmmMenuText">
                <span>How Many teams will be playing? - </span><b style={{paddingRight: "5px"}}>{ `${numTeams > 0 ? `${numTeams} Teams` : "Solo Game"}`}</b>
                <span>
                    <button onClick={() => setNumTeams(numTeams >= 3 ? 3 : numTeams + 1)}>^</button><button onClick={() => setNumTeams(numTeams <= 0 ? 0 : numTeams - 1)}>&#8964;</button>
                </span>
            </div>
            <div style={{position: "relative", top: "30px"}}>
                <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
                <button onClick={() => props.handleChangeSceneButtonClick(SceneDict.CLASSIC_GAME)}>PLAY</button>
            </div>
        </div>
    )
}