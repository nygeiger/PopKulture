import type { MouseEventHandler } from "react"
import { SceneDict } from "../../../lib/types"
import "./MainMenu.css"

type MainMenuProps = {
    handlePlayButtonClick: (newSceneName: string) => void
}

export default function MainMenu(props: MainMenuProps) {
    return (
        <div className="mainMenu">
            <div className="titleText">
            !!! Kulture Wars !!!
            </div>
            <button className="playButton" onClick={() => props.handlePlayButtonClick(SceneDict.TRIVIA_GAME)}>PLAY</button>
        </div>
    )
}