import { calcCumulativeTrips } from '../index';

test('Calculate and sort cumulative driver stats (Integration test) ', () => {
  const database = {
    Dan: [
      { tripAvgSpeed: 34.6, miles: '17.3' },
      { tripAvgSpeed: 65.40000000000006, miles: '21.8' }
    ],
    Alex: [{ tripAvgSpeed: 33.6, miles: '42.0' }],
    Bob: []
  };

  const result = [['Alex', 34, 42], ['Dan', 50, 39], ['Bob', 0, 0]];
  expect(calcCumulativeTrips(database)).toEqual(result);
});
