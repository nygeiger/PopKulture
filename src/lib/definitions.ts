export const SceneDict = {
  MAIN_MENU: "mainMenuScene",
  DEV_GAME: "devGameScene",
  CLASSIC_GAME: "classicGameScene",
  CHALLENGE_GAME: "challengeGameScene",
  CLASSIC_GAME_MENU: "classicGameSceneMenu",
  CHALLENGE_GAME_MENU: "challengeGameSceneMenu",
  WINNER_SCENE: "winnerScene",
  CHALLENGE_OVER: "chalOverScene",
} as const;

export type SceneType = (typeof SceneDict)[keyof typeof SceneDict];

export type Question = {
  id: string;
  Category: string;
  Question: string;
  AnswerA: string;
  AnswerB: string;
  AnswerC: string;
  AnswerD: string;
  CorrectAnswer: string;
};

export type QuestionsResponseJSON = {
  debugInfo: string | undefined;
  data: Question[];
};

export type Team = {
  name: string,
  points: number
}
