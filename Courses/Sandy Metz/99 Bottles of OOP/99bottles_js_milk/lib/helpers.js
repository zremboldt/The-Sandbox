const capitalize =
  string => string.charAt(0).toUpperCase() + string.slice(1);

const downTo = (max, min) => {
  const numbers = [];
  for (let n = max; n >= min; n--) {
    numbers.push(n);
  }
  return numbers;
};

const pluralize = (word, count, pluralizedWord) => {
  if (!pluralizedWord) { pluralizedWord = word + 's'; }
  return count === 1 ? word : pluralizedWord;
};

export { capitalize, downTo, pluralize };
