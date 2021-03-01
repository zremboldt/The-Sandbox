import React, { useState } from 'react';

export default function EndOfGameModal({ allPlayerData }) {
  const [winner, setWinner] = useState();

  console.log(allPlayerData)

  const handleShuffleButtonClick = () => {
    console.log('RESET GAME')
  }

  // NOTE: Account for ties

  const largestScore = allPlayerData.reduce((acc, current) => {
    if (current.score > acc.score) {
      return { 
        name: current.name, 
        score: current.score 
      }
    }
  }, { name: '', score: 0 })

  setWinner(largestScore)

  if (winner) {
    return (
      <div className='modal-bg'>
        <div className='end-game-modal'>
          
          <h1 className='end-game-message'>{largestScore.name} wins!</h1>
          <button className="button button__primary" onClick={() => handleShuffleButtonClick()}>Play again!</button>
        </div>
      </div>
    )
  }
}