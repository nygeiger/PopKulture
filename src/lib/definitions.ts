export const SceneDict = { MAIN_MENU: "mainMenuScene", TRIVIA_GAME: "triviaGameScene" } as const

export type SceneType = typeof SceneDict[keyof typeof SceneDict];

export type Questions = {
    id: string,
    Category: string,
    Question: string,
    AnswerA: string,
    AnswerB: string,
    AnswerC: string,
    AnswerD: string,
    CorrectAnswer: string
}

export type QuestionsResponseJSON = {
    debugInfo: string | undefined,
    data: Questions[]
}