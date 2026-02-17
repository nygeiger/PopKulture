import { useState } from "react";
import { SceneDict } from "../../../lib/definitions";
import mMenuStyles from "./MainMenu.module.css";
import { IS_DEBUG } from "../../../lib/utils";

type MainMenuProps = {
  handleChangeSceneButtonClick: (newSceneName: string) => void;
};

export default function MainMenu(props: MainMenuProps) {
  const [showGameModes, setShowGameModes] = useState(false);
  // ?: Challenge mode can === a "streak mode". Go until you get a wrong answer
  // ?: This allows for a Classic & Challenge Mode leaderboard
  return (
    <div className={mMenuStyles.mainMenu}>
      <div className="titleText">Pop Kulture Wars</div>
      <div className="titleText">Throwback Trivia. Do you know your stuff?</div>
      {showGameModes ? (
        <div>
          {IS_DEBUG && <button className="playDevGameMode" onClick={() => props.handleChangeSceneButtonClick(SceneDict.DEV_GAME)}>Dev Game</button>}{" "}
          <button onClick={() => props.handleChangeSceneButtonClick(SceneDict.CLASSIC_GAME_MENU)}>Classic Mode</button>{" "}
          <button onClick={() => props.handleChangeSceneButtonClick(SceneDict.CHALLENGE_GAME_MENU)}>Challenge Mode</button>
        </div>
      ) : (
        <button onClick={() => setShowGameModes(true)}>
          PLAY
        </button>
      )}
    </div>
  );
}
