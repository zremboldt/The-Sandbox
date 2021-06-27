varying float vNoise;
varying vec2 vUv;
uniform sampler2D wavesTexture;
uniform float time;

void main() {
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

  color.r = 0.8;
  color.g = 0.5;
  color.b = 1.0;

  // vec3 finalColor = mix(color1,color2,0.5 * (vNoise + 1.));

  // vec2 newUv = vUv;
  // newUv = vec2(newUv.x, newUv.y + 0.01*sin(newUv.x*10. + time));

  // vec4 darkWaves = texture2D(wavesTexture, newUv);

  // gl_FragColor = vec4(vUv, 0.0, 1.0);
  // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  // gl_FragColor = vec4(vNoise);
  gl_FragColor = vec4(color);
}