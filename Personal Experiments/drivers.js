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

// This is what I want the initial records to look like
records = {
  Dan: [['07:15', '07:45', '17.3'], ['06:12', '06:32', '21.8']],
  Alex: [['12:01', '13:16', '42.0']],
  Bob: []
};
// In the end this'll be the data
records = {
  Dan: {
    milesDriven: 39,
    averageSpeed: 47
  },
  Alex: {
    milesDriven: 42,
    averageSpeed: 34
  },
  Bob: {
    milesDriven: 0,
    averageSpeed: 0
  }
};

function trackDrivingHistory(data) {
  // records will store all of the relevant data
  let records = {};

  for (const line of data) {
    const entries = line.split(' ');
    const [cmd, name, start, stop, miles] = entries; // start stop & miles are undefined when cmd == 'Driver'

    if (cmd === 'Driver') {
      records = { ...records, [name]: [] }; // add driver's name as a key in the records object.
    } else {
      records[name] = [...records[name], ...[{ start, stop, miles }]];
    }
  }
  console.log(records);
}

trackDrivingHistory(input);
