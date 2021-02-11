import React, { useState, useEffect } from 'react';

const randomNum = (max) => Math.ceil(Math.random() * max);
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export default function App() {
  const [pokemonData, setpokemonData] = useState();

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
    
      setpokemonData(response);
    }

    fetchPokies(6);
  }, []);

  const handleClick = (id) => {
    console.log(id)
  }

  if (!pokemonData) return <div className='app'>loading...</div>

  const doublePokemon = [
    ...pokemonData,
    ...pokemonData
  ]

  const shuffledPokemon = shuffle(doublePokemon);

  return (
    <main className='app'>
      {shuffledPokemon.map((pokemon, i) => (
        <div 
          className="card" 
          onClick={() => handleClick(pokemon.id)}
          key={i} 
        >
          <img src={pokemon.sprites.front_default} />
        </div>
      ))}
    </main>
  )
};
