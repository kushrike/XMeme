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
            alt="Card image cap"
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
