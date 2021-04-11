import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Debug
const gui = new dat.GUI({ closed: false, width: 400 });


// ===========================
// Textures
// ===========================
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg');
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg');
const matcapTexture = textureLoader.load('./textures/matcaps/8.png');
const matcapRoot1Texture = textureLoader.load('./textures/matcaps/root-matcap-1.png');
const matcapRoot2Texture = textureLoader.load('./textures/matcaps/root-matcap-2.png');
const matcapRootOffWhiteTexture = textureLoader.load('./textures/matcaps/off-white-matcap-1.png');
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false; // If you can set this to false you should. It'll help performance. Since we're using NearestFilter, it'll be fine to set it false.

const environmentMapTexture = cubeTextureLoader.load([
  './textures/environmentMaps/0/px.jpg',
  './textures/environmentMaps/0/nx.jpg',
  './textures/environmentMaps/0/py.jpg',
  './textures/environmentMaps/0/ny.jpg',
  './textures/environmentMaps/0/pz.jpg',
  './textures/environmentMaps/0/nz.jpg',
])

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// ===========================
// Objects
// ===========================

// const material = new THREE.MeshBasicMaterial();
// material.color = new THREE.Color(0x00ff00);
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.map = doorColorTexture;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide; // Avoid unless needed because it requires more calculations for the CPU

// const material = new THREE.MeshNormalMaterial();
// material.wireframe = true;
// material.side = THREE.DoubleSide;
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapRoot1Texture;
// material.flatShading = true;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshDepthMaterial();

// This is the first material in this list that actually reacts to light.
// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 0.8;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.x = 1.5;
// material.normalScale.y = 1.5;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// gui.add(material, 'metalness').min(0).max(1).step(0.0001);
// gui.add(material, 'roughness').min(0).max(1).step(0.0001);
// gui.add(material, 'aoMapIntensity').min(0).max(2).step(0.0001);
// gui.add(material, 'wireframe');
// gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);

const material = new THREE.MeshStandardMaterial();
material.side = THREE.DoubleSide;
material.metalness = 0.7;
material.roughness = 0.1;
material.envMap = environmentMapTexture;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);



const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 160, 160),
  material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 200, 200),
  material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)); // This allows for Ambient Occlusion map

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 160, 320),
  material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus);


// ===========================
// Lights
// ===========================

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);


// ===========================
// Sizes
// ===========================
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


// ===========================
// Cameras
// ===========================
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// ===========================
// Renderer
// ===========================
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// ===========================
// Animate
// ===========================
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()