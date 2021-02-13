import React, { useState, useEffect } from 'react';
import fetchPokies from './utils/fetch-pokies';
import resetRevealedCards from './utils/reset-revealed-cards';

const NUM_OF_MATCHES = 4;
// Favs 6, 59, 121, 1, 146, 112, 130, 25, 133, 78, 31, 77, 145, 149

// Keep track of who's turn it is.
// If !isMatch turn changes.
// Label which player matched within the card object.

export default function App() {
  const [cards, setCards] = useState();
  
  useEffect(() => fetchPokies(NUM_OF_MATCHES, setCards), []);
  
  if (!cards) return <div className='app'><p>loading...</p></div>

  const flippedCards = cards.filter(card => card.isRevealed);

  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;
    const isMatch = firstCard.pokemonId === secondCard.pokemonId ? true : false;

    if (isMatch) {
      const newCards = cards.map(newCard => {
        if (newCard.id === firstCard.id || newCard.id === secondCard.id) {
          return { ...newCard, isRevealed: false, isMatched: true }
        }
        return newCard;
      });
      
      setTimeout(() => {
        setCards(newCards);
      }, 1000);
    } else {
      resetRevealedCards(cards, setCards);
    }
  }

  const revealCard = (clickedCardId) => {
    const newCards = cards.map(newCard => (
      newCard.id === clickedCardId 
        ? {...newCard, isRevealed: true} 
        : newCard
      )
    );
    setCards(newCards)
  }

  const handleClick = ({id, isRevealed}) => {
    if (flippedCards.length === 2) return;
    if (!isRevealed) { revealCard(id) };
  }

  return (
    <main className='app'>
      {cards.map(card => (
        <div 
          className={`card ${card.isRevealed ? 'card__revealed' : ''} ${card.isMatched ? 'card__matched' : ''}`}
          onClick={() => handleClick(card)}
          key={card.id} 
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
