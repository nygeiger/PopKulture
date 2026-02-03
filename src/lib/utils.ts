export const LOCAL_SERVER_PORT: number = 5500; // not ideal to store like this but okay for this app
export const QUESTIONS_URL: string = "https://script.google.com/macros/s/AKfycbwHadvBmbKk3qhCt_DPAugvQU6syg3RicPthWOYpFbZ6MQTg5xfCG88i42Ej2aVrusU8g/exec";

export const MAX_TEAMS = 5

export const QUESTIONS_INITIAL_POINTS = 1000
export const WRONG_ANSWER_PENALTY = 200
export const POINTS_TO_WIN = 10000

export const CHALLENGE_MODE_TIME_LIMIT = 90

export const getRandomNum = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};