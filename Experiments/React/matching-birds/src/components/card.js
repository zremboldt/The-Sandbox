import React from 'react';

export default function Card({
  card: {
    id, 
    isRevealed, 
    isMatched, 
    birdImg, 
    birdName
  },
  handleClick
}) {
  let styles = [];
  if (isRevealed) { styles.push('card__revealed') }
  if (isMatched) { styles.push('card__matched') };
  
  return (
    <div 
      className={`card ${styles}`}
      onClick={() => handleClick(id, isRevealed)}
    >
      <div className="side side__front">
        <img src={birdImg} alt={birdName} />
        <p>{birdName}</p>
      </div>
      <div className="side side__back"></div>
    </div>
  )
}