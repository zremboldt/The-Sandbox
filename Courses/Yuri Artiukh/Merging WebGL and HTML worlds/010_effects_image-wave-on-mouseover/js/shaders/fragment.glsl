varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform float time;

void main() {

  vec2 newUv = vUv;

  vec4 img = texture2D(uImage, newUv);

  gl_FragColor = img;
  gl_FragColor.rgb += vec3(vNoise * 0.04);
}