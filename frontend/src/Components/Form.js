import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import "../App.css";
import axios from "axios";

const Forms = ({ serverURL, swaggerURL, toggleState }) => {
    // state to manage Input Form data
    let [inputState, setInputState] = useState({
        name: "",
        caption: "",
        url: "",
    });
    // state to display error message on the page
    const [errMsg, setErrMsg] = useState("");

    // Form helper functions
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputState.name && inputState.caption && inputState.url) {
            //send data to backend
            axios({
                method: "post",
                url: serverURL,
                data: inputState,
            })
                .then((data) => {
                    console.log(data.data);
                    //re render Memes component
                    toggleState();
                })
                .catch((err) => {
                    if (err.response) {
                        setErrMsg(err.response.data.error);
                    }
                });
            //clear the Form
            setInputState({ name: "", caption: "", url: "" });
            setErrMsg("");
        } else {
            setErrMsg("Make Sure all fields are filled correctly");
        }
    };

    const handleChange = (e) => {
        let temp = inputState;
        temp[e.target.name] = e.target.value;
        setInputState({
            ...temp,
        });
    };

    return (
        <>
            <div className="description">
                <h1>
                    <b>Meme Stream Application</b>
                </h1>
                <Button
                    className="btn pl-5 pr-5"
                    onClick={()=> {
                        window.open(swaggerURL);
                    }}
                >
                    Swagger
                </Button>
            </div>
            <div className="form__container">
                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label xs={4}>Name*</Label>
                        <Col xs={8}>
                            <Input
                                name="name"
                                placeholder="Creator's Name"
                                value={inputState.name}
                                onChange={handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label xs={4}>Caption*</Label>
                        <Col xs={8}>
                            <Input
                                name="caption"
                                placeholder="Caption"
                                value={inputState.caption}
                                onChange={handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label xs={4}>Image URL*</Label>
                        <Col xs={8}>
                            <Input
                                name="url"
                                placeholder="URL"
                                value={inputState.url}
                                onChange={handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <h5 className="err-msg"> {errMsg}</h5>
                    <FormGroup className="text-center">
                        <Button
                            type="submit"
                            className="btn btn-success pl-5 pr-5"
                        >
                            Submit
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        </>
    );
};

export default Forms;
