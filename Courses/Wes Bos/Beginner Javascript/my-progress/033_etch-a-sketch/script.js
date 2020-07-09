// Options
const MOVE_DISTANCE = 50;
const STROKE_BRIGHTNESS = 50;
const STROKE_WIDTH = 40; // Also works well to set this to MOVE_DISTANCE

// Select elements
const etchASketch = document.querySelector('#etch-a-sketch');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.btn-shake');

// Setup canvas for drawing
const { width, height } = canvas;
let x = 0 + MOVE_DISTANCE / 2;
let y = 0 + MOVE_DISTANCE / 2;
ctx.lineCap = 'round'; // "butt" || "round" || "square"
ctx.lineWidth = STROKE_WIDTH;

// Begin drawing
let hue = 100;
ctx.strokeStyle = `hsl(${hue}, 100%, ${STROKE_BRIGHTNESS}%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Draw
function draw({ key }) {
  // Update the stroke color with each keypress
  hue += 1;
  ctx.strokeStyle = `hsl(${hue}, 100%, ${STROKE_BRIGHTNESS}%)`;
  // Define the pen starting position
  ctx.beginPath();
  ctx.moveTo(x, y);
  // Move pen to new position based on user input
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
  console.log(hue)
}

// Keypress events
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
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