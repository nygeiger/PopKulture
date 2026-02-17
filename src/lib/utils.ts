export const IS_DEBUG = import.meta.env.VITE_DEBUG === "1";
export const VITE_LOCAL_SERVER_PORT = import.meta.env.VITE_LOCAL_SERVER_PORT;

export const MAX_TEAMS = 5;
export const QUESTIONS_INITIAL_POINTS = 1000;
export const WRONG_ANSWER_PENALTY = 200;
export const POINTS_TO_WIN = 10000;
export const CHALLENGE_MODE_TIME_LIMIT = 90;

export const getRandomNum = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};