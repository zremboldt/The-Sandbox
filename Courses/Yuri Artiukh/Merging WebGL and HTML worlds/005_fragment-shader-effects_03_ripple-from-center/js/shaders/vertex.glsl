uniform float time;
varying float vNoise;
varying vec2 vUv;

void main() {
  vec3 newPos = position;

  float dist = distance(uv, vec2(0.5));

  newPos.z += 0.2*sin(dist*40. - time);

  vNoise = dist;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}
