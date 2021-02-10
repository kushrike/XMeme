import Meme from "../model/memeModel.js";

const checkDuplicateMeme = async (data) => {
    const { name, url, caption } = data;
    const dataCount = await Meme.find({
        name: name,
        caption: caption,
        url: url,
    }).countDocuments();
    if (dataCount === 0) {
        return false;
        //we're good to go :)
    } else {
        return true; //duplicate meme exists :(
    }
};

//Controls creation of a new Meme post
export const createMeme = async (req, res) => {
    try {
        const data = req.body;
        //  validate the request
        if (data.name && data.caption && data.url) {
            //check for duplicate posts
            const duplicatePost = await checkDuplicateMeme(data);

            if (duplicatePost) {
                res.status(409).send({ error: "Duplicate Post" });
            } else {
                //timestamping the id attribute
                data["id"] = Date.now().toString();

                //save the new Meme to database
                const newMeme = new Meme(data);
                newMeme
                    .save()
                    .then((doc) => {
                        console.log(doc);

                        //sending back id as response
                        const resObject = {};
                        resObject["id"] = data["id"];
                        res.json(resObject);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send({
                            error: "Unable to save meme to database",
                        });
                    });
            }
        } else {
            res.status(400).send({ error: "ill formatted request" });
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

//Controls sending back latest 100 memes
export const fetchMemes = (req, res) => {
    try {
        Meme.find({})
            .sort({ id: -1 })
            .limit(100)
            .exec()
            .then((docs) => {
                //send the docs as response
                res.send(docs);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send({ error: err });
            });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

//Controls sending back one meme by its unique id
export const findMeme = (req, res) => {
    try {
        Meme.find({ id: req.params.memeID })
            .then((doc) => {
                if (doc.length === 0)
                    res.status("404").send("Meme ID not found");
                else res.send(doc[0]);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ error: err });
            });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};