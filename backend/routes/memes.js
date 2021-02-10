import { Router } from "express";
const router = Router();
import {fetchMemes, createMeme, findMeme, editMeme} from "../src/controller/memeController.js";

//routes accessed /memes/

router.route('/')
.get( (req, res) => {
    //send back 100 memes
    fetchMemes(req, res);
    console.log("GET /memes");
})
.post((req, res) => {
    //create a new meme
    createMeme(req, res);
    console.log("POST /memes");
});

router.route('/:memeID')
.get( (req, res) => {
    //find the meme passed as memeID and send it back
    findMeme(req, res);
    console.log("GET Meme ID " + req.params.memeID);
})
.patch((req, res) => {
    //find the meme passed as memeID and edit it based on User's request
    editMeme(req, res);
    console.log("Edit Meme ID " + req.params.memeID);
})


export default router;
