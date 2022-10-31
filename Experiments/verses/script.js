const root = document.getElementById('root');

const verse = `On the last day of the feast, the great day, Jesus stood up and cried out, “If anyone thirsts, let him come to me and drink. Whoever believes in me, as the Scripture has said, ‘Out of his heart will flow rivers of living water.’” Now this he said about the Spirit, whom those who believed in him were to receive, for as yet the Spirit had not been given, because Jesus was not yet glorified.`

const hideWords = (verse, density = 3) => {
  const words = verse.split(' ');

  const wordsWithClasses = words.map((word, i) => {
    if (i > 0 && i % density === 0) {
      return `<span class="word space">${word}</span>`;
    };
    return `<span class="word">${word}</span>`;
  })

  return wordsWithClasses
}

const markup = `<div class="verse">${hideWords(verse).join(' ')}</div>`


root.insertAdjacentHTML('afterbegin', markup)


const words = document.querySelectorAll('.word');

words.forEach((word) => {
  word.addEventListener('click', (word) => {
    word.target.classList.remove('space');
  });
});