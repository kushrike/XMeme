import express, { json } from "express";
const app = express();
import dbConnection from "./db.js";
import memes from "./routes/memes.js";
import cors from 'cors';
const port = 8081;

// use JSON parsing
app.use(json());
app.use(cors());

//redirect requests to '/memes' to './routes/memes' middleware
app.use("/memes", memes);
app.get("/", (req, res) => {
    res.status("404").send();
});

app.listen(port, () => {
    console.log(`Xmeme app listening at http://localhost:${port}`);
    dbConnection();
});
