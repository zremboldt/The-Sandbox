import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const loadingManager = new THREE.LoadingManager(); // Not necessary but can be used to create site loading bars.
loadingManager.onStart = () => console.log('loading has started');
loadingManager.onProgress = () => console.log('loading in progress');
loadingManager.onLoad = () => console.log('loading is complete');
loadingManager.onError = () => console.error('loading error occured');

const textureLoader = new THREE.TextureLoader(loadingManager);

const albedoTexture = textureLoader.load('./textures/door/color.jpg');
const albedoTextureCheckerboard = textureLoader.load('./textures/checkerboard-1024x1024.png');
const albedoTextureMinecraft = textureLoader.load('./textures/minecraft.png');
const alphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const heightTexture = textureLoader.load('./textures/door/height.jpg');
const normalTexture = textureLoader.load('./textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg');

albedoTexture.repeat.x = 2;
albedoTexture.repeat.y = 2;
albedoTexture.wrapS = THREE.MirroredRepeatWrapping
albedoTexture.wrapT = THREE.RepeatWrapping

// albedoTexture.offset.x = 0.2

albedoTexture.rotation = Math.PI * 0.25;

// Make texture rotate on the center point rather than the bottom corner.
albedoTexture.center.x = 0.5;
albedoTexture.center.y = 0.5;

// magFilter will give you sharp edges no matter the texture resolution (a pixel art look)
// THREE.NearestFilter is best for performance.
// If you're using NearestFilter on a minFilter you can turn off `generateMipmaps` to improve perf.
albedoTextureMinecraft.magFilter = THREE.NearestFilter;

// When using mipmapping you're sending twice as many pixels to the gpu.

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log(geometry.attributes)
const material = new THREE.MeshBasicMaterial({ map: albedoTextureMinecraft })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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