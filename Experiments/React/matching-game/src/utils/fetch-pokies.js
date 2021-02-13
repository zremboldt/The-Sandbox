import shuffle from './shuffle';

const randomNum = (max) => Math.ceil(Math.random() * max);

export default async function fetchPokies(count, setCards) {
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
    id: i,
    isRevealed: false,
    isMatched: false,
    matchedBy: null,
  }))

  const shuffledCards = shuffle(pokeObjects);

  setCards(shuffledCards);
}