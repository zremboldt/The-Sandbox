import imgGrass from './assets/tiles-subset/tileGrass1.png';
import imgRoadEast from './assets/tiles-subset/tileGrass_roadEast.png';
import imgRoadNorth from './assets/tiles-subset/tileGrass_roadNorth.png';
import imgRoadCrossingRound from './assets/tiles-subset/tileGrass_roadCrossingRound.png';

export const definition = {
  grass: {
    name: 'grass',
    img: imgGrass,
    neighbors: {
      top: ['grass', 'roadEast'],
      bottom: ['grass', 'roadEast'],
      left: ['grass', 'roadNorth'],
      right: ['grass', 'roadNorth'],
    }
  },
  roadEast: {
    name: 'roadEast',
    img: imgRoadEast,
    neighbors: {
      top: ['roadEast', 'grass'],
      bottom: ['roadEast', 'grass'],
      left: ['roadEast', 'roadCrossingRound'],
      right: ['roadEast', 'roadCrossingRound'],
    }
  },
  roadNorth: {
    name: 'roadNorth',
    img: imgRoadNorth,
    neighbors: {
      top: ['roadNorth', 'roadCrossingRound'],
      bottom: ['roadNorth', 'roadCrossingRound'],
      left: ['roadNorth', 'grass'],
      right: ['roadNorth', 'grass'],
    }
  },
  roadCrossingRound: {
    name: 'roadCrossingRound',
    img: imgRoadCrossingRound,
    neighbors: {
      top: ['roadCrossingRound', 'roadNorth'],
      bottom: ['roadCrossingRound', 'roadNorth'],
      left: ['roadCrossingRound', 'roadEast'],
      right: ['roadCrossingRound', 'roadEast'],
    }
  },
}
