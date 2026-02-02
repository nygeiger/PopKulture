import { useEffect, useState, type JSX } from "react";
import { SceneDict } from "../../lib/definitions";
import type { Question, QuestionsResponseJSON, Team } from "../../lib/definitions";
import MainMenu from "../scenes/main-menu/MainMenu";
import DevGame from "../scenes/dev-game/DevGame";
import ClassicGame, { type ClassicGameProps } from "../scenes/classic-mode/ClassicMode";
import "./GameEngine.css"
import ClassicModeMenu, { type ClassicGameMenuProps } from "../scenes/classic-mode-menu/ClassicModeMenu";
import { getQuestions } from "../../lib/actions";
import WinnerScene, { type WinnerSceneProps } from "../scenes/winner-scene/WinnerScene";
import ChallengeMode, { type ChallengeModeProps } from "../scenes/challenge-mode/ChallengeMode";
import ChallengeOverScene, { type ChallengeOverProps } from "../scenes/challenge-over-scene/ChallengeOver";

export default function GameEngine() {
  // TODO: figure out how to enforce currentSceneName coming from SceneDict (should i?)
  const [currentSceneName, setCurrentSceneName] = useState<string>(SceneDict.MAIN_MENU);

  // For all game modes
  const [questionsList, setQuestionsList] = useState<Question[]>([])

  // For Classic Mode
  const [teams, setTeams] = useState<Team[]>([]);
  const [winningTeamIndex, setWinningTeamIndex] = useState(0);

  // For Challenge Mode
  const [challengeScore, setChallengeScore] = useState(0);

  const retrieveQuestions = async () => {
    try {
      const getQuestResponse: QuestionsResponseJSON = await getQuestions();
      setQuestionsList(getQuestResponse.data) // TODO: Currently setting the array to all questions in database (no bueno?)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect((() => {
    retrieveQuestions() // prevent this from running for testing
  }), [])

  const handleSceneChange = (newSceneName: string) => {
    setCurrentSceneName(newSceneName);
  };

  // Factory function that builds props based on scene type
  const getSceneProps = (sceneName: string) => {
    const baseProps = { handleChangeSceneButtonClick: handleSceneChange };
    switch (sceneName) {
      case SceneDict.CLASSIC_GAME:
        const cgProps: ClassicGameProps = { ...baseProps, setWinningTeam: setWinningTeamIndex, teams, questions: questionsList };
        return cgProps
      case SceneDict.CLASSIC_GAME_MENU:
        const cgmProps: ClassicGameMenuProps = { ...baseProps, setTeams };
        return cgmProps
        case SceneDict.CHALLENGE_GAME:
          const chgProps: ChallengeModeProps = { ...baseProps, questions: questionsList, setChallengeScore: setChallengeScore };
        return chgProps;
        case SceneDict.CHALLENGE_OVER:
          const chgoProps: ChallengeOverProps = { ...baseProps, points: challengeScore };
        return chgoProps;
      case SceneDict.WINNER_SCENE:
        const wsProps: WinnerSceneProps = { ...baseProps, winningTeam: teams[winningTeamIndex] };
        return  wsProps;
      default:
        return baseProps;
    }
  };

  const sceneComponentMap: Record<string, JSX.Element> = {
    [SceneDict.DEV_GAME]: <DevGame {...getSceneProps(SceneDict.DEV_GAME)} />,
    [SceneDict.CLASSIC_GAME]: <ClassicGame {...(getSceneProps(SceneDict.CLASSIC_GAME) as ClassicGameProps)} />,
    [SceneDict.CHALLENGE_GAME]: <ChallengeMode {...getSceneProps(SceneDict.CHALLENGE_GAME) as ChallengeModeProps}/>,
    [SceneDict.CLASSIC_GAME_MENU]: <ClassicModeMenu {...(getSceneProps(SceneDict.CLASSIC_GAME_MENU) as ClassicGameMenuProps)} />,
    [SceneDict.WINNER_SCENE]: <WinnerScene {...(getSceneProps(SceneDict.WINNER_SCENE) as WinnerSceneProps)} />,
    [SceneDict.CHALLENGE_OVER]: <ChallengeOverScene {...getSceneProps(SceneDict.CHALLENGE_OVER) as ChallengeOverProps} />
  };

  const currentSceneComponent = sceneComponentMap[currentSceneName] ||
    <MainMenu {...getSceneProps(SceneDict.MAIN_MENU)} />;

  return <div className="gameEngine">{currentSceneComponent}</div>;
}
