// import { useState } from "react";
import { SceneDict } from "../../../lib/definitions";
import "./ChallengeModeMenu.css"
import { CHALLENGE_MODE_TIME_LIMIT, QUESTIONS_INITIAL_POINTS, WRONG_ANSWER_PENALTY } from "../../../lib/utils";

export type ChallengeModeMenuProps = {
    handleChangeSceneButtonClick: (newSceneName: string) => void
}

export default function ChallengeModeMenu(props: ChallengeModeMenuProps) {

    return (
        <div className="classicGameMenu">
            <p className="cmmenuTitleText">Get ready for Pop Kulture (Challenge Mode) !!</p>
            <p>{`See how many points you can get in ${CHALLENGE_MODE_TIME_LIMIT} seconds`}</p>
            <p>{`Each question is worth ${QUESTIONS_INITIAL_POINTS.toLocaleString()}. Lose ${WRONG_ANSWER_PENALTY.toLocaleString()} points per each incorrect answer choice`}</p>
            <div className="cmmMenuText">
            </div>
            <div style={{ position: "relative", top: "30px" }}>
                <button className="toMainMenuButton" onClick={() => props.handleChangeSceneButtonClick(SceneDict.MAIN_MENU)}>Back to Menu</button>
                <button onClick={() => { props.handleChangeSceneButtonClick(SceneDict.CHALLENGE_GAME) }}>PLAY</button>
            </div>
        </div>
    )
}