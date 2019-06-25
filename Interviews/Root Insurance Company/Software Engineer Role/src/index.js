import { input } from './input';
import { parseDriverData } from './parseDriverData';

// In PART 1 we'll parse and store all of the relevant driver and trip data.
// In PART 2 we'll run some operations on that data.
// In PART 3 we'll return the desired result.

// database will store all of the relevant driver and trip data.
let database = {};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// PART 1:
// 1. Add new drivers to database.
// 2. Calculate driver's average speed for each trip.
// 3. Discard trips that average < 5 mph or > 100 mph.
// 4. Add new trips to associated driver's record in the database.

export const storeDriverData = rawString => {
  // Parse/prep relevant data for storage.
  const [cmd, name, tripAvgSpeed, miles] = parseDriverData(rawString);

  // Store parsed data in database
  if (cmd === 'Driver') database = { ...database, [name]: [] }; // add driver's name as a key in the database object.
  if (cmd === 'Trip') database[name] = [...database[name], ...[{ tripAvgSpeed, miles }]]; // spread the new driver record into the driver that matches that name.
};

// Feed sample data in to be parsed and stored one line at a time.
input.forEach(line => storeDriverData(line));

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// PART 2:
// 1. Calculate each drivers cumulative trip stats.
// 2. Round to the nearest integer.
// 3. Sort list by most miles driven.

export const calcCumulativeTrips = database => {
  let cumulativeStats = [];

  for (const [name, trips] of Object.entries(database)) {
    // if there's more than one trip, calculate cumulative totalMiles and totalAvgSpeed
    if (trips.length > 1) {
      let totalSpeed = 0;
      let totalMiles = 0;

      for (const { tripAvgSpeed, miles } of trips) {
        totalSpeed += tripAvgSpeed;
        totalMiles += parseFloat(miles);
      }

      // Find the driver's average speed.
      let totalAvgSpeed = totalSpeed / trips.length;

      // Round totals to the nearest integer.
      totalAvgSpeed = Math.round(totalAvgSpeed);
      totalMiles = Math.round(totalMiles);

      // Store in cumulativeStats array.
      cumulativeStats = [...cumulativeStats, ...[[name, totalAvgSpeed, totalMiles]]];
    } else if (trips.length === 1) {
      const [{ tripAvgSpeed, miles }] = trips;

      // Round totals to the nearest integer.
      const totalAvgSpeed = Math.round(tripAvgSpeed);
      const totalMiles = Math.round(miles);

      // Store in cumulativeStats array.
      cumulativeStats = [...cumulativeStats, ...[[name, totalAvgSpeed, totalMiles]]];
    } else {
      // Store in cumulativeStats array.
      cumulativeStats = [...cumulativeStats, ...[[name, 0, 0]]];
    }
  }

  // Sort and return list by most miles driven
  return cumulativeStats.sort((a, b) => b[2] - a[2]);
};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// PART 3:
// 1. Display formatted data.

calcCumulativeTrips(database).forEach(driver => {
  const [name, totalAvgSpeed, totalMiles] = driver;
  if (totalMiles > 0) console.log(`${name}: ${totalMiles} miles @ ${totalAvgSpeed} mph`);
  if (totalMiles === 0) console.log(`${name}: ${totalMiles} miles`);
});
