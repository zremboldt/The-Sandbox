import React, { useState } from 'react';
import Plus from '../assets/icon-plus';
import ArrowDown from '../assets/icon-arrow-down';

export default function SetupModal({cardCount, setCardCount, layoutMap, playerNames, setPlayerNames}) {
  const [playerCount, setPlayerCount] = useState(1);

  const handleNameChange = (index) => {
    // const currentPlayers = [...playerNames];

    // if (currentPlayers[index])

    // setPlayerNames(newPlayers)
  }

  return (
    <div className='setup-modal-container'>
      <div className='setup-modal'>
        <div className="select-container">
          <select
            value={cardCount} 
            onChange={(e) => setCardCount(e.target.value)} 
          >
            <option hidden>Deck size</option>
            {Object.keys(layoutMap).map((num, i) => <option value={num} key={i}>{num}</option>)}
          </select>
          <ArrowDown />
        </div>
        {[...Array(playerCount)].map((player, i) => {
          return (
            <input type="text" value={playerNames[i]} onChange={handleNameChange(i)} placeholder="Player name"/>
          )
        })}
        <button className="plus-button" onClick={() => setPlayerCount(playerCount + 1)}><Plus /></button>
        {/* <input type="text" placeholder="Player two name"/> */}
        <button className="play-button">Play!</button>
      </div>
    </div>
  )
}