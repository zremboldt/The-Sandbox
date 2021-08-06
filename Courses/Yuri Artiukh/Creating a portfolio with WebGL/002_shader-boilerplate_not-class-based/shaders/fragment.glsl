varying vec2 vUv;
uniform float uTime;
varying float vPulse;

void main() {
  gl_FragColor = vec4(1.0, vPulse, 0.0, 1.0);
}
