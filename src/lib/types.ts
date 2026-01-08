export const SceneDict = { MAIN_MENU: "mainMenuScene", TRIVIA_GAME: "triviaGameScene" } as const

export type SceneType = typeof SceneDict[keyof typeof SceneDict];
