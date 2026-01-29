import { LOCAL_SERVER_PORT } from "./utils";

const SERVER_URL = import.meta.env.VITE_IS_NETLIFY ? `/.netlify/functions/api` : `http://localhost:${LOCAL_SERVER_PORT}`;

//TODO: Look to caching
export async function getQuestions() {
    const requestURL = `${SERVER_URL}/get-all-questions`;
    const resp = await fetch(requestURL);
    return resp.json();
}

export async function helloBackend() {
    const requestURL = `${SERVER_URL}/hello-backend`;
    const resp = await fetch(requestURL);
    return resp.text();
}

export function getDefaultCategories() {
    return Array.from({ length: 10 }).map((_, i) => `Question ${i + 1}`);
}

export function getDefaultQuestions() {
    return Array(10).map((_, i) => `Question ${i + 1}`);
}