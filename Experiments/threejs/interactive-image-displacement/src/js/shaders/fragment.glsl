uniform float time;
uniform float progress;
uniform sampler2D image;
uniform sampler2D terrainMap;
uniform vec3 mouse;

varying vec2 vUv;
varying vec3 vPosition;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  vec2 direction = normalize( vPosition.xy - mouse.xy );
  float dist = distance(vPosition, mouse);
  float prox = 1. - map(dist, 0., 0.3, 0., 1.);
  prox = clamp(prox, 0., 1.);

  vec2 zoomedUV = vUv + direction*prox*progress;
  vec2 zoomedUV1 = mix( vUv, mouse.xy + vec2(0.5), prox*progress );
  vec4 terrainMapColor = texture2D( terrainMap, zoomedUV1 );

  gl_FragColor = terrainMapColor;
}