import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h4>Logo</h4>
        <button>Sign in</button>
      </header>
      <div className="title-container">
        <h1>Pick the plan that’s right for you.</h1>
        <div className="billing-toggle"></div>
      </div>
    </>
  );
}

export default App;
