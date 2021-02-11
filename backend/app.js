import express, { json } from "express";
import dbConnection from "./db.js";
import memes from "./routes/memes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();
const swaggerApp = express();

const port = 8081;
const swaggerPort = 8080;

// use JSON parsing
app.use(json());
// allow Cross Origin Resource Sharing
app.use(cors());

//redirect requests to '/memes' to './routes/memes' middleware
app.use("/memes", memes);

app.get("/", (req, res) => {
    //route '/' has not been defined
    res.status("404").send();
});

//Start the express server and establish connection to the database
app.listen(port, () => {
    console.log(`Xmeme app listening at http://localhost:${port}`);
    dbConnection();
});

//set up Swagger documentation on localhost:8080
swaggerApp.use(
    "/swagger-ui/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
swaggerApp.listen(swaggerPort, () => {
    console.log(`SwaggerUI started at http://localhost:${swaggerPort}`);
});
