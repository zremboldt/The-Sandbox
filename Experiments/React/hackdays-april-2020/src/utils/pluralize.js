export function pluralize(word, count, pluralizedWord) {
  if (!pluralizedWord) {
    pluralizedWord = word + 's';
  }
  return count === 1 ? word : pluralizedWord;
}