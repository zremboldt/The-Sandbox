import React, { useState } from 'react';
import Plus from '../assets/icon-plus';
import ArrowDown from '../assets/icon-arrow-down';

export default function SetupModal({
  cardCount,
  setCardCount,
  allPlayerData,
  setAllPlayerData,
  setSetupModalIsVisible,
  gridWidthMap,
  emeraldGameIcon
}) {
  const [playerCount, setPlayerCount] = useState(1);

  const handleNameChange = (event, index) => {
    const currentPlayers = [...allPlayerData]

    if (!allPlayerData[index]) { currentPlayers.push({ name: '', score: 0}) }

    currentPlayers[index].name = event.target.value;
    setAllPlayerData(currentPlayers);
  }
  
  const handlePlayButtonClick = () => {
    if (!cardCount || !allPlayerData.length) return;
    setSetupModalIsVisible(false);
  }

  return (
    <div className='modal-bg'>
      <div className='setup-modal-container'>
        <div className="title-container">
          <img className='game-icon' src={emeraldGameIcon} alt="Emerald Game icon"/>
          <h1 className='title'>THE EMERALD GAME</h1>
        </div>
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
              key={i}
              type="text"
              value={allPlayerData[i]?.name}
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
          <button className="button button__primary" onClick={() => handlePlayButtonClick()}>Play!</button>
        </div>
      </div>
    </div>
  )
}