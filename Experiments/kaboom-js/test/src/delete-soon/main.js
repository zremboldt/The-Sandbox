import { k } from '../js/kaboomCtx';

// Initialize Kaboom

// const k = kaboom({
//   width: 960,
//   height: 960,
//   background: [0, 0, 0],
// });

// Destructure functions from Kaboom context

// Define constants
const GRID_SIZE = 32;
const GRID_ROWS = 32;
const GRID_COLS = 32;

async function gameSetup() {
  // Function to create the grid
  function createGrid() {
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLS; x++) {
        add([
          rect(GRID_SIZE, GRID_SIZE),
          pos(x * GRID_SIZE, y * GRID_SIZE),
          color(0.5, 0.5, 0.5),
          opacity(0.2),
          outline(1, rgb(0, 255, 0)),
        ]);
      }
    }
  }

  // Create the grid
  createGrid();

  // Add player entity
  const player = add([
    rect(GRID_SIZE, GRID_SIZE),
    pos(0, 0),
    color(rgb(255, 0, 0)), // Use rgb for color
    outline(2, rgb(255, 255, 255)), // Add a white outline for visibility
    'player',
  ]);

  // Debugging function to log the player position
  function logPlayerPosition(player) {
    console.log(`Player position: (${player.pos.x}, ${player.pos.y})`);
  }

  // Snap player to the grid
  function snapToGrid(entity) {
    entity.pos.x = Math.round(entity.pos.x / GRID_SIZE) * GRID_SIZE;
    entity.pos.y = Math.round(entity.pos.y / GRID_SIZE) * GRID_SIZE;
  }

  // Log player position after creation and snap to grid
  snapToGrid(player);
  logPlayerPosition(player);

  // Player movement
  onKeyPress('left', () => {
    player.pos.x -= GRID_SIZE;
    snapToGrid(player);
    logPlayerPosition(player);
  });

  onKeyPress('right', () => {
    player.pos.x += GRID_SIZE;
    snapToGrid(player);
    logPlayerPosition(player);
  });

  onKeyPress('up', () => {
    player.pos.y -= GRID_SIZE;
    snapToGrid(player);
    logPlayerPosition(player);
  });

  onKeyPress('down', () => {
    player.pos.y += GRID_SIZE;
    snapToGrid(player);
    logPlayerPosition(player);
  });
}

gameSetup();
