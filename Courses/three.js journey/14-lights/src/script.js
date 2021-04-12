import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 });
gui.hide();

const parameters = {
  ambientLightColor: 0x9f78ff,
  directionalLightColor: 0x28ff73,
  hemisphereLightColor1: 0xff0000,
  hemisphereLightColor2: 0x0000ff,
  pointLightColor: 0xffff00,
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes
const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(parameters.ambientLightColor, 0.4);
// scene.add(ambientLight);

gui.add(ambientLight, 'intensity').min(0).max(1);
gui.addColor(parameters, 'ambientLightColor').onChange(() => {
  ambientLight.color.set(parameters.ambientLightColor)
})

const directionalLight = new THREE.DirectionalLight(parameters.directionalLightColor, 0.9);
directionalLight.position.set(1, 0.25, 0);
// scene.add(directionalLight);

gui.add(directionalLight, 'intensity').min(0).max(1);
gui.addColor(parameters, 'directionalLightColor').onChange(() => {
  directionalLight.color.set(parameters.directionalLightColor)
})

const hemisphereLight = new THREE.HemisphereLight(
  parameters.hemisphereLightColor1,
  parameters.hemisphereLightColor2,
  0.3
);
// scene.add(hemisphereLight);

gui.add(hemisphereLight, 'intensity').min(0).max(1);
gui.addColor(parameters, 'hemisphereLightColor1').onChange(() => {
  hemisphereLight.color.set(parameters.hemisphereLightColor1);
});
gui.addColor(parameters, 'hemisphereLightColor2').onChange(() => {
  hemisphereLight.groundColor.set(parameters.hemisphereLightColor2);
});

const pointLight = new THREE.PointLight(parameters.pointLightColor, 0.5);
pointLight.position.set(0, -0.5, 1);
// scene.add(pointLight);

gui.add(pointLight, 'intensity').name('Point light intensity').min(0).max(1);
gui.add(pointLight, 'distance').name('Point light distance').min(0).max(10);
gui.add(pointLight, 'decay').name('Point light decay').min(0).max(5);
gui.addColor(parameters, 'pointLightColor').onChange(() => {
  pointLight.color.set(parameters.pointLightColor);
})

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5.5, 1.4, 3.3);
rectAreaLight.position.set(-0.5, 0.2, 0.7);
rectAreaLight.lookAt(new THREE.Vector3());
// scene.add(rectAreaLight);

gui.add(rectAreaLight, 'intensity').name('Rect area light intensity').min(0).max(10);
gui.add(rectAreaLight, 'width').name('Rect area light width').min(0).max(10);
gui.add(rectAreaLight, 'height').name('Rect area light height').min(0).max(10);

const spotlight = new THREE.SpotLight(0x78ff00, 1.5, 6, Math.PI * 0.1, 1, 1);
spotlight.position.set(0, 2, 3);
scene.add(spotlight);
spotlight.target.position.x = 1.5;
scene.add(spotlight.target);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()