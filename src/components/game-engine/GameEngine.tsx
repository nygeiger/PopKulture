import { useState, type JSX } from "react";
import { SceneDict } from "../../lib/definitions";
import type { Team } from "../../lib/definitions";
import MainMenu from "../scenes/main-menu/MainMenu";
import DevGame from "../scenes/dev-game/DevGame";
import ClassicGame, { type ClassicGameProps } from "../scenes/classic-mode/ClassicMode";
import "./GameEngine.css"
import ClassicModeMenu, { type ClassicGameMenuProps } from "../scenes/classic-mode-menu/ClassicModeMenu";

export default function GameEngine() {
  // TODO: figure out how to enforce currentSceneName coming from SceneDict (should i?)
  const [currentSceneName, setCurrentSceneName] = useState<string>(SceneDict.MAIN_MENU);
  const [teams, setTeams] = useState<Team[]>([]);

  const handleSceneChange = (newSceneName: string) => {
    setCurrentSceneName(newSceneName);
  };

  // Factory function that builds props based on scene type
  const getSceneProps = (sceneName: string) => {
    const baseProps = { handleChangeSceneButtonClick: handleSceneChange };

    switch (sceneName) {
      case SceneDict.CLASSIC_GAME:
        return { ...baseProps, teams } // ClassicGameProps;
      case SceneDict.CHALLENGE_GAME_MENU:
        return { ...baseProps, setTeams } // ClassicGameMenuProps;
      default:
        return baseProps;
    }
  };

  const sceneComponentMap: Record<string, JSX.Element> = {
    [SceneDict.DEV_GAME]: <DevGame {...getSceneProps(SceneDict.DEV_GAME)} />,
    [SceneDict.CLASSIC_GAME]: <ClassicGame {...(getSceneProps(SceneDict.CLASSIC_GAME) as ClassicGameProps)} />,
    [SceneDict.CHALLENGE_GAME]: <DevGame {...getSceneProps(SceneDict.CHALLENGE_GAME)} />,
    [SceneDict.CHALLENGE_GAME_MENU]: <ClassicModeMenu {...(getSceneProps(SceneDict.CHALLENGE_GAME_MENU) as ClassicGameMenuProps)} />,
  };

  const currentSceneComponent = sceneComponentMap[currentSceneName] ||
    <MainMenu {...getSceneProps(SceneDict.MAIN_MENU)} />;

  return <div className="gameEngine">{currentSceneComponent}</div>;
}
