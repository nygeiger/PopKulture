import { LOCAL_SERVER_PORT } from "./utils";

export function getDefaultCategories() {
    return Array.from({ length: 10 }).map((_, i) => `Question ${i + 1}`);
}

export function getDefaultQuestions() {
    return Array(10).map((_, i) => `Question ${i + 1}`);
}

export async function getQuestions() {
    const local_proxy_url = `http://localhost:${LOCAL_SERVER_PORT}/api`;
    const resp = await fetch(local_proxy_url);
    return resp.json();
}
