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
const Meme = ({name, caption, url}) => { 
  // Got to add id here
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
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h2">{name}</CardTitle>
            <CardSubtitle tag="h2" className="mb-2 text-muted">
              {caption}
            </CardSubtitle>
            <Button className="btn btn-success">Edit</Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Meme;
