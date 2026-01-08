import express from "express"
import cors from "cors"
import { LOCAL_SERVER_PORT, QUESTIONS_URL } from "../lib/utils.ts"

// TODO: Is node (as seen in the script in package.json) the recommended way to start a backend for typescript react

const app = express()
app.use(cors())

// New route to handle requests to jservice api
// use middleware to wrap requests in appropriate cors authorization
// app.use("/api", async (req, res) => {

app.use("/api", async (req, res) => {
    // const reqURL = `${QUESTIONS_URL}${req.url}` // will probably need for potential post requests
    const reqURL = `${QUESTIONS_URL}`
    console.log(reqURL);
    try {
        const apiResponse = await fetch(reqURL);
        const data = await apiResponse.text(); // should i go ahead and json it?
        console.log("Sending forward the data: " + data)
        res.send(data);
    } catch (error) {
        res.status(500).send("Error fetching data from the Questions API.");
    }
    console.log("made it through without catching error ><")
})

app.use("/hello-server", async (req, res) => {
    console.log("Recieved Hello <3\n \t sending back hello")
    res.send("Hello Front End :)")
})

app.use((err: any, req: any, res: any, nex: any) => {
    console.error("Global error handler caught:", err.stack); // Log the full stack trace
    if (!res.headersSent) { // Check if a response has already been sent
        res.status(500).send('Something broke!');
    }
});

// const PORT = 6000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// })
app.listen(LOCAL_SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${LOCAL_SERVER_PORT}`);
})