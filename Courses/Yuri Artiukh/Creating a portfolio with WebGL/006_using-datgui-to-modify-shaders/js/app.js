import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import debounce from 'lodash.debounce';
import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';
import testTexture from '../images/texture.jpg';
import calculateCameraFov from './calculate-camera-fov'
import * as dat from 'dat.gui';



let camera, scene, renderer;
let geometry, material, mesh;
let containerEl;

init();

function init() {
  containerEl = document.getElementById('container_webgl');
  const { offsetWidth, offsetHeight } = containerEl;

  // Camera & scene
  const cameraZPosition = 600;
  camera = new THREE.PerspectiveCamera(calculateCameraFov(cameraZPosition, offsetHeight), offsetWidth / offsetHeight, 10, 1000);
  camera.position.z = cameraZPosition;
  scene = new THREE.Scene();

  // 3D objects
  addObjects();
  setupSettings();

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(offsetWidth, offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setAnimationLoop(animation);
  containerEl.appendChild(renderer.domElement);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement)

  // Resize listener
  window.addEventListener('resize', debounce(resizeWindow, 300))
}

//

function animation(time) {
  // mesh.rotation.x = time / 2000;
  // mesh.rotation.y = time / 1000;

  const seconds = (time * 0.001);

  material.uniforms.uTime.value = seconds;
  material.uniforms.uProgress.value = settings.progress;

  renderer.render(scene, camera);
}

//

function addObjects() {
  geometry = new THREE.PlaneBufferGeometry(350, 350, 1, 1);
  material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 1.0 },
      uProgress: { value: 0.0 },
      uTexture: { value: new THREE.TextureLoader().load(testTexture) }
    },
    vertexShader: vertex,
    fragmentShader: fragment
  });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 300;
  mesh.rotation.z = 0.5;
  scene.add(mesh);
}

function resizeWindow() {
  const { offsetWidth, offsetHeight } = containerEl;

  renderer.setSize(offsetWidth, offsetHeight);
  camera.aspect = offsetWidth / offsetHeight;
  camera.updateProjectionMatrix();
}

function setupSettings() {
  settings = {
    progress: 0
  }
  gui = new dat.GUI();
  gui.add(settings, 'progress', 0, 1, 0.001)
}