// Options
const MOVE_DISTANCE = 20;
const CAP_SHAPE = 'square'; // "butt" || "round" || "square"
let strokeBrightness = 0;
const STROKE_WIDTH = 15; // Also works well to set this to MOVE_DISTANCE

// Select elements
const getStartedText = document.querySelector('.get-started');
const etchASketch = document.querySelector('#etch-a-sketch');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.btn-shake');
const partyButton = document.querySelector('.btn-party');

// Setup canvas for drawing
const { width, height } = canvas;
let x = 0 + MOVE_DISTANCE / 2;
let y = 0 + MOVE_DISTANCE / 2;
ctx.lineCap = CAP_SHAPE;
ctx.lineWidth = STROKE_WIDTH;

// Set initial cursor color and position
let hue = 100;
ctx.strokeStyle = `hsl(${hue}, 100%, ${strokeBrightness}%)`;
ctx.beginPath();
ctx.moveTo(x, y);

// Draw
function draw({ key }) {
  // Update the stroke color with each keypress
  hue += 1;
  ctx.strokeStyle = `hsl(${hue}, 100%, ${strokeBrightness}%)`;
  // Define the current line starting position
  ctx.beginPath();
  ctx.moveTo(x, y);
  // Move cursor to new position based on user input
  if (key === 'ArrowRight') {
    if (x + MOVE_DISTANCE < width) x += MOVE_DISTANCE;
  }
  if (key === 'ArrowLeft') {
    if (x - MOVE_DISTANCE > 0) x -= MOVE_DISTANCE;
  }
  if (key === 'ArrowDown') {
    if (y + MOVE_DISTANCE < height) y += MOVE_DISTANCE;
  }
  if (key === 'ArrowUp') {
    if (y - MOVE_DISTANCE > 0) y -= MOVE_DISTANCE;
  }
  ctx.lineTo(x, y);
  ctx.stroke();

  // Draw a dot at the cursor resting position 
  // so user can see where they're at.
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.strokeStyle = `hsla(0, 0%, 100%, 0.3)`;
  ctx.stroke();
}

let isDrawing = false;

// Keypress events
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
    if (!isDrawing) {
      getStartedText.classList.remove('active');
      isDrawing = true;
    }
  }
}

window.addEventListener('keydown', handleKey);

// Clear canvas
function clearCanvas() {
  etchASketch.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  etchASketch.addEventListener('animationend', () => etchASketch.classList.remove('shake'), { once: true });
}

shakeButton.addEventListener('click', clearCanvas);

// Toggle Party Mode!
function togglePartyMode() {
  if (strokeBrightness === 0) {
    strokeBrightness = 50;
  } else {
    strokeBrightness = 0
  }
}

partyButton.addEventListener('click', togglePartyMode);