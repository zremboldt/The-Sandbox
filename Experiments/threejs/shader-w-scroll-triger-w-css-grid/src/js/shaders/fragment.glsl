varying vec2 vUv;

void main() {
  // COORDINATE LAYOUT
  vec2 uv = vUv * 2.0 - 1.0;
  // This next line increases the scale of the workspace.
  // Now coordinates run from 0 to 2 instead of 0 to 1.
  uv *= 2.;
  // This next line will shift the workspace around.
  uv += 1.0;

  // `distance` asks, how far is the current pixel `uv`, from the origin point?
  float dist = distance(uv, vec2(0, 0));

  // COLORS
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

  color.r = step(0.5, dist);
  color.g = 0.0;
  color.b = 0.0;

  // OUTPUT
  gl_FragColor = color;
}
