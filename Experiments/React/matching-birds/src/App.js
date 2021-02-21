import React, { useState, useEffect } from 'react';
import Card from './components/card';
import emeraldGameIcon from './assets/emerald-game-icon.png';
import createCards from './utils/create-cards';
import resetRevealedCards from './utils/reset-revealed-cards';
import launchConfetti from './utils/launch-confetti'
import SetupModal from './components/setup-modal'

// const PLAYER_NAMES = [
//   'Benaiah',
//   'Connor',
//   'Daddy',
// ];

// cardCount: [columnCount, rowCount]
const layoutMap = {
  '12': {columns: 4, rows: 3},
  '20': {columns: 5, rows: 4},
}

export default function App() {
  const [cardCount, setCardCount] = useState();
  const [playerNames, setPlayerNames] = useState(['Benaiah', 'Daddy']);
  const [cards, setCards] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  
  useEffect(() => {
    if (cardCount) {
      const rootElement = document.documentElement
      rootElement.style.setProperty('--column-cell-count', layoutMap[cardCount].columns);
      rootElement.style.setProperty('--row-cell-count', layoutMap[cardCount].rows);
    }
  }, [cardCount]);
  
  useEffect(() => {
    if (!cardCount) return;
    createCards(cardCount, setCards)
  }, [cardCount]);
  
  if (!cardCount) return (
    <SetupModal 
      cardCount={cardCount} 
      setCardCount={setCardCount} 
      playerNames={playerNames}
      setPlayerNames={setPlayerNames}
      layoutMap={layoutMap} 
    />
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
        if (currentPlayer === playerNames.length - 1) {
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
      <div className="wrap">
        <header>
          <img className='game-icon' src={emeraldGameIcon} alt="Emerald Game icon"/>
          <div className="player-container">
            {playerNames.map((name, playerIndex) => {
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
    </div>
  )
};
