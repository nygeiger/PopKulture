import { useState } from "react";
import { SceneDict } from "../../../lib/definitions";
import "./MainMenu.css";

type MainMenuProps = {
  handleChangeSceneButtonClick: (newSceneName: string) => void;
};

export default function MainMenu(props: MainMenuProps) {
  const [showGameModes, setShowGameModes] = useState(false);
  // ?: Challenge mode can === a "streak mode". Go until you get a wrong answer
  // ?: This allows for a Classic & Challenge Mode leaderboard
  return (
    <div className="mainMenu">
      <div className="titleText">!!! Kulture Wars !!!</div>
      {showGameModes ? (
        <div>
          <button className="playDevGameMode" onClick={() => props.handleChangeSceneButtonClick(SceneDict.DEV_GAME)}>Dev Game</button>{" "}
          {/* <button className="playClassicMode" onClick={() => props.handleChangeSceneButtonClick(SceneDict.CLASSIC_GAME)}>Classic Mode</button>{" "} */}
          <button className="playClassicMode" onClick={() => props.handleChangeSceneButtonClick(SceneDict.CLASSIC_GAME_MENU)}>Classic Mode</button>{" "}
          <button className="playChallengeMode" onClick={() => props.handleChangeSceneButtonClick(SceneDict.CHALLENGE_GAME)}>Challenge Mode</button>
        </div>
      ) : (
        <button className="playButton" onClick={() => setShowGameModes(true)}>
          PLAY
        </button>
      )}
    </div>
  );
}
