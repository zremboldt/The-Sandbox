import shuffle from './shuffle';

const randomNum = (max) => Math.ceil(Math.random() * max);

export default async function fetchBirdies(count, setCards) {
  const uniqueNumbers = [];
  while(uniqueNumbers.length < count) {
    const num = randomNum(180);
    if (!uniqueNumbers.includes(num)) {
      uniqueNumbers.push(num);
    }
  }
  
  const urls = [];
  for (let i = 0; i < uniqueNumbers.length; i++) {
    urls.push(`https://api-199-birds.herokuapp.com/birds/${uniqueNumbers[i]}`);
  }

  const response = await Promise.all(
    urls.map(url => fetch(url)
      .then(res => res.json())
      .then(json => json)
    )
  );

  
  const birdPairs = [
    ...response,
    ...response
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