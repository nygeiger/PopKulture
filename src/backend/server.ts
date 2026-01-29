import express from "express"
import cors from "cors"
import { LOCAL_SERVER_PORT, QUESTIONS_URL } from "../lib/utils.ts"

// TODO: Is node (as seen in the script in package.json) the recommended way to start a backend for typescript react

const app = express()
app.use(cors())

// use middleware to wrap requests in appropriate cors authorization

// app.use("/api", async (req, res) => {
app.use("/get-all-questions", async (_, res) => {
    // const reqURL = `${QUESTIONS_URL}${req.url}` // will probably need for potential post requests
    const reqURL = `${QUESTIONS_URL}`
    try {
        const apiResponse = await fetch(reqURL);
        const data = await apiResponse.text(); // should i go ahead and json it?
        res.send(data);
    } catch (error) {
        res.status(500).send("Error fetching data from the Questions API.");
    }
})

// app.use("/hello-backend", async (req, res) => {
app.use("/hello-backend", async (_, res) => {
    // console.log("Received Hello <3\n \t sending back hello")
    res.send("Hello Front End :)")
})

// app.use((err: any, req: any, res: any, nex: any) => {
app.use((err: any, res: any) => {
    console.error("Global error handler caught:", err.stack); // Log the full stack trace
    if (!res.headersSent) { // Check if a response has already been sent
        res.status(500).send('Something broke!');
    }
});

app.listen(LOCAL_SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${LOCAL_SERVER_PORT}`);
})
