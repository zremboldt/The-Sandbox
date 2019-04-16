// video 007

const names = ["Zac", "Leah", "Connor", "Benaiah"];

const fullNames = names.map(name => `${name} Remboldt`);

console.log(fullNames);

//

//

// video 008

const race = "100 meter dash";
const winners = ["Aaron Miller", "Ron Ediger", "Zac Remboldt"];

const win = winners.map((winner, i) => ({ name: winner, race, place: i + 1 }));

console.log(win);
