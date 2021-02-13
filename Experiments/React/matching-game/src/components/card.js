import React from 'react';

export default function Card({
  card: {
    id, 
    isRevealed, 
    isMatched, 
    pokemonImg, 
    pokemonName
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
      <div className="side side__front"><img src={pokemonImg} alt={pokemonName} /></div>
      <div className="side side__back"></div>
    </div>
  )
}