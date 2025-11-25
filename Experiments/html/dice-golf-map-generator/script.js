function generateMap(width, height) {
  // Terrain types: 0 = rough, 1 = fairway, 2 = sand, 3 = water, 4 = tree, 5 = ball, 6 = hole
  const map = Array(height)
    .fill()
    .map(() => Array(width).fill(0)); // Start with all rough

  // Helper function to create ellipse blob
  function createBlob(cx, cy, rx, ry, value, fuzzy = true) {
    const rotation = Math.random() * Math.PI * 2;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(
          (dx * Math.cos(rotation) + dy * Math.sin(rotation)) ** 2 / (rx * rx) +
            (dx * -Math.sin(rotation) + dy * Math.cos(rotation)) ** 2 /
              (ry * ry)
        );
        const threshold = fuzzy ? 1 + Math.random() * 0.4 : 1;
        if (dist < threshold) {
          map[y][x] = value;
        }
      }
    }
  }

  // Step 1: Ensure fairway in bottom third (starting area)
  const bottomThirdStart = Math.floor((height * 2) / 3);
  const startX = Math.floor(width / 2 + (Math.random() - 0.5) * width * 0.3);
  const startY =
    bottomThirdStart +
    Math.floor(Math.random() * (height - bottomThirdStart - 2)) +
    1;
  createBlob(
    startX,
    startY,
    2 + Math.random() * 1.5,
    2 + Math.random() * 1.5,
    1
  );

  // Mark ball position
  map[startY][startX] = 5;

  // Step 2: Ensure fairway in top third (hole area)
  const topThirdEnd = Math.floor(height / 3);
  const holeX = Math.floor(width / 2 + (Math.random() - 0.5) * width * 0.3);
  const holeY = Math.floor(Math.random() * (topThirdEnd - 2)) + 1;
  createBlob(holeX, holeY, 2 + Math.random() * 1.5, 2 + Math.random() * 1.5, 1);

  // Mark hole position
  map[holeY][holeX] = 6;

  // Step 3: Create a few more fairway areas (connecting paths)
  const fairwayBlobCount = 2 + Math.floor(Math.random() * 2); // 2-3 additional blobs
  for (let i = 0; i < fairwayBlobCount; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const rx = 2 + Math.random() * 2;
    const ry = 2 + Math.random() * 2;
    createBlob(cx, cy, rx, ry, 1);
  }

  // Step 4: Add water body (1-2 bodies)
  const waterCount = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < waterCount; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const rx = 2 + Math.random() * 2.5;
    const ry = 2 + Math.random() * 2.5;
    createBlob(cx, cy, rx, ry, 3);
  }

  // Step 5: Add sand traps (2-4 pockets)
  const sandCount = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < sandCount; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const rx = 1.5 + Math.random() * 1.5;
    const ry = 1.5 + Math.random() * 1.5;
    createBlob(cx, cy, rx, ry, 2);
  }

  // Step 6: Add tree clusters (2-3 areas)
  const treeClusterCount = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < treeClusterCount; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const rx = 1.5 + Math.random() * 1.5;
    const ry = 1.5 + Math.random() * 1.5;
    const rotation = Math.random() * Math.PI * 2;

    // Create blob area with trees
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(
          (dx * Math.cos(rotation) + dy * Math.sin(rotation)) ** 2 / (rx * rx) +
            (dx * -Math.sin(rotation) + dy * Math.cos(rotation)) ** 2 /
              (ry * ry)
        );
        const threshold = 1 + Math.random() * 0.4;
        if (dist < threshold && map[y][x] === 0) {
          map[y][x] = 4; // tree
        }
      }
    }
  }

  // Step 7: Ensure at least 60% is rough
  let totalTiles = width * height;
  let roughCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === 0) roughCount++;
    }
  }

  const roughPercentage = roughCount / totalTiles;

  // If rough is less than 60%, convert some non-rough tiles back to rough
  if (roughPercentage < 0.6) {
    const tilesToConvert = Math.floor((0.6 - roughPercentage) * totalTiles);
    let converted = 0;

    // Prioritize converting sand and tree tiles, avoid ball/hole areas
    for (let y = 0; y < height && converted < tilesToConvert; y++) {
      for (let x = 0; x < width && converted < tilesToConvert; x++) {
        // Skip if near ball or hole
        const nearBall = Math.abs(x - startX) <= 2 && Math.abs(y - startY) <= 2;
        const nearHole = Math.abs(x - holeX) <= 2 && Math.abs(y - holeY) <= 2;

        if (!nearBall && !nearHole && (map[y][x] === 2 || map[y][x] === 4)) {
          if (Math.random() < 0.5) {
            map[y][x] = 0;
            converted++;
          }
        }
      }
    }
  }

  // Step 8: Ensure ball and hole positions are always on fairway
  map[startY][startX] = 1; // Ball must be on fairway
  map[holeY][holeX] = 1; // Hole must be on fairway

  // Ensure at least 3 surrounding tiles are also fairway for both ball and hole
  const ensureFairwaySurrounding = (centerX, centerY) => {
    const neighbors = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue; // Skip center
        const nx = centerX + dx;
        const ny = centerY + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          neighbors.push({ x: nx, y: ny });
        }
      }
    }

    // Count how many are already fairway
    let fairwayCount = neighbors.filter((n) => map[n.y][n.x] === 1).length;

    // If less than 3, convert random neighbors to fairway until we have at least 3
    while (fairwayCount < 3 && neighbors.length > 0) {
      const randomIndex = Math.floor(Math.random() * neighbors.length);
      const neighbor = neighbors[randomIndex];
      if (map[neighbor.y][neighbor.x] !== 1) {
        map[neighbor.y][neighbor.x] = 1;
        fairwayCount++;
      }
      neighbors.splice(randomIndex, 1);
    }
  };

  ensureFairwaySurrounding(startX, startY);
  ensureFairwaySurrounding(holeX, holeY);

  // Step 9: Restore ball and hole positions (they must be on top)
  map[startY][startX] = 5; // Ball
  map[holeY][holeX] = 6; // Hole

  return { map };
}
