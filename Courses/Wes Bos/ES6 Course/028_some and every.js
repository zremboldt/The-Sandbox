const ages = [32, 15, 19, 12];
const kiddos = [2, 3, 5, 1];
const elders = [40, 51, 65, 72];

// Is there at least one adult in the group?
console.log(ages.some(age => age >= 18));
console.log(kiddos.some(age => age >= 18));

// is everyone over the legal drinking age?
console.log(ages.every(age => age >= 21));
console.log(elders.every(age => age >= 21));
