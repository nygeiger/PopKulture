import { useState, type BaseSyntheticEvent } from "react";
import { SceneDict, type Team } from "../../../lib/definitions";
import { MAX_TEAMS, POINTS_TO_WIN } from "../../../lib/utils";
import "./ClassicModeMenu.css"

const createTeams = (numTeams: number): Team[] => {
    const teamArray: Team[] = []
    for (let i = 0; i < numTeams; i++) {
        teamArray.push({
            name: `Team ${i + 1}`,
            points: 0
        })
    }
    return teamArray;
}

const teamOptions = Array.from({ length: MAX_TEAMS }, (_, index) => (<option key={index + 1} value={index + 1}>{index + 1}</option>));

export type ClassicGameMenuProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void
    setTeams: (teams: Team[]) => void
}

export default function ClassicGameMenu(props: ClassicGameMenuProps) {
    const [numTeams, setNumTeams] = useState<number>(1);

    const handleTeamsChange = (e: BaseSyntheticEvent) => {
        setNumTeams(parseInt(e.target.value));
    }


    //TODO: Display points to win via variable while adding necessary commas
    return (
        <div className="classicGameMenu">
            <p className="cmmenuTitleText">Get ready for Pop Kulture (Classic Mode) !!</p>
            <p>{`Reach ${POINTS_TO_WIN.toLocaleString()} points to win`}</p>
            <div className="cmmMenuText">
                <span>How Many teams will be playing?</span><span style={{ paddingLeft: "2px", paddingRight: "2px" }}>-</span><b style={{ paddingRight: "3px", letterSpacing: "-1px" }}>{`${numTeams > 1 ? `${numTeams} Teams` : "Solo Game"}`}</b>
            </div>
            <select className="teamsSelect" value={numTeams} onChange={handleTeamsChange}>
                {teamOptions}
            </select>
            <div style={{ position: "relative", top: "30px" }}>
                <button className="toMainMenuButton toMenuButtons" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
                <button onClick={() => { props.setTeams(createTeams(numTeams)); props.handleChangeSceneButtonClick(SceneDict.CLASSIC_GAME) }}>PLAY</button>
            </div>
        </div>
    )
}