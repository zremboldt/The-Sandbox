uniform float uTime;
varying vec2 vUv;
varying float vPulse;

void main() {
  vUv = uv;
  vec3 pos = position;

  pos.z = 0.2 + (0.15 * sin(length(pos) * 50.0 + uTime));
  vPulse = pos.z * 2.;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
