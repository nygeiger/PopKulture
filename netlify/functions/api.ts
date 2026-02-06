import express, { Router } from "express";
import serverless from "serverless-http";
import { QUESTIONS_URL } from "../../src/lib/utils.ts"

const router = Router();

router.get("/hello-backend", (req, res) => {
    try {
        res.send("Hello Front End :)")
    } catch (error) {
        res.status(500).send("Error fetching data from the Questions API. \n" + error);
    }
});

router.get("/get-all-questions", async (req, res) => {
    const reqURL = `${QUESTIONS_URL}`
    try {
        const apiResponse = await fetch(reqURL);
        const data = await apiResponse.text(); // should i go ahead and json it?
        res.send(data);
    } catch (error) {
        res.status(500).send("Error fetching data from the Questions API.");
    }
});

const app = express()
app.use("/.netlify/functions/api", router);

export const handler = serverless(app);