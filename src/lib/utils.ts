export const LOCAL_SERVER_PORT: number = 5500; // not ideal to store like this but okay for this app
export const QUESTIONS_URL: string = "https://script.google.com/macros/s/AKfycbwHadvBmbKk3qhCt_DPAugvQU6syg3RicPthWOYpFbZ6MQTg5xfCG88i42Ej2aVrusU8g/exec";

export const getRandomNum = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};