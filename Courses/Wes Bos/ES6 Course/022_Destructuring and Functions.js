function convertCurrency(amount) {
  const converted = {
    USD: amount * 0.76,
    GBP: amount * 0.53,
    AUD: amount * 1.01,
    MEX: amount * 13.3
  };
  return converted;
}

// Destructuring the return value into multiple values.
const { USD, GBP, AUD, MEX } = convertCurrency(100);
console.log(USD, AUD);

//

//

function tipCalc({ total, tip = 0.15, tax = 0.08 }) {
  return total + total * tip + total * tax;
}

// The order in which I give the values doesn't matter because
// I'm using object destructuring.
console.log(tipCalc({ tax: 0.13, total: 100 }));
