import React, { useState, useEffect } from 'react';
import Card from './components/card';
import fetchPokies from './utils/fetch-pokies';
import resetRevealedCards from './utils/reset-revealed-cards';

const NUM_OF_MATCHES = 4;
const PLAYER_COUNT = 2;
const PLAYER_NAMES = {
  0: 'Benaiah',
  1: 'Daddy',
}
// Favs 6, 59, 121, 1, 146, 112, 130, 25, 133, 78, 31, 77, 145, 149

// Keep track of who's turn it is.
// If !isMatch turn changes.
// Label which player matched within the card object.

export default function App() {
  const [cards, setCards] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  
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
      setTimeout(() => {
        resetRevealedCards(cards, setCards);
        if (currentPlayer === PLAYER_COUNT - 1) {
          setCurrentPlayer(0);
        } else {
          setCurrentPlayer(currentPlayer + 1);
        }
      }, 1000)
    }
  }

  console.log(currentPlayer)

  const revealCard = (clickedCardId) => {
    const newCards = cards.map(newCard => (
      newCard.id === clickedCardId 
        ? {...newCard, isRevealed: true} 
        : newCard
      )
    );
    setCards(newCards)
  }

  const handleClick = (id, isRevealed) => {
    if (flippedCards.length === 2) return;
    if (!isRevealed) { revealCard(id) };
  }

  return (
    <main className='app'>
      <h3>{PLAYER_NAMES[currentPlayer]}</h3>
      {cards.map(card => (
        <Card
          card={card} 
          handleClick={handleClick} 
          key={card.id} 
        />
      ))}
    </main>
  )
};
