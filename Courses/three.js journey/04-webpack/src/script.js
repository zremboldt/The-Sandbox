import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};

const fieldOfView = 75;
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio);
camera.position.z = 3;
scene.add(camera);

const canvasEl = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvasEl });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
