import React, { Component } from "react";
import "./App.css";
import "./Reset.css"
import Hangman from "./Hangman";
import Footer from "./components/Footer";


class App extends Component {
  render() {
    return (
      <div className="all-body">
        <div className="landing--container">
          <Hangman />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
