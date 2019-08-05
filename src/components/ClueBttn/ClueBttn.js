import React, { Component } from 'react'
import "./ClueBttn.css";
import axios from "axios"

class ClueBttn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clueResults: "",
      gameOver: this.props.gameOver
    };
    this.performSearch = this.performSearch.bind(this);
    this.clickedTest = this.clickedTest.bind(this);
  }

  clickedTest(props) {
    console.log("clicked clicked");
    console.log(this.props.gameOver);
  

  }

  change() {
    console.log("clicked clicked");
    console.log(this.props.gameOver);
    this.setState({ clueResults: "" })

  }

  performSearch = (props = "example") => {
    //console.log(this.props)
    let wordSearch = this.props.word
    axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordSearch}?key=84b98cb2-2053-4c97-9062-34a7f5632399`).then(response => {
      //console.log(response);
      console.log(response.data[0].shortdef[0]);
      return this.setState({
        clueResults: response.data[0].shortdef[0]
      });

    }).catch(err => {
      console.log('Error happened during fetching!', err);
    });

    console.log("clicked clicked BYE");
  };


  render() {
    this.clickedTest()
    return (
      <div id="clue">
        <button id="get-clue" className="primary-btn" onClick={this.performSearch} type="button">Get Clue</button>
        <div id="got-clue">
          {this.props.gameOver ? <h3> <span id="clue-word" onChange={this.change}>  </span></h3> : <h3> <span id="clue-word"> {this.state.clueResults}  </span> </h3>}
        </div>
      </div>
    )
  }

}

export default ClueBttn;