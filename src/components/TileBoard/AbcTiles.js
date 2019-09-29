import React from "react";



const AbcTiles = (props) => {
  console.log(props.gameWord);
  console.log(props.guessed);

  let abcTile = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
    <img src={`./images/${letter}-title.jpg`}
      onClick={props.handleGuess} className="letter abc-tiles"
      alt="" disabled={props.guessed.has(letter)}
      key={letter} letter={letter} />
  ));
  return (
    //shuffling thru the array to make ABC tiles random 
    abcTile.map((a) => ({
      sort: Math.random(),
      value: a
    }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    //console.log(randArr)

  )
}

export default AbcTiles;
