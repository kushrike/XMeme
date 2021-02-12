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
                data["id"] = Date.now().toString().substring(1);
                data["_id"] = data["id"];
                //save the new Meme to database
                const newMeme = new Meme(data);
                newMeme
                    .save()
                    .then((doc) => {
                        console.log(doc);

                        //sending back id as response
                        res.send({ id: doc["id"] });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send({
                            error: "Unable to save meme to database",
                        });
                    });
            }
        } else {
            res.status(422).send({ error: "Unprocessable Entity" });
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

//Controls sending back latest 100 memes
export const fetchMemes = (req, res) => {
    try {
        Meme.find({})
            .sort({ _id: -1 })
            .limit(100)
            .exec()
            .then((docs) => {
                //send the docs as response
                docs = docs.map((doc) => {
                    const { id, name, url, caption } = doc;
                    return { id: id, name: name, url: url, caption: caption };
                });
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
        //finding meme by passed <id>
        Meme.find({ id: req.params.memeID })
            .then((docs) => {
                //docs is an array of all matching meme IDs
                if (docs.length === 0)
                    res.status("404").send("Meme ID not found");
                else {
                    docs = docs.map((doc) => {
                        const { id, name, url, caption } = doc;
                        return {
                            id: id,
                            name: name,
                            url: url,
                            caption: caption,
                        };
                    });
                    res.send(docs[0]);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ error: err });
            });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

//Controls the editing of existing memes
export const editMeme = (req, res) => {
    try {
        if (!req.body.caption && !req.body.url) {
            res.status(400).send(); //Bad data format in request
        } else {
            //Building the data object to update the matching meme
            const data = {};
            if (req.body.caption) data["caption"] = req.body.caption;
            if (req.body.url) data["url"] = req.body.url;
            Meme.findOneAndUpdate(
                { id: req.params.memeID },
                data,
                (err, doc) => {
                    if (!doc) {
                        res.status(404).send();
                    } else res.status(200).send();
                }
            );
        }
    } catch (err) {
        res.status(500).send();
    }
};
