import React, { useEffect, useState } from "react";
import "../App.css";
import Meme from "./Meme";
import axios from "axios";
const Memes = ({ serverURL, parentState }) => {
    const [memeState, setMemeState] = useState([]);
    //fetch data from backend
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
    //display all the fetched memes in individual 'Meme' Component
    return (
        <>
            {memeState.map((val, ind) => {
                return <Meme key={ind} serverURL={serverURL} {...val} />;
            })}
        </>
    );
};

export default Memes;
