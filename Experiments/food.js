function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

const products = [
  { name: 'Crackers', dateExpired: new Date('9/1/2022') },
  { name: 'Pretzel', dateExpired: new Date('9/1/2022') },
  { name: 'Honey', dateExpired: new Date('3/1/2024') },
  { name: 'Pepper', dateExpired: new Date('4/1/2025') },
  { name: 'Cellentani', dateExpired: new Date('12/1/2024') },
  { name: 'Coffee', dateExpired: new Date('4/1/2023') },
  { name: 'Multi Grain', dateExpired: new Date('4/1/2023') },
  { name: 'Blueberry', dateExpired: new Date('4/1/2023') },
  { name: 'No beans', dateExpired: new Date('2/1/2024') },
  { name: 'Beef pot roast', dateExpired: new Date('1/1/2024') },
  { name: 'Chick peas', dateExpired: new Date('2/1/2024') },
  { name: 'Rings', dateExpired: new Date('1/1/2024') },
  { name: 'Traditional pasta sauce', dateExpired: new Date('8/1/2024') },
  { name: 'Corn', dateExpired: new Date('12/1/2024') },
  { name: 'Mixed Vegetables', dateExpired: new Date('12/1/2024') },
  { name: 'With beans', dateExpired: new Date('4/1/2024') },
  { name: 'Salt', dateExpired: new Date('4/1/2027') },
  { name: 'Elbows', dateExpired: new Date('3/1/2024') },
  { name: 'Shells', dateExpired: new Date('4/1/2024') },
  { name: 'Penne', dateExpired: new Date('3/1/2024') },
  { name: 'Rotini', dateExpired: new Date('3/1/2024') },
  // { name: 'Long grain', dateExpired: new Date('6/1/2023') },
  // { name: 'French', dateExpired: new Date('12/1/2024') },
  // { name: 'Great Value Chili Beans', dateExpired: new Date('5/1/2024') },
  // { name: 'Great Value Mixed Chili Beans', dateExpired: new Date('4/1/2024') },
  // { name: 'Red beans', dateExpired: new Date('3/1/2024') },
  // { name: 'Tuna', dateExpired: new Date('1/1/2025') },
  // { name: 'Great Value Chunk Chicken Breast', dateExpired: new Date('4/1/2025') },
  // { name: 'Applesauce', dateExpired: new Date('1/1/2024') },
  // { name: 'Vegetable beef', dateExpired: new Date('5/1/2024') },
  // { name: 'Beef with vegetable', dateExpired: new Date('1/1/2024') },
  // { name: 'Pear', dateExpired: new Date('9/1/2024') },
  // { name: 'Corn chowder', dateExpired: new Date('4/1/2024') },
  // { name: 'peaches', dateExpired: new Date('9/1/2024') },
  // { name: 'Cut green beans', dateExpired: new Date('12/1/2024') },
  // { name: 'Black beans', dateExpired: new Date('4/1/2024') },
  // { name: 'Pinto beans', dateExpired: new Date('5/1/2024') },
  // { name: 'Ranch', dateExpired: new Date('5/1/2023') },
  // { name: 'Ketchup', dateExpired: new Date('8/1/2023') },
  // { name: 'Sugar', dateExpired: new Date('12/1/2023') },
  // { name: 'cough drops', dateExpired: new Date('4/1/2025') },
  // { name: 'NiteTime', dateExpired: new Date('8/1/2024') },
  // { name: 'Hydrogen', dateExpired: new Date('5/1/2025') },
]

const datePurchased = new Date('4/12/2022');

// Get elements from the DOM at https://www.barcodelookup.com/...
const upc = document.querySelector('.product-details > h1').innerText.replace('UPC ', '');
const productName = document.querySelector('.product-details > h4').innerText.trim();

//

function getMonthsUntilExpiration() {
  const lowerProductName = productName.toLowerCase();
  const product = products.filter((product) => lowerProductName.includes(product.name.toLowerCase()))[0];
  
  console.log(product)

  const dateExpired = product?.dateExpired;

  return dateExpired ? getMonthDifference(datePurchased, dateExpired) : null;
}

const csvEntry = `${upc},${productName},${getMonthsUntilExpiration()}`;

console.log(csvEntry)
copy(csvEntry);
