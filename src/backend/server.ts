import express from "express"
import cors from "cors"
import * as dotenv from 'dotenv';

//!: use middleware to wrap requests in appropriate cors authorization
dotenv.config();
const { QUESTIONS_URL, VITE_LOCAL_SERVER_PORT } = process.env
const app = express()
app.use(cors())

// app.use("/api", async (req, res) => {
app.use("/get-all-questions", async (_, res) => {
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

app.listen(VITE_LOCAL_SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${VITE_LOCAL_SERVER_PORT}`);
})
