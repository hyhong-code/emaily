import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          href="/auth/google"
          style={{
            color: "white",
            textDecoration: "none",
            border: "1px solid white",
            borderRadius: "5px",
            padding: "1rem",
            fontSize: "1rem",
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          Signin with Google
        </a>
      </header>
    </div>
  );
}

export default App;
