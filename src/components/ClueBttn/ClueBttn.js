import React, { Component } from 'react'
import "./ClueBttn.css";

class ClueBttn extends Component {

  render() {
    return (
      <div id="clue">
        <button id="get-clue" className="primary-btn" onClick={this.performSearch} type="button">Get Clue</button>
        <div id="got-clue">
          <h3> <span id="clue-ppl">  </span> </h3>
        </div>
      </div>
    )
  }

}

export default ClueBttn;