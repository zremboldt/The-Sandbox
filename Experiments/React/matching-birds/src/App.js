import React, { useState, useEffect } from 'react';
import Card from './components/card';
import emeraldGameIcon from './assets/emerald-game-icon.png';
import createCards from './utils/create-cards';
import resetRevealedCards from './utils/reset-revealed-cards';
import launchConfetti from './utils/launch-confetti'
import SetupModal from './components/setup-modal'

const gridWidthMap = {
  '12': 1000,
  '20': 1200,
}

export default function App() {
  const [setupModalIsVisible, setSetupModalIsVisible] = useState(true);
  const [cardCount, setCardCount] = useState(null);
  const [playerNames, setPlayerNames] = useState([]);
  const [cards, setCards] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  
  useEffect(() => {
    if (!cardCount) return;
    createCards(cardCount, setCards)
  }, [cardCount]);

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.style.setProperty('--wrap__max-width', `${gridWidthMap[cardCount]}px`);
  }, [cardCount])
  
  if (setupModalIsVisible) return (
    <SetupModal 
      cardCount={cardCount} 
      setCardCount={setCardCount} 
      playerNames={playerNames}
      setPlayerNames={setPlayerNames}
      setSetupModalIsVisible={setSetupModalIsVisible}
      gridWidthMap={gridWidthMap}
      emeraldGameIcon={emeraldGameIcon}
    />
  );

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
