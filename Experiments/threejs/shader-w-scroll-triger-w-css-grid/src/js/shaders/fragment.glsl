uniform float time;
uniform float progress;
uniform sampler2D image;
uniform sampler2D displacement;

varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv, 0., 1.);
}