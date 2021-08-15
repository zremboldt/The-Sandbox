varying vec2 vUv;
uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture;

void main() {
  vec4 image = texture(uTexture, vUv);

  gl_FragColor = vec4(vUv, uProgress, 1.0);
  gl_FragColor = image;
}
