import React, { useEffect, useState } from "react";
import "../App.css";
import Meme from "./Meme";
import axios from "axios";
// import memes from "./data";
const Memes = ({ serverURL, parentState }) => {
    const [memeState, setMemeState] = useState([]);
    //fetch data from backend
	console.log('Memes component rerendered');
    //handle the re-render;
    useEffect(() => {
        axios
            .get(serverURL)
            .then((meme) => {
                return meme.data;
            })
            .then((data) => {
                setMemeState(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [parentState]);
    return (
        <>
            {memeState.map((val, ind) => {
                return <Meme key={ind} {...val} />;
            })}
        </>
    );
};

export default Memes;
