import express, { Router } from "express";
import cors from "cors"
import serverless from "serverless-http";
import { QUESTIONS_URL } from "../../src/lib/utils.ts"

const api = express();

const router = Router();
router.get("/hello-server", (req, res) => res.send("Hello Front End :)"));

// api.use("/api/", router);
// api.use("'/.netlify/functions/api'", router);

const app = express()
app.use("'/.netlify/functions/api'", router);
app.use(cors())

// New route to handle requests to jservice api
// use middleware to wrap requests in appropriate cors authorization
// app.use("/api", async (req, res) => {

// app.use("/api", async (req, res) => {
// app.use("/api", async (_, res) => {
//     // const reqURL = `${QUESTIONS_URL}${req.url}` // will probably need for potential post requests
//     const reqURL = `${QUESTIONS_URL}`
//     try {
//         const apiResponse = await fetch(reqURL);
//         const data = await apiResponse.text(); // should i go ahead and json it?
//         res.send(data);
//     } catch (error) {
//         res.status(500).send("Error fetching data from the Questions API.");
//     }
// })

// app.use("/hello-server", async (req, res) => {
// app.use("/hello-server", async (_, res) => {
//     // console.log("Recieved Hello <3\n \t sending back hello")
//     res.send("Hello Front End :)")
// })

// app.use((err: any, req: any, res: any, nex: any) => {
// app.use((err: any, res: any) => {
//     console.error("Global error handler caught:", err.stack); // Log the full stack trace
//     if (!res.headersSent) { // Check if a response has already been sent
//         res.status(500).send('Something broke!');
//     }
// });

// export const handler = serverless(api);
export const handler = serverless(app);