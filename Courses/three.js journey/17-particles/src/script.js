import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { AdditiveBlending } from 'three'

// ====================================
// Nice freee assets here
// https://www.kenney.nl/assets/
// ====================================

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('./textures/particles/9.png');

// =========================================
// Particles
// =========================================

// const particleGeometry = new THREE.SphereGeometry(1, 32, 32);
// const particleMaterial = new THREE.PointsMaterial({
//   size: 0.02,
//   sizeAttenuation: true,
// });

// const particles = new THREE.Points(particleGeometry, particleMaterial);
// scene.add(particles);

// - - - - - - - - - - - - - - - - - - - - -

// const geometry = new THREE.BufferGeometry();

// const count = 10000;
// const positionsArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = Math.random() - 0.5;
// }

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute('position', positionsAttribute);

// const material = new THREE.PointsMaterial({ size: 0.001, sizeAttenuation: true })
// const particles = new THREE.Points(geometry, material)
// scene.add(particles);

// - - - - - - - - - - - - - - - - - - - - -

// const geometry = new THREE.BufferGeometry();

// const vertexCount = 20000;

// const positions = new Float32Array(vertexCount * 3);

// for (let i = 0; i < vertexCount * 3; i++) {
//   positions[i] = (Math.random() - 0.5) * 10;
// }

// geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Why 3 here? because we need to say that every 3 values in the array make up 1 vertex.

// const material = new THREE.PointsMaterial({ 
//   transparent: true,
//   alphaMap: particleTexture,
//   // alphaTest: 0.001, // Method 1.
//   // depthTest: false, // Method 2.
//   depthWrite: false, // Method 3. This is often the best way to make the the black portion of your particle image transparent.
//   blending: AdditiveBlending, // Warning, may impact perf. Good for making things appear to glow.
//   color: 'hsl(20, 100%, 50%)',
//   size: 0.1, 
//   sizeAttenuation: true
// });
// const particles = new THREE.Points(geometry, material);
// scene.add(particles);

// - - - - - - - - - - - - - - - - - - - - -

const geometry = new THREE.BufferGeometry();

const vertexCount = 1000;

const positions = new Float32Array(vertexCount * 3); // 3 here refers to the three points in the triangular vertex.
// Add a color attribute per particle
const colors = new Float32Array(vertexCount * 3); // 3 here refers to "R", "G", "B".

for (let i = 0; i < vertexCount; i++) {
  const i3 = i * 3;
  
  const x = i3;
  const y = i3 + 1;
  const z = i3 + 2;

  positions[x] = Math.sin(i) * (Math.random() + 1);
  positions[y] = Math.cos(i) * (Math.random() + 1);
  positions[z] = Math.random() - 0.5;

  // positions[x] = (Math.random() - 0.5) * 3;
  // positions[y] = (Math.random() - 0.5) * 3;
  // positions[z] = (Math.random() - 0.5) * 3;
  
  colors[z] = Math.random() - 0.3;
  colors[y] = Math.random();
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Why 3 here? because we need to say that every 3 values in the array make up 1 vertex.
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3)) // Why 3 here? because we need to say that every 3 values in the array make up 1 vertex.

const material = new THREE.PointsMaterial({ 
  transparent: true,
  alphaMap: particleTexture,
  // alphaTest: 0.001, // Method 1.
  // depthTest: false, // Method 2.
  depthWrite: false, // Method 3. This is often the best way to make the the black portion of your particle image transparent.
  blending: AdditiveBlending,
  // color: 'hsl(20, 100%, 50%)',
  vertexColors: true,
  size: 0.1, 
  sizeAttenuation: true
});
const particles = new THREE.Points(geometry, material);
scene.add(particles);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()