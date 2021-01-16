uniform float time;
uniform float progress;
uniform sampler2D image;
uniform sampler2D displacement;

varying vec2 vUv;

void main() {
  vec4 displace = texture2D( displacement, vUv );
  vec2 displacedUV = vec2(
    vUv.x + progress * 0.2 * sin(vUv.y * 20. + time / 10.), 
    vUv.y
  );

  vec4 color = texture2D( image, displacedUV );
  gl_FragColor = color;
}