import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import debounce from 'lodash.debounce';
import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';

let camera, scene, renderer;
let geometry, material, mesh;
let containerEl

init();

function init() {
  containerEl = document.getElementById('container_webgl');
  const { offsetWidth, offsetHeight } = containerEl;

  // Camera & scene
  camera = new THREE.PerspectiveCamera(70, offsetWidth / offsetHeight, 0.01, 10);
  camera.position.z = 1;
  scene = new THREE.Scene();

  // 3D objects
  addObjects();

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

  material.uniforms.uTime.value += time * 0.0001;
  console.log(material.uniforms.uTime.value)

  renderer.render(scene, camera);
}

//

function addObjects() {
  geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
  material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 1.0 },
    },
    vertexShader: vertex,
    fragmentShader: fragment
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function resizeWindow() {
  const { offsetWidth, offsetHeight } = containerEl;

  renderer.setSize(offsetWidth, offsetHeight);
  camera.aspect = offsetWidth / offsetHeight;
  camera.updateProjectionMatrix();
}