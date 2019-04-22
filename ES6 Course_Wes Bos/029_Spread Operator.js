const dogs = ['Beasley', 'Moose', 'Shnookums', 'Gidget', 'Bowser', 'Chance'];
const cats = ['Sassy', 'Grumpy Cat', 'Hello Kitty', 'Kitkat'];

// Concat arrays
const pets = [...dogs, 'Shadow', ...cats];
console.log(pets);

// Copy an array
const moreCats = [...cats];
moreCats[0] = 'Boots';
console.log(moreCats);
console.log(cats);
