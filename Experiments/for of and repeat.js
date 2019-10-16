const dogs = [
  'Beasley',
  'Chewie',
  'Moose',
  'Shnookums',
  'Gidget',
  'Bowser',
  'Oreo',
  'Bravo Pup',
  'Chance'
];

for (const [i, dog] of dogs.entries()) {
  console.log(`${i + 1} ${'.'.repeat(18 - dog.length)} ${dog}`);
}
