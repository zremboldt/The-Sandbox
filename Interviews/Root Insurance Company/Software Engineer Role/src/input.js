// Example input
export const input = [
  'Driver Dan',
  'Driver Alex',
  'Driver Bob',
  'Trip Dan 07:15 07:45 17.3', // driver name, start time, stop time, miles driven.
  'Trip Dan 06:12 06:32 21.8',
  'Trip Alex 12:01 13:16 42.0'
];

// Expected output
// Alex: 42 miles @ 34 mph
// Dan: 39 miles @ 47 mph   // NOTE: Based on the input, 47mph is incorrect. It should be 50mph.
// Bob: 0 miles
