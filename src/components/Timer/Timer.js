// import React from 'react';
// import {Component} from "react";

// const Timer = (props) => {
//   return (
//     <div className="col-md-4">
//       <h2> Timer: <span className="timer" id="timer"> {props.seconds} </span> </h2>
//     </div>
//   )

// }


import React, {
  Component
} from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: null
    };
    //this.timerWrapper = this.timerWrapper.bind(this);
  }

  componentWillReceiveProps(props) {
    console.log("rp", this.state.seconds);
    console.log(this.props.seconds);
  
    this.setState({
      seconds: this.props.seconds
    });


  }

  componentDidMount() {
    console.log("DidMount", this.state.seconds);
    console.log(this.state.seconds);
    this.componentWillReceiveProps() 
    this.interval = setInterval(() => {
      console.log(this.state.seconds)
      if (this.props.seconds >= 0) {
        this.setState({
          seconds: this.state.seconds + 1
        });
      }
    }
    
    , 1000);
  }

  componentWillUnmount() {
    console.log("WillUnmount");
    clearInterval(this.interval);
  }

  render() {

    return (
      <div className="col-md-4">
        <h2> Timer: <span className="timer" id="timer"> {this.state.seconds} </span> </h2>
      </div>
    )
  }
}

export default Timer;