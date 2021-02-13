export default function resetRevealedCards(cards, setCards) {
  setTimeout(() => {
    const newCards = cards.map((newCard) => {
      return {...newCard, isRevealed: false};
    })
    setCards(newCards)
  }, 1500)
}