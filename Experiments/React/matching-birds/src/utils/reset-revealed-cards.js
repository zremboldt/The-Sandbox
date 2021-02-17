export default function resetRevealedCards(cards, setCards) {
  const newCards = cards.map((newCard) => {
    return {...newCard, isRevealed: false};
  })
  setCards(newCards)
}