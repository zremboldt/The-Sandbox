// ES6 comes with 4 new string methods

const course = 'RFB2';
const flightNumber = '20-AC2018-jz';
const accountNumber = '847563298RT0001';

const make = 'Mercedes';
const model = 'G5';
const color = 'Jet Black';

//

// .startsWith()
console.log(course.startsWith('RFB'));
console.log(flightNumber.startsWith('AC', 3)); // Start checking on the 3rd index

//

// .endsWith()
console.log(flightNumber.endsWith('jz'));
console.log(accountNumber.endsWith('RT', 11)); // only check the first 11 numbers

//

// .includes()
console.log(flightNumber.includes('AC'));

//

// .repeat()
console.log('🐠 '.repeat(5));

function leftPad(str, length = 20) {
  return `→ ${' '.repeat(length - str.length)}${str}`;
}

console.log(leftPad(make));
console.log(leftPad(model));
console.log(leftPad(color));

console.log(`${'🦇' * 5}`.repeat(10) + ' Batman!');
