// Seeded random number generator
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }

  random() {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
}

let rng = Math; // Default to Math.random

// Terrain type constants for readability
const TERRAIN = {
  PLAINS: 0,
  FOREST: 1,
  MOUNTAINS: 2,
  RIVER: 3,
  RUINS: 4,
};

// Configuration constants
const CONFIG = {
  PLAINS_PERCENTAGE: 0.4,
  FOREST_PERCENTAGE: 0.35,
  MOUNTAINS_PERCENTAGE: 0.1,
  RIVER_PERCENTAGE: 0.1,
  RUINS_PERCENTAGE: 0.05,
  RUINS_COUNT: { min: 1, max: 3 },
};

function generateMap(width, height, seed = null) {
  // Initialize random number generator with seed
  if (seed === null) {
    seed = Math.floor(Math.random() * 1000000);
  }
  rng = new SeededRandom(seed);

  const totalTiles = width * height;
  const map = createEmptyMap(width, height);

  // Create a priority map (higher = more important/placed first)
  const priority = createEmptyMap(width, height);

  // Calculate exact tile counts for each terrain
  const targetCounts = {
    [TERRAIN.RIVER]: Math.round(totalTiles * CONFIG.RIVER_PERCENTAGE),
    [TERRAIN.MOUNTAINS]: Math.round(totalTiles * CONFIG.MOUNTAINS_PERCENTAGE),
    [TERRAIN.FOREST]: Math.round(totalTiles * CONFIG.FOREST_PERCENTAGE),
    [TERRAIN.RUINS]: randomInt(CONFIG.RUINS_COUNT.min, CONFIG.RUINS_COUNT.max),
  };
  // Plains get the remainder
  targetCounts[TERRAIN.PLAINS] =
    totalTiles - Object.values(targetCounts).reduce((a, b) => a + b, 0);

  // Place rivers first (highest priority) to keep them continuous
  placeRiversWithPriority(
    map,
    priority,
    width,
    height,
    targetCounts[TERRAIN.RIVER]
  );

  // Place mountains in clusters
  placeTerrainClustered(
    map,
    priority,
    width,
    height,
    TERRAIN.MOUNTAINS,
    targetCounts[TERRAIN.MOUNTAINS],
    2,
    3
  );

  // Place forests in clusters
  placeTerrainClustered(
    map,
    priority,
    width,
    height,
    TERRAIN.FOREST,
    targetCounts[TERRAIN.FOREST],
    3,
    5
  );

  // Place ruins on available spots
  placeRuinsOnAvailable(map, width, height, targetCounts[TERRAIN.RUINS]);

  // Everything else becomes plains (already initialized)

  return { map, seed };
}

// ++++++++++ MAP CREATION ++++++++++

function createEmptyMap(width, height) {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(TERRAIN.PLAINS));
}

// ++++++++++ POSITION HELPERS ++++++++++

function randomInt(min, max) {
  return min + Math.floor(rng.random() * (max - min + 1));
}

function randomFloat(min, max) {
  return min + rng.random() * (max - min);
}

// ++++++++++ BLOB PLACEMENT ++++++++++

function isInsideEllipse(x, y, cx, cy, rx, ry, rotation) {
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(
    (dx * Math.cos(rotation) + dy * Math.sin(rotation)) ** 2 / (rx * rx) +
      (dx * -Math.sin(rotation) + dy * Math.cos(rotation)) ** 2 / (ry * ry)
  );
  const threshold = 1 + rng.random() * 0.4; // Fuzzy edges
  return dist < threshold;
}

// ++++++++++ TERRAIN PLACEMENT ++++++++++

function placeRiversWithPriority(map, priority, width, height, targetCount) {
  const riverCount = randomInt(1, 2);
  let tilesPlaced = 0;

  for (let i = 0; i < riverCount && tilesPlaced < targetCount; i++) {
    // Random starting edge
    const startEdge = randomInt(0, 3); // 0=top, 1=right, 2=bottom, 3=left
    let x, y, dx, dy;

    switch (startEdge) {
      case 0: // top
        x = randomInt(0, width - 1);
        y = 0;
        dx = randomFloat(-0.3, 0.3);
        dy = 1;
        break;
      case 1: // right
        x = width - 1;
        y = randomInt(0, height - 1);
        dx = -1;
        dy = randomFloat(-0.3, 0.3);
        break;
      case 2: // bottom
        x = randomInt(0, width - 1);
        y = height - 1;
        dx = randomFloat(-0.3, 0.3);
        dy = -1;
        break;
      case 3: // left
        x = 0;
        y = randomInt(0, height - 1);
        dx = 1;
        dy = randomFloat(-0.3, 0.3);
        break;
    }

    // Snake the river across the map
    const riverPath = [];
    while (
      x >= 0 &&
      x < width &&
      y >= 0 &&
      y < height &&
      tilesPlaced < targetCount
    ) {
      const tileX = Math.floor(x);
      const tileY = Math.floor(y);

      if (tileX >= 0 && tileX < width && tileY >= 0 && tileY < height) {
        if (map[tileY][tileX] === TERRAIN.PLAINS) {
          riverPath.push({ x: tileX, y: tileY });
        }
      }

      // Randomly adjust direction for snaking effect
      dx += randomFloat(-0.4, 0.4);
      dy += randomFloat(-0.4, 0.4);

      // Normalize to keep moving
      const mag = Math.sqrt(dx * dx + dy * dy);
      if (mag > 0) {
        dx = dx / mag;
        dy = dy / mag;
      }

      x += dx;
      y += dy;
    }

    // Place river tiles up to target count
    for (const pos of riverPath) {
      if (tilesPlaced >= targetCount) break;
      map[pos.y][pos.x] = TERRAIN.RIVER;
      priority[pos.y][pos.x] = 1000; // High priority
      tilesPlaced++;
    }
  }
}

function placeTerrainClustered(
  map,
  priority,
  width,
  height,
  terrainType,
  targetCount,
  minClusters,
  maxClusters
) {
  const clusters = randomInt(minClusters, maxClusters);
  let tilesPlaced = 0;

  for (let i = 0; i < clusters; i++) {
    const centerX = randomFloat(0, width - 1);
    const centerY = randomFloat(0, height - 1);
    const radiusX = randomFloat(1.2, 2.8);
    const radiusY = randomFloat(1.2, 2.8);
    const rotation = rng.random() * Math.PI * 2;

    // Collect potential tiles in this cluster
    const clusterTiles = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (
          map[y][x] === TERRAIN.PLAINS &&
          isInsideEllipse(x, y, centerX, centerY, radiusX, radiusY, rotation)
        ) {
          clusterTiles.push({ x, y });
        }
      }
    }

    // Place tiles from this cluster until we hit target
    for (const pos of clusterTiles) {
      if (tilesPlaced >= targetCount) break;
      map[pos.y][pos.x] = terrainType;
      priority[pos.y][pos.x] = 500 - tilesPlaced; // Decreasing priority
      tilesPlaced++;
    }

    if (tilesPlaced >= targetCount) break;
  }

  // If we didn't place enough, randomly fill remaining tiles
  if (tilesPlaced < targetCount) {
    const available = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (map[y][x] === TERRAIN.PLAINS) {
          available.push({ x, y });
        }
      }
    }

    // Shuffle
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(rng.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }

    // Fill remaining
    for (let i = 0; i < available.length && tilesPlaced < targetCount; i++) {
      const pos = available[i];
      map[pos.y][pos.x] = terrainType;
      priority[pos.y][pos.x] = 100;
      tilesPlaced++;
    }
  }
}

function placeRuinsOnAvailable(map, width, height, targetCount) {
  let placed = 0;
  const available = [];

  // Collect all non-river, non-mountain tiles
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] !== TERRAIN.RIVER && map[y][x] !== TERRAIN.MOUNTAINS) {
        available.push({ x, y });
      }
    }
  }

  // Shuffle
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(rng.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  // Place ruins
  for (let i = 0; i < Math.min(targetCount, available.length); i++) {
    const pos = available[i];
    map[pos.y][pos.x] = TERRAIN.RUINS;
    placed++;
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
