const inventors = ['Leonardo DaVinci', 'Alexander Graham Bell', 'Nikola Teslaa'];
const currentInventors = ['Elon Musk', 'Steve Jobs'];

// You can spread items into a function, using each item as an arguement.
inventors.push(...currentInventors);
console.log(inventors);

// --------------

const name = ['Zac', 'Remboldt'];

function sayHi(first, last) {
  console.log(`Hey there ${first} ${last}!`);
}

// You can spread items into a function, using each item as an arguement.
sayHi(...name);
