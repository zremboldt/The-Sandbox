const name = 'Puddles';
const height = 22;
const weight = 24;
const color = 'brown';
const breed = 'Mini Poodle';

const dog = {
  firstName: name,
  height,
  weight,
  color,
  breed,
  friends: ['Max', 'Ralph']
};

console.log(dog);

// -----------------------

const modal = {
  // You can now write methods this way
  create() {},
  open() {},
  // As opposed to this way
  close: function() {}
};

// -----------------------

const invertColor = param => "let's pretend this fn inverts the given color";

const key = 'pocketColor';
const value = '#ffc600';

const tShirt = {
  [key]: value,
  [`${key}Opposite`]: invertColor(value)
};

console.log(tShirt);

// -----------------------

// Here we want to pair these keys and values up into a single object.
const keys = ['size', 'color', 'weight'];
const values = ['medium', 'navy', 100];

const shirt = {
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift()
};
console.log(shirt);
