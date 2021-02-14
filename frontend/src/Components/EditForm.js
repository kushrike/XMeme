import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "../App.css";
import axios from "axios";

const EditForm = ({
    edit,
    toggleEdit,
    id,
    caption,
    url,
    serverURL,
    changeCaptionAndURL,
}) => {
    // state variable to store and update the 'Edit Form' data
    let [inputState, setInputState] = useState({
        caption: "",
        url: "",
    });
    useEffect(() => {
        const temp = inputState;
        temp["caption"] = caption;
        temp["url"] = url;
        setInputState({ ...temp });
    }, [caption, url]);

    // state variable to display error message for input data
    const [errMsg, setErrMsg] = useState("");

    // Form helper functions
    const handleChange = (e) => {
        let temp1 = inputState;
        temp1[e.target.name] = e.target.value;
        setInputState({
            ...temp1,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputState.caption && inputState.url) {
            //send data to backend
            axios({
                method: "patch",
                url: `${serverURL}/${id}`,
                data: inputState,
            })
                .then((data) => {
                    // update the display card information
                    changeCaptionAndURL(inputState.caption, inputState.url);
                    // hide the Edit Form from the card
                    toggleEdit();
                })
                .catch((err) => {
                    if (err.response) {
                        setErrMsg(err.response.data.error);
                    }
                });
        } else {
            setErrMsg("Make Sure all fields are filled correctly");
        }
    };
    return (
        <div className={`form__container w-100 mx-auto ${edit ? "" : "d-none"}`}>
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Input
                        name="caption"
                        placeholder="Caption"
                        value={inputState.caption}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup row>
                    <Input
                        name="url"
                        placeholder="URL"
                        value={inputState.url}
                        onChange={handleChange}
                    />
                </FormGroup>
                <h5 className="err-msg"> {errMsg}</h5>
                <FormGroup className="text-center">
                    <Button type="submit" className="btn btn-success pl-5 pr-5">
                        Save
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
};

export default EditForm;
