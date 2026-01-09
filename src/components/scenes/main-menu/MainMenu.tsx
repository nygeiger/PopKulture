import { useState } from "react";
import { SceneDict } from "../../../lib/definitions";
import "./MainMenu.css";

type MainMenuProps = {
  handlePlayButtonClick: (newSceneName: string) => void;
};

export default function MainMenu(props: MainMenuProps) {
  const [showGameModes, setShowGameModes] = useState(false);
  return (
    <div className="mainMenu">
      <div className="titleText">!!! Kulture Wars !!!</div>
      {showGameModes ? (
        <div>
          <button className="playDevGameMode" onClick={() => props.handlePlayButtonClick(SceneDict.DEV_GAME)}>Dev Game</button>{" "}
          <button className="playClassicMode" onClick={() => props.handlePlayButtonClick(SceneDict.CLASSIC_GAME)}>Classic Mode</button>{" "}
          <button className="playChallengeMode" onClick={() => props.handlePlayButtonClick(SceneDict.CHALLENGE_GAME)}>Challenge Mode</button>
        </div>
      ) : (
        <button className="playButton" onClick={() => setShowGameModes(true)}>
          PLAY
        </button>
      )}
    </div>
  );
}
