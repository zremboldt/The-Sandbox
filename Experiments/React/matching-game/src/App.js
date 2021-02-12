import React, { useState, useEffect } from 'react';
import shuffle from './utils/shuffle';

const NUM_OF_MATCHES = 5;


// Favs
// 6, 59, 121, 1, 146, 112, 130, 25, 133, 78, 31, 77, 145, 149
const randomNum = (max) => Math.ceil(Math.random() * max);

export default function App() {
  const [cards, setCards] = useState();

  useEffect(() => {
    async function fetchPokies(count) {
      const uniqueNumbers = [];
      while(uniqueNumbers.length < count) {
        const num = randomNum(150);
        if (!uniqueNumbers.includes(num)) {
          uniqueNumbers.push(num);
        }
      }
      
      const urls = [];
      for (let i = 0; i < uniqueNumbers.length; i++) {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${uniqueNumbers[i]}`);
      }
    
      const response = await Promise.all(
        urls.map(url => fetch(url)
          .then(res => res.json())
          .then(json => json)
        )
      );

      
      const pokePairs = [
        ...response,
        ...response
      ]

      const pokeObjects = pokePairs.map((pokemon, i) => ({
        pokemonImg: pokemon.sprites.front_default,
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,
        cardId: i,
        isFlipped: false,
      }))
    
      const shuffledCards = shuffle(pokeObjects);
    
      setCards(shuffledCards);
    }

    fetchPokies(NUM_OF_MATCHES);
  }, []);

  if (!cards) return <div className='app'>loading...</div>

  const flippedCards = cards.filter(card => card.isFlipped);

  if (flippedCards.length >= 2) {
    setTimeout(() => {
      const newCards = cards.map((newCard) => {
        return {...newCard, isFlipped: false};
      })
      setCards(newCards)
    }, 1500)
  }

  const handleClick = ({cardId, isFlipped}) => {
    if (flippedCards.length >= 2) return;
    if (!isFlipped) {
      const newCards = cards.map((newCard) => {
        if (newCard.cardId === cardId) return {...newCard, isFlipped: true};
        return newCard;
      })
      setCards(newCards)
    }
  }


  return (
    <main className='app'>
      {cards.map(card => (
        <div 
          className={`card ${card.isFlipped ? 'card__flipped' : ''}`}
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
