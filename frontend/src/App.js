import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Memes from "./Components/Memes";
import {serverURL, swaggerURL} from "./serverLocation";

function App() {
    //using the 'state' variable as the parentState for its children, Form Component and Memes Component
    const [state, setState] = useState(false);
    const toggleState = () => {
        setState(!state);
    };
    return (
        <>
            <header className="App-header">
                <Form serverURL={serverURL} swaggerURL={swaggerURL} toggleState={toggleState} />
                <Memes serverURL={serverURL} parentState={state} />
            </header>
        </>
    );
}

export default App;
