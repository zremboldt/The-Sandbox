function generateMap(width, height) {
  const map = Array(height)
    .fill()
    .map(() => Array(width).fill(0)); // 0 = water

  // Step 1: Create several large random "land blobs"
  const blobCount = 2 + Math.floor(Math.random() * 3); // 2–4 blobs
  for (let b = 0; b < blobCount; b++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const rx = 3 + Math.random() * 4; // radius X (smaller, relative to map size)
    const ry = 3 + Math.random() * 4; // radius Y
    const rotation = Math.random() * Math.PI * 2;

    // Draw rotated ellipse blob
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Rotate point around center
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(
          (dx * Math.cos(rotation) + dy * Math.sin(rotation)) ** 2 / (rx * rx) +
            (dx * -Math.sin(rotation) + dy * Math.cos(rotation)) ** 2 /
              (ry * ry)
        );
        if (dist < 1 + Math.random() * 0.4) {
          // fuzzy edge
          map[y][x] = 1; // grass
        }
      }
    }
  }

  // Step 2: Clean up tiny isolated water pockets and tiny islands
  // (simple flood fill or just skip if you like noisy maps)

  // Step 3: Place trees only on grass, preferring near water edges
  const trees = [];
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (map[y][x] === 1) {
        // Count water neighbors
        let waterNearby = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (map[y + dy][x + dx] === 0) waterNearby++;
          }
        }

        // Higher chance near water, lower in open fields
        const treeChance = waterNearby > 0 ? 0.09 : 0.012;
        if (Math.random() < treeChance) {
          trees.push({ x, y });
          // Optional: clear 3x3 area around tree so they don't clump too hard
        }
      }
    }
  }

  // Step 4: Add a few decorative objects (rocks, flowers, signs)
  const decorations = [];
  for (let i = 0; i < 20 + Math.random() * 30; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (map[y][x] === 1) {
      decorations.push({
        x,
        y,
        type: ["rock", "bush", "flower", "sign"][Math.floor(Math.random() * 4)],
      });
    }
  }

  return { map, trees, decorations };
}
