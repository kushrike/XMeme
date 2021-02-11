import React from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from "reactstrap";
import "../App.css";
const Meme = function ({ name, caption, url }) {
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
                        src={url}
                        onError={addDefaultSrc}
                    />
                    <CardBody>
                        <CardTitle tag="h2">{caption}</CardTitle>
                        <CardSubtitle tag="h2" className="mb-2 text-muted">
                            {name}
                        </CardSubtitle>
                        {/* <Button className="btn btn-success">Edit</Button> */}
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default Meme;
