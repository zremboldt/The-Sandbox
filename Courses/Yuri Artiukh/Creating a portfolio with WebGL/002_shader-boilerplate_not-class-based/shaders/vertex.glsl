uniform float uTime;
varying vec2 vUv;
varying float pulse;

void main() {
  vUv = uv;
  vec3 pos = position;

  pos.z = 0.5 + (0.3 * sin(pos.x * 12.0 + uTime));
  pulse = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}