import { useEffect, useState, type JSX } from "react";
import { SceneDict } from "../../lib/definitions";
import type { Question, QuestionsResponseJSON, Team } from "../../lib/definitions";
import MainMenu from "../scenes/main-menu/MainMenu";
import DevGame from "../scenes/dev-game/DevGame";
import ClassicGame, { type ClassicGameProps } from "../scenes/classic-mode/ClassicMode";
import "./GameEngine.css"
import ClassicModeMenu, { type ClassicGameMenuProps } from "../scenes/classic-mode-menu/ClassicModeMenu";
import { getQuestions, newGetQuestions } from "../../lib/actions";
import WinnerScene, { type WinnerSceneProps } from "../scenes/winner-scene/WinnerScene";
import { QUESTIONS_URL } from "../../lib/utils";

export default function GameEngine() {
  // TODO: figure out how to enforce currentSceneName coming from SceneDict (should i?)
  const [currentSceneName, setCurrentSceneName] = useState<string>(SceneDict.MAIN_MENU);

  const [questionsList, setQuestionsList] = useState<Question[]>([])
  const [teams, setTeams] = useState<Team[]>([]);
  const [winningTeamIndex, setWinningTeamIndex] = useState(0);

  const retrieveQuestions = async () => {
    try {
      const getQuestResponse: QuestionsResponseJSON = await getQuestions();
      console.log(await newGetQuestions());
      console.log("Finished fetching questions")
      setQuestionsList(getQuestResponse.data) // TODO: Currently setting the array to all questions in database (no bueno?)
    } catch (e) {
      console.error(e);
    }
  }

  const retrieveQuestions2 = async () => {
    try {
      console.log("Raw fetch")
      console.log((await fetch(QUESTIONS_URL)).text())
    } catch (e) {
      console.error(e)
    }
  }

  const retrieveQuestions3 = async () => {
    try {
      console.log("newGetQuestions")
      console.log(await newGetQuestions())
    } catch (e) {
      console.error(e)
    }
  }

  useEffect((() => {
    if(questionsList.length > 0) retrieveQuestions() // prevent this from running for testing
    retrieveQuestions3()
    retrieveQuestions2()
  }), [])

  const handleSceneChange = (newSceneName: string) => {
    setCurrentSceneName(newSceneName);
  };

  // Factory function that builds props based on scene type
  const getSceneProps = (sceneName: string) => {
    const baseProps = { handleChangeSceneButtonClick: handleSceneChange };

    switch (sceneName) {
      case SceneDict.CLASSIC_GAME:
        return { ...baseProps, setWinningTeam: setWinningTeamIndex, teams, questions: questionsList } as ClassicGameProps// ClassicGameProps;
      case SceneDict.CHALLENGE_GAME_MENU:
        return { ...baseProps, setTeams } as ClassicGameMenuProps;
      case SceneDict.WINNER_SCENE:
        return { ...baseProps, winningTeam: teams[winningTeamIndex] } as WinnerSceneProps;
      default:
        return baseProps;
    }
  };

  const sceneComponentMap: Record<string, JSX.Element> = {
    [SceneDict.DEV_GAME]: <DevGame {...getSceneProps(SceneDict.DEV_GAME)} />,
    [SceneDict.CLASSIC_GAME]: <ClassicGame {...(getSceneProps(SceneDict.CLASSIC_GAME) as ClassicGameProps)} />,
    [SceneDict.CHALLENGE_GAME]: <DevGame {...getSceneProps(SceneDict.CHALLENGE_GAME)} />,
    [SceneDict.CHALLENGE_GAME_MENU]: <ClassicModeMenu {...(getSceneProps(SceneDict.CHALLENGE_GAME_MENU) as ClassicGameMenuProps)} />,
    [SceneDict.WINNER_SCENE]: <WinnerScene {...(getSceneProps(SceneDict.WINNER_SCENE) as WinnerSceneProps)} />,
  };

  const currentSceneComponent = sceneComponentMap[currentSceneName] ||
    <MainMenu {...getSceneProps(SceneDict.MAIN_MENU)} />;

  return <div className="gameEngine">{currentSceneComponent}</div>;
}
