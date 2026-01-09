import { useState, type JSX } from "react";
import { SceneDict } from "../../lib/definitions";
import MainMenu from "../scenes/main-menu/MainMenu";
import DevGame from "../scenes/dev-game/DevGame";
import ClassicGame from "../scenes/classic-mode/ClassicMode";


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
    case SceneDict.DEV_GAME:
      currentSceneComponent = <DevGame handleMenuButtonClick={handleSceneChange} />;
      break;
    case SceneDict.CLASSIC_GAME:
      currentSceneComponent = <ClassicGame handleMenuButtonClick={handleSceneChange} />
      break;
    case SceneDict.CHALLENGE_GAME:
      currentSceneComponent = <DevGame handleMenuButtonClick={handleSceneChange} />
      break;
    default:
      currentSceneComponent = <MainMenu handlePlayButtonClick={handleSceneChange} />;
      break;
  }

  return <div className="gameEngine">{currentSceneComponent}</div>;
}
