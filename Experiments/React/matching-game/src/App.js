import React, { useState, useEffect } from 'react';
import fetchPokies from './utils/fetch-pokies';
import resetRevealedCards from './utils/reset-revealed-cards';

const NUM_OF_MATCHES = 3;
// Favs 6, 59, 121, 1, 146, 112, 130, 25, 133, 78, 31, 77, 145, 149

export default function App() {
  const [cards, setCards] = useState();
  
  useEffect(() => fetchPokies(NUM_OF_MATCHES, setCards), []);
  
  if (!cards) return <div className='app'>loading...</div>

  const flippedCardCount = cards.filter(card => card.isRevealed).length;

  if (flippedCardCount >= 2) { resetRevealedCards(cards, setCards) }

  const revealCard = (clickedCardId) => {
    const newCards = cards.map(newCard => (
      newCard.cardId === clickedCardId 
        ? {...newCard, isRevealed: true} 
        : newCard
      )
    );
    setCards(newCards)
  }

  const handleClick = ({cardId, isRevealed}) => {
    if (flippedCardCount >= 2) return;
    if (!isRevealed) { revealCard(cardId) };
  }

  return (
    <main className='app'>
      {cards.map(card => (
        <div 
          className={`card ${card.isRevealed ? 'card__flipped' : ''}`}
          onClick={() => handleClick(card)}
          key={card.cardId} 
        >
          <div className="side side__front">
            <img src={card.pokemonImg} alt={card.pokemonName} />
          </div>
          <div className="side side__back"></div>
        </div>
      ))}
    </main>
  )
};
