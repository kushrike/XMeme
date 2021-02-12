import React, { useEffect, useState } from "react";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from "reactstrap";
import "../App.css";
import EditForm from "./EditForm";
const Meme = function ({ id, name, caption, url, serverURL }) {
    //state to store 'Edit Mode' of this Meme component
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => {
        setEdit(!edit);
    };

    // state variable to store the information of this meme, and update it 
    // accordingly when 'edit' button is pressed
    const [memeData, setMemeData] = useState({
        id: "",
        name: "",
        caption: "",
        url: "",
    });
    useEffect(() => {
        let temp = memeData;
        temp["id"] = id;
        temp["caption"] = caption;
        temp["url"] = url;
        temp["name"] = name;
        setMemeData({ ...temp });
    }, [caption, url]);

    // function to update the changed values of caption and url, executed 
    // from EditForm Component
    const changeCaptionAndURL = (newCaption, newURL) => {
        let temp = memeData;
        temp["caption"] = newCaption;
        temp["url"] = newURL;
        setMemeData({
            ...temp,
        });
    };
    
    //handler function to provide default meme template in case of faulty image URL
    const addDefaultSrc = (ev) => {
        ev.target.src = "template.jpg";
    };

    //display individual meme as a separate Card
    return (
        <>
            <div className="cardComponents">
                <Card>
                    <CardImg
                        className="cardImg"
                        top
                        width="80%"
                        height="50%"
                        src={memeData.url}
                        onError={addDefaultSrc}
                    />
                    <CardBody>
                        <CardTitle tag="h2">{memeData.caption}</CardTitle>
                        <CardSubtitle tag="h2" className="mb-2 text-muted">
                            {memeData.name}
                        </CardSubtitle>
                        <Button
                            className={`btn btn-success ${
                                edit ? "d-none" : ""
                            }`}
                            onClick={toggleEdit}
                        >
                            Edit
                        </Button>
                        <EditForm
                            edit={edit}
                            toggleEdit={toggleEdit}
                            id={memeData.id}
                            caption={memeData.caption}
                            url={memeData.url}
                            serverURL={serverURL}
                            changeCaptionAndURL={changeCaptionAndURL}
                        />
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default Meme;
