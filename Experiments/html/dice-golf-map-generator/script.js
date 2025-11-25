// Terrain type constants for readability
const TERRAIN = {
  ROUGH: 0,
  FAIRWAY: 1,
  SAND: 2,
  WATER: 3,
  TREE: 4,
  BALL: 5,
  HOLE: 6,
  ARROW: 7,
};

// Configuration constants
const CONFIG = {
  ROUGH_PERCENTAGE: 0.6,
  FAIRWAY_BLOBS: { min: 2, max: 3 },
  WATER_BODIES: { min: 1, max: 2 },
  SAND_TRAPS: { min: 2, max: 4 },
  TREE_CLUSTERS: { min: 2, max: 3 },
  MIN_FAIRWAY_AROUND_MARKERS: 3,
};

function generateMap(width, height) {
  const map = createEmptyMap(width, height);
  const rotations = createEmptyMap(width, height); // Store rotations for each tile

  // Determine key positions first
  const ballPos = getBottomThirdPosition(width, height);
  const holePos = getTopThirdPosition(width, height);

  // Place hazards first (they can be overwritten by fairways)
  placeWaterBodies(map, width, height);
  placeSandTraps(map, width, height);
  placeTreeClusters(map, width, height);

  // Enforce rough percentage before placing fairways
  enforceRoughPercentage(map, width, height, ballPos, holePos);

  // Place fairways (overwrites hazards)
  placeFairwayAtPosition(map, ballPos, width, height);
  placeFairwayAtPosition(map, holePos, width, height);
  placeConnectingFairways(map, width, height);

  // Ensure markers have proper fairway surroundings
  ensureFairwaySurroundings(map, ballPos, width, height);
  ensureFairwaySurroundings(map, holePos, width, height);

  // Place markers last (they always appear on top)
  map[ballPos.y][ballPos.x] = TERRAIN.BALL;
  map[holePos.y][holePos.x] = TERRAIN.HOLE;

  // Place arrows near the hole
  placeArrowsNearHole(map, holePos, width, height, rotations);

  return { map, rotations };
}

// ++++++++++ MAP CREATION ++++++++++

function createEmptyMap(width, height) {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(TERRAIN.ROUGH));
}

// ++++++++++ POSITION HELPERS ++++++++++

function getBottomThirdPosition(width, height) {
  const bottomThirdStart = Math.floor((height * 2) / 3);
  return {
    x: Math.floor(width / 2 + (Math.random() - 0.5) * width * 0.3),
    y:
      bottomThirdStart +
      Math.floor(Math.random() * (height - bottomThirdStart - 2)) +
      1,
  };
}

function getTopThirdPosition(width, height) {
  const topThirdEnd = Math.floor(height / 3);
  return {
    x: Math.floor(width / 2 + (Math.random() - 0.5) * width * 0.3),
    y: Math.floor(Math.random() * (topThirdEnd - 2)) + 1,
  };
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

// ++++++++++ BLOB PLACEMENT ++++++++++

function placeBlob(map, centerX, centerY, radiusX, radiusY, terrain) {
  const rotation = Math.random() * Math.PI * 2;
  const height = map.length;
  const width = map[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isInsideEllipse(x, y, centerX, centerY, radiusX, radiusY, rotation)) {
        map[y][x] = terrain;
      }
    }
  }
}

function isInsideEllipse(x, y, cx, cy, rx, ry, rotation) {
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(
    (dx * Math.cos(rotation) + dy * Math.sin(rotation)) ** 2 / (rx * rx) +
      (dx * -Math.sin(rotation) + dy * Math.cos(rotation)) ** 2 / (ry * ry)
  );
  const threshold = 1 + Math.random() * 0.4; // Fuzzy edges
  return dist < threshold;
}

// ++++++++++ TERRAIN PLACEMENT ++++++++++

function placeFairwayAtPosition(map, pos, width, height) {
  const radiusX = randomFloat(2, 3.5);
  const radiusY = randomFloat(2, 3.5);
  placeBlob(map, pos.x, pos.y, radiusX, radiusY, TERRAIN.FAIRWAY);
}

function placeConnectingFairways(map, width, height) {
  const count = randomInt(CONFIG.FAIRWAY_BLOBS.min, CONFIG.FAIRWAY_BLOBS.max);
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const radiusX = randomFloat(2, 4);
    const radiusY = randomFloat(2, 4);
    placeBlob(map, x, y, radiusX, radiusY, TERRAIN.FAIRWAY);
  }
}

function placeWaterBodies(map, width, height) {
  const count = randomInt(CONFIG.WATER_BODIES.min, CONFIG.WATER_BODIES.max);
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const radiusX = randomFloat(2, 4.5);
    const radiusY = randomFloat(2, 4.5);
    placeBlob(map, x, y, radiusX, radiusY, TERRAIN.WATER);
  }
}

function placeSandTraps(map, width, height) {
  const count = randomInt(CONFIG.SAND_TRAPS.min, CONFIG.SAND_TRAPS.max);
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const radiusX = randomFloat(1.5, 3);
    const radiusY = randomFloat(1.5, 3);
    placeBlob(map, x, y, radiusX, radiusY, TERRAIN.SAND);
  }
}

function placeTreeClusters(map, width, height) {
  const count = randomInt(CONFIG.TREE_CLUSTERS.min, CONFIG.TREE_CLUSTERS.max);
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const radiusX = randomFloat(1.5, 3);
    const radiusY = randomFloat(1.5, 3);
    placeTreeBlob(map, x, y, radiusX, radiusY);
  }
}

function placeTreeBlob(map, centerX, centerY, radiusX, radiusY) {
  const rotation = Math.random() * Math.PI * 2;
  const height = map.length;
  const width = map[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Only place trees on rough terrain
      if (
        map[y][x] === TERRAIN.ROUGH &&
        isInsideEllipse(x, y, centerX, centerY, radiusX, radiusY, rotation)
      ) {
        map[y][x] = TERRAIN.TREE;
      }
    }
  }
}

// ++++++++++ CONSTRAINTS ++++++++++

function enforceRoughPercentage(map, width, height, ballPos, holePos) {
  const totalTiles = width * height;
  const roughCount = countTerrain(map, TERRAIN.ROUGH);
  const roughPercentage = roughCount / totalTiles;

  if (roughPercentage >= CONFIG.ROUGH_PERCENTAGE) return;

  const tilesToConvert = Math.floor(
    (CONFIG.ROUGH_PERCENTAGE - roughPercentage) * totalTiles
  );
  let converted = 0;

  for (let y = 0; y < height && converted < tilesToConvert; y++) {
    for (let x = 0; x < width && converted < tilesToConvert; x++) {
      const nearMarker =
        isNearPosition(x, y, ballPos, 2) || isNearPosition(x, y, holePos, 2);
      const isConvertible =
        map[y][x] === TERRAIN.SAND || map[y][x] === TERRAIN.TREE;

      if (!nearMarker && isConvertible && Math.random() < 0.5) {
        map[y][x] = TERRAIN.ROUGH;
        converted++;
      }
    }
  }
}

function ensureFairwaySurroundings(map, pos, width, height) {
  const neighbors = getNeighbors(pos, width, height);
  let fairwayCount = neighbors.filter(
    (n) => map[n.y][n.x] === TERRAIN.FAIRWAY
  ).length;

  // Convert random neighbors to fairway until we have enough
  const shuffled = neighbors.sort(() => Math.random() - 0.5);
  for (const neighbor of shuffled) {
    if (fairwayCount >= CONFIG.MIN_FAIRWAY_AROUND_MARKERS) break;
    if (map[neighbor.y][neighbor.x] !== TERRAIN.FAIRWAY) {
      map[neighbor.y][neighbor.x] = TERRAIN.FAIRWAY;
      fairwayCount++;
    }
  }
}

function placeArrowsNearHole(map, holePos, width, height, rotations) {
  const arrowCount = randomInt(2, 5);
  const neighbors = getNeighbors(holePos, width, height);

  // Filter neighbors to only fairway or rough
  const candidates = neighbors.filter(
    (n) => map[n.y][n.x] === TERRAIN.FAIRWAY || map[n.y][n.x] === TERRAIN.ROUGH
  );

  // Randomly select positions for arrows
  const shuffled = candidates.sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(arrowCount, shuffled.length); i++) {
    const pos = shuffled[i];
    map[pos.y][pos.x] = TERRAIN.ARROW;
    // Random rotation at 90° intervals (0, 90, 180, 270)
    rotations[pos.y][pos.x] = randomInt(0, 3) * 90;
  }
}

// ++++++++++ UTILITY FUNCTIONS ++++++++++

function countTerrain(map, terrainType) {
  let count = 0;
  for (const row of map) {
    for (const tile of row) {
      if (tile === terrainType) count++;
    }
  }
  return count;
}

function getNeighbors(pos, width, height) {
  const neighbors = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = pos.x + dx;
      const ny = pos.y + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        neighbors.push({ x: nx, y: ny });
      }
    }
  }
  return neighbors;
}

function isNearPosition(x, y, pos, distance) {
  return Math.abs(x - pos.x) <= distance && Math.abs(y - pos.y) <= distance;
}
