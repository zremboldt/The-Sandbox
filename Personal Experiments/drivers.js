// Example input
const input = [
  'Driver Dan',
  'Driver Alex',
  'Driver Bob',
  'Trip Dan 07:15 07:45 17.3', // driver name, start time, stop time, miles driven.
  'Trip Dan 06:12 06:32 21.8',
  'Trip Alex 12:01 13:16 42.0'
];

// Expected output
// Alex: 42 miles @ 34 mph
// Dan: 39 miles @ 47 mph
// Bob: 0 miles

const convertToHours = time => {
  const [hours, minutes] = time.split(':');
  return minutes / 60 + parseInt(hours); // parseInt hours otherwise the `+` will concatenate.
};

const trackDrivingHistory = data => {
  // records will store all of the relevant data
  let records = {};

  for (const line of data) {
    const entries = line.split(' ');
    const [cmd, name, start, stop, miles] = entries; // start stop & miles are undefined when cmd == 'Driver'

    if (cmd === 'Driver') {
      records = { ...records, [name]: [] }; // add driver's name as a key in the records object.
    } else {
      const driveTime = convertToHours(stop) - convertToHours(start); // calculate how long the drive lasted.
      const avgSpeed = miles / driveTime; // calculate and round average speed.
      if (avgSpeed < 5 || avgSpeed > 100) continue; // Discard any trips that average a speed of less than 5 mph or greater than 100 mph.
      records[name] = [...records[name], ...[{ avgSpeed, miles }]];
    }
  }
  // Generate a report containing each driver with total miles driven and average speed.
  // Sort the output by most miles driven to least.
  // Round miles and miles per hour to the nearest integer.

  for (const driver of Object.entries(records)) {
    console.log(driver[1]);
  }

  // console.log(records);
};

trackDrivingHistory(input);

// {
//   Dan: [[34.6, '17.3'], [65.4, '21.8']],
//   Alex: [[33.6, '42.0']],
//   Bob: []
// };
