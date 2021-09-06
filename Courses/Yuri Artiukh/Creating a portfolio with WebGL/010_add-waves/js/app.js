import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import debounce from 'lodash.debounce';
import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';
import testTexture from '../images/texture.jpg';
import calculateCameraFov from './calculate-camera-fov'
import * as dat from 'dat.gui';
import gsap from 'gsap';


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
  // timeline.progress(settings.progress);

  renderer.render(scene, camera);
}

//

function addObjects() {
  const { offsetWidth, offsetHeight } = containerEl;

  geometry = new THREE.PlaneBufferGeometry(350, 350, 40, 40);
  material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 1.0 },
      uProgress: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(offsetWidth, offsetHeight) },
      uQuadSize: { value: new THREE.Vector2(350, 350) },
      uTexture: { value: new THREE.TextureLoader().load(testTexture) },
      uTextureSize: { value: new THREE.Vector2(100, 100) },
      uCorners: { value: new THREE.Vector4(0, 0, 0, 0) }
    },
    vertexShader: vertex,
    fragmentShader: fragment
  });

  timeline = gsap.timeline()
    .to(material.uniforms.uCorners.value, { x: 1, duration: 1 })
    .to(material.uniforms.uCorners.value, { y: 1, duration: 1 }, 0.1)
    .to(material.uniforms.uCorners.value, { z: 1, duration: 1 }, 0.2)
    .to(material.uniforms.uCorners.value, { w: 1, duration: 1 }, 0.3)

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 300;
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