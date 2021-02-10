import { useState } from 'react';
import './App.css';
import Form from'./Components/Form';
import Memes from './Components/Memes';
import serverURL from "./serverLocation";

function App() {
    const [state, setState] = useState(false);
    const toggleState = () => {
        console.log("App me toggleState called");
        const curState = state;
        setState(!curState);
    };
  return (
      <div className="App">
          <header className="App-header">
              <Form serverURL={serverURL} toggleState={toggleState} />
              <Memes serverURL={serverURL} parentState={state}/>
          </header>
      </div>
  );
}

export default App;
