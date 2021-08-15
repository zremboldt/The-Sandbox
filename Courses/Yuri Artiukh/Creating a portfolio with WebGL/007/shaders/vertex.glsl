uniform float uTime;
uniform float uProgress;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  vec4 defaultState = modelMatrix * vec4(pos, 1.0);
  vec4 fullScreenState = vec4(pos, 1.0);
  vec4 finalState = mix(defaultState, fullScreenState, uProgress);

  gl_Position = projectionMatrix * viewMatrix * finalState;
}
