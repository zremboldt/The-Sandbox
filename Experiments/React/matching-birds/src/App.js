import React, { useState, useEffect } from 'react';
import Card from './components/card';
import emeraldGameIcon from './assets/emerald-game-icon.png';
import fetchBirdies from './utils/fetch-birdies';
import resetRevealedCards from './utils/reset-revealed-cards';
import launchConfetti from './utils/launch-confetti'

const NUM_OF_MATCHES = 6;
const PLAYER_NAMES = [
  'Benaiah',
  // 'Connor',
  'Daddy',
];

export default function App() {
  const [cards, setCards] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  
  useEffect(() => fetchBirdies(NUM_OF_MATCHES, setCards), []);
  
  if (!cards) return <div className='app'><p>loading...</p></div>

  const flippedCards = cards.filter(card => card.isRevealed);

  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;
    const isMatch = firstCard.birdId === secondCard.birdId ? true : false;

    if (isMatch) {
      const newCards = cards.map(newCard => {
        if (newCard.id === firstCard.id || newCard.id === secondCard.id) {
          return { 
            ...newCard, 
            isRevealed: false, 
            isMatched: true,
            matchedBy: currentPlayer,
          }
        }
        return newCard;
      });
      
      setTimeout(() => {
        setCards(newCards);
      }, 1000);
    } else {
      setTimeout(() => {
        resetRevealedCards(cards, setCards);
        if (currentPlayer === PLAYER_NAMES.length - 1) {
          setCurrentPlayer(0);
        } else {
          setCurrentPlayer(currentPlayer + 1);
        }
      }, 1500)
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

  const handleClick = (id, isRevealed) => {
    if (flippedCards.length === 2) return;
    if (!isRevealed) { revealCard(id) };
  }

  const cardsRemaining = cards.filter(({isMatched}) => !isMatched).length;
  if (!cardsRemaining) { launchConfetti() }

  return (
    <>
      <header>
        <img className='game-icon' src={emeraldGameIcon} alt="Emerald Game icon"/>
        <div className="player-container">
          {PLAYER_NAMES.map((name, playerIndex) => {
            const playerScore = cards.filter(({matchedBy}) => matchedBy === playerIndex).length / 2;
            const isActive = playerIndex === currentPlayer ? true : false;
            
            return (
              <h3 className={`player ${isActive && 'player__active'}`} key={playerIndex}>
                <span>{name}: </span>{playerScore}
              </h3>
            )
          })}
        </div>
      </header>
      <main>
        {cards.map(card => (
          <Card
            card={card} 
            handleClick={handleClick} 
            key={card.id} 
          />
        ))}
      </main>
    </>
  )
};
