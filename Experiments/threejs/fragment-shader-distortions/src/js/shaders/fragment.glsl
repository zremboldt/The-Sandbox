uniform float time;
uniform float progress;
uniform sampler2D image;
uniform sampler2D displacement;

varying vec2 vUv;

void main() {
  vec4 displace = texture2D( displacement, vUv.yx );

  vec2 displacedUV = vec2(
    vUv.x, 
    vUv.y
  );

  displacedUV.y = mix(vUv.y, displace.r - 0.1, progress / 2.);

  vec4 color = texture2D( image, displacedUV );

  color.r = texture2D( image, displacedUV + vec2(0., 3.*0.005) * progress ).r;
  color.g = texture2D( image, displacedUV + vec2(0., 3.*0.01) * progress ).g;
  color.b = texture2D( image, displacedUV + vec2(0., 3.*0.02) * progress ).b;

  gl_FragColor = color;
}