// You can assign default values when creating the fn.

function calculateBill(total, tax = 0.08, tip = 0.15) {
  const calcTax = total * tax;
  const calcTip = total * tip;
  return total + calcTax + calcTip;
}

// So here I only have to give the total.
const totalBill = calculateBill(100);
console.log(totalBill);

// If you want to give an arg for tip but leave tax default just give it undefined.
console.log(calculateBill(100, undefined, 0.25));
