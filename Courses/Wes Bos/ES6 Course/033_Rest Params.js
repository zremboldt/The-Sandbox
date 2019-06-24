// Rest is great for when you have an unknown number of parameters.

function convertCurrency(rate, tax, tip, ...amounts) {
  console.log(rate, tax, tip, amounts);
  console.log(amounts.map(amount => (amount * rate).toFixed(2)));
}

convertCurrency(1.54, 0.08, 0.15, 10, 15, 20, 25, 30);
convertCurrency(1.54, 0.08, 0.15, 10);

// ----------------------------

const runner = ['Zac Remboldt', 125, 5.5, 4, 8, 5, 6.5, 7];
const [name, id, ...distances] = runner;

console.log(`
Runner name: ${name}
Runner id: ${id}
Daily miles: ${distances}`);
