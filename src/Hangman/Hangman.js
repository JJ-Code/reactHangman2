
import React, { Component } from "react";
import { randomWord } from "./words";
import ClueBttn from '../components/ClueBttn/';
import Timer from '../components/Timer';
import "./Hangman.css";
import ReactStopwatch from 'react-stopwatch';



class Hangman extends Component {
  /** by default, allow 5 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6
  }

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(), //The Set object lets you store unique values of any type, whether primitive values or object references.
      gameWord: randomWord(),
      wordLetter: new Set(),
      seconds: 0,
      wins: 0,
      losses: 0,
      endGame: false
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
    //this.startTimer = this.startTimer.bind(this)
  }

  reset() {
    let test = this.win();
    this.setState(st => ({
      nWrong: 0,
      guessed: new Set(),
      gameWord: randomWord(),
      seconds: 0,
      losses: test ? st.losses += 1 : st.losses,
      wins: test ? st.wins : st.wins += 1,
      endGame: false
    }));
  }



  gameArr() {

    return this.state.gameWord
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "blank"))
  }



  guessedWord() {
    return this.state.gameWord.split("").map((letter, i) => {
      if (this.state.guessed.has(letter)) {
        return <img src={`./images/${letter}-title.jpg`}
          onClick={this.handleGuess} className="blank-letter letter"
          alt="" key={`${letter}+${i}`} letter={letter} />
      }
      else {
        return <img src="images/blank-title.jpg"
          data-letter="blank" key={i} data-id={i}
          className="blank-letter letter" alt="blank" />
      }
    });
  }


  handleGuess(event) {
    event.preventDefault()
    console.log(event.currentTarget.attributes)

    console.log(event.currentTarget.attributes.letter.value)
    let letter = event.currentTarget.attributes.letter.value;
    console.log(this.state.nWrong)
    this.win()

    this.setState(st => ({
      guessed: st.guessed.add(letter),
      nWrong: st.nWrong + (st.gameWord.includes(letter) ? 0 : 1)
    }));
  }

  generateABCtiles() {
    console.log(this.state.gameWord);
    console.log(this.state.guessed);

    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <img src={`./images/${letter}-title.jpg`}
        onClick={this.handleGuess} className="letter abc-tiles"
        alt="" disabled={this.state.guessed.has(letter)}
        key={letter} letter={letter} />

    ));
  }

  randomAbcTiles() {

    //shuffling thru the array to make ABC tiles random 
    return this.generateABCtiles().map((a) => ({
      sort: Math.random(),
      value: a
    }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    //console.log(randArr)
  }


  win() {
    console.log("ran in time");
    let test = this.gameArr()
    return test.some(state => state === "blank")
  }




  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const notWinner = this.win();
    let gameState = this.randomAbcTiles();
    if (notWinner === false) gameState = "You win!";
    if (gameOver) gameState = "You Lose!";

    console.log(gameOver);


    return (

      <div className="landing--title">
        <h1>Movie Scrabble Hangman!</h1> <br />
        <p>Click a letter</p><br />
        {console.log(gameOver)}
        <div className="row">
          <div className="col-md-4">
            <h2>Number of Lives: <span className="lives-score"> {this.props.maxWrong - this.state.nWrong} </span> </h2>
          </div>

          <ReactStopwatch seconds={0} minutes={0} hours={0}
            onChange={({ hours, minutes, seconds }) => {
              // do something
              //console.log("hi bk");

            }}
            onCallback={() => console.log('Finish')}
            render={({ formatted, hours, minutes, seconds }) => {
              return (
                <div className="col-md-4">
                  <h2>
                    Timer: <span className="timer" id="timer">{formatted} </span>
                  </h2>
                </div>
              );
            }}
          />

          {/* <Timer seconds={(this.state.seconds >= 0) ? this.startTimer : this.state.seconds } /> */}

          <div className="col-md-4">
            <h2>Wins: <span className="win-score">{this.state.wins}</span></h2>
            <h2>Losses: <span className="loss-score">{this.state.losses}</span></h2>
          </div>
        </div>
        <div id="game-area">

          {/* <!-- create space for blank letters. If gameover will display word-->*/}
          {!gameOver ? <div id="word-to-guess">{this.guessedWord()}</div> : <h2 className='Hangman-word'>The game word is {this.state.gameWord}</h2>}

          <br /><br />
          <div className="landing--line"> </div>
          {/* <!-- this is to create clicking board --> */}

          <h2 id="dom-update"> </h2>

          <div id="abc-tiles"><h2 className="gameState">{gameState}</h2></div>
          <ClueBttn word={this.state.gameWord} gameOver={gameOver} /> <br /> <br />
          {console.log(gameOver)}
          <button id="reset-game" className="primary-btn" onClick={this.reset} type="button">Reset Game</button>
          <div className="landing--line"> </div>
          <br /> <br />
          {/* <!-- this is to where the wrong tiles will go--> */}
          <div id="wrong-tiles"></div>

        </div>
      </div>
    )
  }
}


export default Hangman;