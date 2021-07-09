varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform float time;
uniform float uHoverState;

void main() {
  vec2 newUv = vUv;
  float hover = uHoverState;

  hover = smoothstep(0.0, 1.0, (hover * 2.0 + newUv.y - 1.0));
  vec4 final = mix(
    texture2D(uImage, (newUv - 0.5) * (1.0 - hover) + 0.5), // Could use 2 different images here to animate from one to another. Here we just used uImage twice.
    texture2D(uImage, (newUv - 0.5) * hover + 0.5), 
    hover
  );

  // vec4 img = texture2D(uImage, newUv);

  // gl_FragColor = img;
  gl_FragColor = final;
  gl_FragColor.rgb += vec3(vNoise * 0.04);
}