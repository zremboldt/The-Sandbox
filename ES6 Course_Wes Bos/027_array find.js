const inventors = [
  { first: "Albert", last: "Einstein", year: 1879 },
  { first: "Isaac", last: "Newton", year: 1643 },
  { first: "Galileo", last: "Galilei", year: 1564 },
  { first: "Marie", last: "Curie", year: 1867 },
  { first: "Johannes", last: "Kepler", year: 1571 },
  { first: "Nicolaus", last: "Copernicus", year: 1473 },
  { first: "Max", last: "Planck", year: 1858 }
];

// .find() is a callback that will return true if found, or false if not found.
const inventor = inventors.find(inventor => inventor.last === "Curie");
console.log(inventor);
console.log("-----------------");

// .find() will find one thing.
// If you wanted to find multiple items and return an array you would use .filter()

// Now lets say you have an item that you want to delete from the object
// but you need to find the index in order to delete it.
const inventorIndex = inventors.findIndex(inventor => inventor.last === "Curie");

inventors.splice(inventorIndex, 1);
console.log(inventors);
