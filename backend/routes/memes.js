import { Router } from "express";
const router = Router();
import {fetchMemes, createMeme, findMeme} from "../src/controller/memeController.js";

//routes accessed /memes/
router.route('/')
.get( (req, res) => {
    //send back 100 memes
    //refer crio.do
    fetchMemes(req, res);
    console.log("GET /memes");
})
.post((req, res) => {
    createMeme(req, res);
    console.log("POST /memes");
});

router.route('/:memeID')
.get( (req, res) => {
    findMeme(req, res);
    console.log("GET Meme ID " + req.params.memeID);
})

//TODO
//PATCH request to edit memes,

export default router;
