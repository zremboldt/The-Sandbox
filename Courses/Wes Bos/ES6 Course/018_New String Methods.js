// ES6 comes with 4 new string methods

const course = 'RFB2';
const flightNumber = '20-AC2018-jz';
const missions = [
  'Mercury Atlas 6',
  'Mercury Redstone 3',
  'Mercury Redstone 4',
  'Gemini 8',
  'Gemini 12',
  'Apollo 11',
  'Apollo 13'
];
const accountNumber = '847563298RT0001';
const vehicle = {
  make: 'Mercedes',
  model: 'G5',
  color: 'Jet Black'
};

//

// .startsWith()
console.log(course.startsWith('RFB'));
console.log(flightNumber.startsWith('AC', 3)); // Start checking on the 3rd index
// Using .startsWith() to filter
const startsWithMercury = missions.filter(mission => mission.startsWith('Mercury'));
console.log(startsWithMercury);

//

// .endsWith()
console.log(flightNumber.endsWith('jz'));
console.log(accountNumber.endsWith('RT', 11)); // only check the first 11 numbers
// Using .endsWith() to filter
const endsWith13 = missions.filter(mission => mission.endsWith('13'));
console.log('List includes: ', ...endsWith13);

//

// .includes()
console.log(flightNumber.includes('AC'));

//

// .repeat()
console.log('🐠 '.repeat(5));

function leftPad(str, length = 20) {
  return `→ ${'.'.repeat(length - str.length)} ${str}`;
}

console.log(leftPad(vehicle.make));
console.log(leftPad(vehicle.model));
console.log(leftPad(vehicle.color));

console.log(`${'🦇' * 5}`.repeat(10) + ' Batman!');

missions.forEach(mission => console.log(leftPad(mission, 40)));
