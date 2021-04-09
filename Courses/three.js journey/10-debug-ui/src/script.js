import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

// Debug
const gui = new dat.GUI({ closed: true, width: 400 });

let shouldSpin = true;

const parameters = {
  color: 0x5a00ff,
  quickFlip: () => {
    gsap.to(mesh.rotation, { duration: 2, x: mesh.rotation.x + Math.PI * 2 })
  },
  toggleSpin: () => { shouldSpin = !shouldSpin }
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8)
const material = new THREE.MeshBasicMaterial({ color: parameters.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Debug
gui
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Box elevation')

gui.add(mesh, 'visible');

gui.add(material, 'wireframe');

gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color)
});

gui.add(parameters, 'quickFlip');

gui.add(parameters, 'toggleSpin');

// Sizes
const sizes = {
    width: window.innerWidth / 1.5,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth / 1.5
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
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    
    shouldSpin ? mesh.rotation.y = elapsedTime / 2 : null;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()