const dogs = ["Beasley", "Moose", "Shnookums", "Gidget", "Bowser", "Bravo Pup", "Chance"];

// =============
// for loop
// =============
// Downsides: Syntax is not as friendly as some of the other iterables.
for (let i = 0; i < dogs.length; i++) {
  // continue will skip over Moose.
  // break will abort the loop.
  if (dogs[i] === "Moose") continue;
  if (dogs[i] === "Bowser") break;
  console.log(`1. ${dogs[i]}`);
}

// =============
// forEach
// =============
// Downsides: You cannot abort the loop or skip an item.
// No access to break or continue.
dogs.forEach(dog => console.log(`2. ${dog}`));

// =============
// forIn
// =============
// Downsides: You may get lots of unexpected values
// if the array prototype has been tampered with.
for (const i in dogs) console.log(`3. ${i}`);
for (const i in dogs) console.log(`4. ${dogs[i]}`);

// =============
// forOf
// =============
// This is often the best option. Works in most cases except on objects.
for (const dog of dogs) console.log(`5. ${dog}`);
// break and continue do work with forOf
for (const dog of dogs) {
  if (dog === "Moose") continue;
  if (dog === "Bowser") break;
  console.log(`6. ${dog}`);
}
