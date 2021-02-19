import shuffle from './shuffle';
import birdData from '../assets/bird-data';

const randomNumber = (max) => Math.ceil(Math.random() * max);

export default function createCards(cardCount, setCards) {
  const matchCount = cardCount / 2;

  const uniqueNumbers = [];
  while(uniqueNumbers.length < matchCount) {
    const num = randomNumber(birdData.length);
    if (!uniqueNumbers.includes(num)) {
      uniqueNumbers.push(num);
    }
  }

  const selectBirds = uniqueNumbers.reduce((selectedBirds, num) => [...selectedBirds, birdData[num]], []);

  console.log(selectBirds)
  const birdPairs = [
    ...selectBirds,
    ...selectBirds
  ]
  
  const birdObjects = birdPairs.map((bird, i) => ({
    birdImg: bird.image,
    birdId: bird.id,
    birdName: bird.name,
    id: i,
    isRevealed: false,
    isMatched: false,
    matchedBy: null,
  }))

  const shuffledCards = shuffle(birdObjects);

  setCards(shuffledCards);
}