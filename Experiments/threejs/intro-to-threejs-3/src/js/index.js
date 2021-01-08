import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';


let perspectiveCamera, controls, scene, renderer;
const frustumSize = 10;

init();
animate();

function init() {
  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera = new THREE.PerspectiveCamera( 60, aspect, 1, 400 );
  perspectiveCamera.position.set( 0, -10, 10 );
  perspectiveCamera.lookAt( 0, 0, 0 );



  // WORLD
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.02 );

  const geometry = new THREE.BoxGeometry( 1,1,1 );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

  const count = 10;
  const spacing = 10;

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      for (let k = 0; k < count; k++) {
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = randomizer(-spacing, spacing * i);
        mesh.position.y = randomizer(-spacing, spacing * j);
        mesh.position.z = randomizer(-spacing, spacing * k);

        scene.add(mesh);
      }
    }
  }


  // LIGHTS
  const dirLight1 = new THREE.DirectionalLight( 0xffffff );
  dirLight1.position.set( -10, -10, -10 );
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( 0x002288 );
  dirLight2.position.set( 10, 10, 10 );
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( 0x222222 );
  scene.add( ambientLight );


  // RENDERER
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  window.addEventListener( 'resize', onWindowResize, false );
  createControls( perspectiveCamera );
}


// CAMERA
function createControls( camera ) {
  controls = new TrackballControls( camera, renderer.domElement );

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
}


function render() {
  const camera = perspectiveCamera;
  renderer.render( scene, camera );
}

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  render();
}


// HELPERS
function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
}

function randomizer(min, max) {
  return Math.random() * (max - min) + min
}
