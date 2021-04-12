import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapMaterial = textureLoader.load('./textures/matcaps/4.png');


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// ===========================
// Objects
// ===========================

// Font
const fontLoader = new THREE.FontLoader();

fontLoader.load(
  './fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new THREE.TextBufferGeometry('Hello Benaiah!', {
      font,
      size: 0.5,
      height: 0.15,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.008,
      bevelOffset: 0,
      bevelSegments: 1,
    });

    textGeometry.center();

    const textMaterial = new THREE.MeshMatcapMaterial();
    textMaterial.matcap = matcapMaterial;
    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
  }
)

const torusGeometry = new THREE.TorusGeometry(0.4, 0.2, 30, 50);
const torusMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapMaterial });
// const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);

for(let i = 0; i < 10000; i++) {
  if (i > 50) {
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.position.x = (Math.random() - 0.5) * i * 0.2;
    torusMesh.position.y = (Math.random() - 0.5) * i * 0.2;
    torusMesh.position.z = (Math.random() - 0.5) * i * 0.2;
    torusMesh.rotation.x = Math.PI * Math.random();
    torusMesh.rotation.y = Math.PI * Math.random();
    scene.add(torusMesh);
  }
}

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
camera.position.x = 1
camera.position.y = 1
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