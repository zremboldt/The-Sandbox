// Why did the developer leave his job?
// Because he wanted arrays.

const details = ['Zac', 4503, 'https://www.zacremboldt.com/'];
const [name, id, website] = details;
console.log(website);

//

// Scenario: Someone gives you a string of data that's hard to use.
const data = 'Basketball,Sports,90202,23';
// This is awesome!!!
const [itemName, category, sku, inventory] = data.split(',');
console.log(category, inventory);

//

// Rest Operator
const team = ['Harry', 'Marv', 'Johnny', 'Snakes', 'Kevin', 'Frank'];
const [captain, assistant, ...others] = team;
console.log(captain);
console.log(assistant);
console.log(others);
