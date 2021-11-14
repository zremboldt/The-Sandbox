import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 })
const guiParams = {
  vertexCount: 300000,
  particleSize: 0.01,
  galaxyRadius: 5,
  branchCount: 5,
  spin: 0.8,
  randomness: 0.5,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Galaxy
let geometry = null;
let material = null;
let particles = null;

const deleteGalaxy = () => {
  geometry.dispose();
  material.dispose();
  scene.remove(particles);
}

const generateGalaxy = () => {
  if (particles !== null) { deleteGalaxy() };

  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(guiParams.vertexCount * 3);
  const colors = new Float32Array(guiParams.vertexCount * 3);

  const insideColor = new THREE.Color(guiParams.insideColor);
  const outsideColor = new THREE.Color(guiParams.outsideColor);

  console.log(insideColor)

  for(let i = 0; i < guiParams.vertexCount; i++) {
    const i3 = i * 3;

    // Positions
    const radius = Math.random() * guiParams.galaxyRadius;
    // const radius = Math.abs(Math.log(Math.random(), 0.1) * (guiParams.galaxyRadius * 0.2));
    if (i < 30) {
      console.log({radius})
    }
    const spinAngle = radius * guiParams.spin;
    const branchAngle = (i % guiParams.branchCount) / guiParams.branchCount * Math.PI * 2;

    const randomX = Math.pow(Math.random(), guiParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const randomY = Math.pow(Math.random(), guiParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
    const randomZ = Math.pow(Math.random(), guiParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);

    positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Colors
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / guiParams.galaxyRadius)

    colors[i3 + 0] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size: guiParams.particleSize,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  particles = new THREE.Points(geometry, material);
  scene.add(particles)
}

generateGalaxy();

gui.add(guiParams, 'vertexCount').min(100).max(1000000).step(100).onFinishChange(generateGalaxy);
gui.add(guiParams, 'particleSize').min(0.001).max(0.1).onFinishChange(generateGalaxy);
gui.add(guiParams, 'galaxyRadius').min(0.1).max(20).onFinishChange(generateGalaxy);
gui.add(guiParams, 'branchCount').min(1).max(20).step(1).onFinishChange(generateGalaxy);
gui.add(guiParams, 'spin').min(-5).max(5).onFinishChange(generateGalaxy);
gui.add(guiParams, 'randomness').min(0).max(2).onFinishChange(generateGalaxy);
gui.add(guiParams, 'randomnessPower').min(1).max(10).step(0.01).onFinishChange(generateGalaxy);
gui.addColor(guiParams, 'insideColor').onFinishChange(generateGalaxy);
gui.addColor(guiParams, 'outsideColor').onFinishChange(generateGalaxy);

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
camera.position.x = 3
camera.position.y = 3
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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    particles.rotation.y = elapsedTime * 0.02

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()