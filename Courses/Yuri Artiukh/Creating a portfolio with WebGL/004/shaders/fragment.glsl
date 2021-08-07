varying vec2 vUv;
varying vec3 vNormal;
uniform float uTime;
uniform sampler2D uTexture;
varying float vPulse;
varying float vNoise;

void main() {
  float sinePulse = (1. + sin(vUv.x * 50. + uTime)) * 0.5;
  vec4 myImage = texture(uTexture, vUv + 0.01 * sin(vUv * 10. + uTime * 2.));

  gl_FragColor = vec4(.0, 2.0 * distance(vUv.y, .5), 0.0, 1.0);
  gl_FragColor = vec4(sinePulse, 0.0, 0.0, 1.0);
  gl_FragColor = myImage;
  gl_FragColor = vec4(vNoise, vNoise * 2., 0.4, 1.0);
}
