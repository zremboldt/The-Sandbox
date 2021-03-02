import React, { useEffect, useState } from 'react';
import launchConfetti from './../utils/launch-confetti'

export default function EndOfGameModal({ allPlayerData }) {
  const [endResult, setEndResult] = useState();

  useEffect(() => {
    let largestScore = {};

    for (let i = 0; i < allPlayerData.length; i++) {
      const { name, score } = allPlayerData[i];

      if (!largestScore.score) {
        largestScore.name = name;
        largestScore.score = score;
      } else if (score > largestScore.score) {
        largestScore.name = name;
        largestScore.score = score;
      } else if (score === largestScore.score) {
        largestScore = 'tie';
      }
    }

    setEndResult(largestScore)
    launchConfetti()
  }, [allPlayerData])

  // NOTE: Need a way to reset the game
  const handleShuffleButtonClick = () => {
    console.log('RESET GAME')
  }

  if (endResult) {
    return (
      <div className='modal-bg'>
        <div className='end-game-modal'>
          
          <h1 className='end-game-message'>{endResult === 'tie' ? 'Tie game!' : `${endResult.name} wins!`}</h1>
          <button className="button button__primary" onClick={() => handleShuffleButtonClick()}>Play again!</button>
        </div>
      </div>
    )
  } else return null;
}