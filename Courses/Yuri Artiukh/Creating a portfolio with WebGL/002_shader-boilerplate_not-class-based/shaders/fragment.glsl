varying vec2 vUv;
uniform float uTime;

void main() {
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

  color.r = 0.8;
  color.g = 0.5;
  color.b = 1.0;

  gl_FragColor = vec4(vUv, 1.0, 1.0);
}