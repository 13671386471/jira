import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectScreen } from "screeen";
import { TryUserArray } from "screeen/try-user-array";
function App() {
  return ( 
    <div className="App">
      <ProjectScreen />
      <TryUserArray />
    </div>
  );
}

export default App;
