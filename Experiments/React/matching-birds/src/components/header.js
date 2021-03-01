import React from 'react';

export default function Header({
  emeraldGameIcon,
  playerNames,
  cards,
  currentPlayer
}) {
  return (
    <header>
      <img className='game-icon' src={emeraldGameIcon} alt="Emerald Game icon" />
      <div className="player-container">
        {playerNames.map((name, playerIndex) => {
          const playerScore = cards.filter(({ matchedBy }) => matchedBy === playerIndex).length / 2;
          const isActive = playerIndex === currentPlayer ? true : false;

          return (
            <h3 className={`player ${isActive && 'player__active'}`} key={playerIndex}>
              <span>{name}: </span>{playerScore}
            </h3>
          )
        })}
      </div>
    </header>
  )
}