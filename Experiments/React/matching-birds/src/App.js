import React, { useState, useEffect } from 'react';
import Card from './components/card';
import emeraldGameIcon from './assets/emerald-game-icon.png';
import createCards from './utils/create-cards';
import resetRevealedCards from './utils/reset-revealed-cards';
import launchConfetti from './utils/launch-confetti'

const PLAYER_NAMES = [
  'Benaiah',
  // 'Connor',
  'Daddy',
];

// cardCount: [columnCount, rowCount]
const layoutMap = {
  '12': [{columns: 4, rows: 3}],
  '18': [{columns: 6, rows: 3}],
}

export default function App() {
  const [cardCount, setCardCount] = useState();
  const [cards, setCards] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  
  useEffect(() => {
    if (!cardCount) return;
    createCards(cardCount, setCards)
  }, [cardCount]);
  
  if (!cardCount) return (
    <div>
      <select
        value={cardCount} 
        onChange={(e) => setCardCount(e.target.value)} 
      >
        <option hidden>Select number of cards</option>
        {Object.keys(layoutMap).map((num, i) => <option value={num} key={i}>{num}</option>)}
      </select>
    </div>
  );

  if (!cards) return null;

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
