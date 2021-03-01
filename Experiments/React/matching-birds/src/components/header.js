import React from 'react';

export default function Header({
  emeraldGameIcon,
  allPlayerData,
  cards,
  currentPlayer,
}) {
  return (
    <header>
      <img className='game-icon' src={emeraldGameIcon} alt="Emerald Game icon" />
      <div className="player-container">
        {allPlayerData.map(({name, score}, playerIndex) => {
          const isActive = playerIndex === currentPlayer ? true : false;

          return (
            <h3 className={`player ${isActive && 'player__active'}`} key={playerIndex}>
              <span>{name}: </span>{score}
            </h3>
          )
        })}
      </div>
    </header>
  )
}