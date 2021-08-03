varying vec2 vUv;
uniform float uTime;
varying float pulse;

void main() {
  gl_FragColor = vec4(vUv.x, 0., pulse, 1.0);
}