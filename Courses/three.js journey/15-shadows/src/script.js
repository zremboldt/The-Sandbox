import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Textures
const textureLoader = new THREE.TextureLoader();
const bakedShadowTexture = textureLoader.load('./textures/bakedShadow.jpg');
const simpleShadowTexture = textureLoader.load('./textures/simpleShadow.jpg');

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
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
ambientLight.intensity = 0;
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.intensity = 0.5;
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 1024;
directionalLight.shadow.mapSize.y = 1024;
// These next lines are optimizing the camera that's generating our shadow map for each frame.
// We don't want to render more than we need to so we're squeezing down what we're asking the light-camera to render.
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.top = 1.5;
directionalLight.shadow.camera.bottom = -1.5;
directionalLight.shadow.camera.left = 1.5;
directionalLight.shadow.camera.right = -1.5;
directionalLight.shadow.radius = 4;
scene.add(directionalLight)

// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(directionalLightCameraHelper);

// Spotlight
const spotlight = new THREE.SpotLight(0x5555ff, 0.4, 10, Math.PI * 0.3);
spotlight.castShadow = true;
spotlight.shadow.mapSize.set(1024, 1024);
spotlight.shadow.camera.near = 1;
spotlight.shadow.camera.far = 5;
spotlight.shadow.camera.fov = 30;
spotlight.shadow.radius = 4;
spotlight.position.set(0, 2, 2);
scene.add(spotlight);

// const spotlightCameraHelper = new THREE.CameraHelper(spotlight.shadow.camera);
// scene.add(spotlightCameraHelper);

// Pointlight
const pointlight = new THREE.PointLight(0x0000ff, 0.3);
pointlight.position.set(1, 1, 0);
pointlight.castShadow = true;
pointlight.shadow.mapSize.set(1024, 1024);
pointlight.shadow.radius = 10;
pointlight.shadow.camera.near = 0.4;
pointlight.shadow.camera.far = 5;
console.log(pointlight.shadow)
scene.add(pointlight);

// const pointlightCameraHelper = new THREE.CameraHelper(pointlight.shadow.camera);
// scene.add(pointlightCameraHelper);

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

const planeMaterial = new THREE.MeshStandardMaterial({ map: bakedShadowTexture });


/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.castShadow = true;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
    // planeMaterial
)
plane.receiveShadow = true;
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

scene.add(sphere, plane)

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.2, 1.2),
  new THREE.MeshBasicMaterial({ 
    color: 'black', 
    transparent: true,
    alphaMap: simpleShadowTexture 
  })
)
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01
scene.add(sphereShadow);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.y = 2
camera.position.z = 2
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
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update sphere
    sphere.position.x = Math.sin(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));
    sphere.position.z = Math.cos(elapsedTime) * 1.5;

    // Update sphereShadow
    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.z = sphere.position.z;
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.7;
    sphereShadow.scale.x = sphere.position.y + 0.5;
    sphereShadow.scale.y = sphere.position.y + 0.5;

    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()