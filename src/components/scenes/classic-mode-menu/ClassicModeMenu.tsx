import { useState } from "react";
import { SceneDict, type Team } from "../../../lib/definitions";
import "./ClassicModeMenu.css"

export type ClassicGameMenuProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void
    setTeams: (teams: Team[]) => void
}

const createTeams = (amtTeams: number): Team[] => {
    const teamArray: Team[] = []
    for (let i = 0; i < amtTeams; i++) {
        teamArray.push({
            name: `Team ${i + 1}`,
            points: 0
        })
    }
    return teamArray;
}

export default function ClassicGameMenu(props: ClassicGameMenuProps) {
    const [numTeams, setNumTeams] = useState(1);

    return (
        <div className="classicGameMenu">
            <p className="cmmenuTitleText">Get ready for Pop Kulture (Classic Mode) !!</p>
            <p>Reach 1,000 points to win</p>
            <div className="cmmMenuText">
                <span>How Many teams will be playing? - </span><b style={{ paddingRight: "5px" }}>{`${numTeams > 1 ? `${numTeams} Teams` : "Solo Game"}`}</b>
                <span>
                    <button onClick={() => setNumTeams(numTeams >= 3 ? 3 : numTeams + 1)}>^</button><button onClick={() => setNumTeams(numTeams <= 1 ? 1 : numTeams - 1)}>&#8964;</button>
                </span>
            </div>
            <div style={{ position: "relative", top: "30px" }}>
                <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
                <button onClick={() => { props.setTeams(createTeams(numTeams)); props.handleChangeSceneButtonClick(SceneDict.CLASSIC_GAME) }}>PLAY</button>
            </div>
        </div>
    )
}