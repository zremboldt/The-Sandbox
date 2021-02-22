import React, { useState } from 'react';
import Plus from '../assets/icon-plus';
import ArrowDown from '../assets/icon-arrow-down';

export default function SetupModal({
  cardCount,
  setCardCount,
  playerNames,
  setPlayerNames,
  setSetupModalIsVisible,
  gridWidthMap
}) {
  const [playerCount, setPlayerCount] = useState(1);

  const handleNameChange = (event, index) => {
    const currentPlayers = [...playerNames];
    currentPlayers[index] = event.target.value;
    setPlayerNames(currentPlayers);
  }

  const handlePlayButtonClick = () => {
    if (!cardCount || !playerNames.length) return;
    setSetupModalIsVisible(false);
  }

  return (
    <div className='setup-modal-container'>
      <div className='setup-modal'>
        <div className="select-container">
          <select
            value={cardCount} 
            onChange={(e) => setCardCount(e.target.value)} 
          >
            <option hidden>How many cards?</option>
            {Object.keys(gridWidthMap).map((num, i) => (
              <option 
                value={num} 
                key={i}
              >
                {num}
              </option>
            ))}
          </select>
          <ArrowDown />
        </div>
        {[...Array(playerCount)].map((_, i) => (
          <input
            type="text"
            value={playerNames[i]}
            onChange={(event) => handleNameChange(event, i)}
            placeholder="Player name"
          />
        ))}
        <button 
          className="plus-button" 
          onClick={() => setPlayerCount(playerCount + 1)}
        >
          <Plus />
        </button>
        <button className="play-button" onClick={() => handlePlayButtonClick()}>Play!</button>
      </div>
    </div>
  )
}