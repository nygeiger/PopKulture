import { useState, type JSX } from "react";
import { type SceneType, SceneDict } from "../../lib/types";
import MainMenu from "../scenes/main-menu/MainMenu";
import TriviaGame from "../scenes/trivia-game/TriviaGame";


export default function GameEngine() {
  // TODO: figure out how to enforce currentSceneName coming from SceneDict
  const [currentSceneName, setCurrentSceneName] = useState<string>(SceneDict.MAIN_MENU);
  // TODO: How to type constrain currentSceneComponent to only the scenes
  let currentSceneComponent: JSX.Element

  const handleSceneChange = (newSceneName: string) => {
    console.log(`Changing current scene (${currentSceneName}) to ${newSceneName}`);
    setCurrentSceneName(newSceneName);
  };

  switch (currentSceneName) {
    case SceneDict.TRIVIA_GAME:
      currentSceneComponent = <TriviaGame />;
      break;
    default:
      currentSceneComponent = (
        <MainMenu handlePlayButtonClick={handleSceneChange} />
      );
      break;
  }

  return <div className="gameEngine">{currentSceneComponent}</div>;
}
