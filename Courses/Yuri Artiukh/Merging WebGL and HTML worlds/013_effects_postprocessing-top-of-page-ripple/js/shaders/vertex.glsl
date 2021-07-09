
uniform float time;
uniform vec2 hover;
uniform float uHoverState;
varying float vNoise;
varying vec2 vUv;

void main() {
  vec3 newPos = position;

  // Using the perlin noise
  // float activeNoise = cnoise(
  //   3.*vec3(position.x, position.y, position.z + time*0.05)
  // );

  // newPos += normal*activeNoise*0.1;

  // float staticNoise = cnoise(10.*vec3(position.x, position.y, position.z));

  float dist = distance(uv, hover);

  newPos.z += uHoverState*10. * sin(dist * 10. - time);

  vNoise = uHoverState * sin(dist * 10. - time);
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
}
