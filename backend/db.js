import mongoose from "mongoose";

//Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/meme_database";

const dbConnection = () => {
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    //Get the default connection
    const db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
        console.log("Databse connected");
    });
};

export default dbConnection;
