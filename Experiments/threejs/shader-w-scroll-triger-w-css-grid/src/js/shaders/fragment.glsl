varying vec2 vUv;

void main() {
  // COORDINATE LAYOUT
  vec2 uv = vUv * 2.0 - 1.0;
  
  vec2 gradient = abs(uv);
  float squareGradient = max(gradient.x, gradient.y);
  float square = step(0.5, squareGradient);

  // COLORS
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

  color.r = 1.0 - square;
  color.g = 0.0;
  color.b = 0.0;

  // OUTPUT
  gl_FragColor = color;
}
