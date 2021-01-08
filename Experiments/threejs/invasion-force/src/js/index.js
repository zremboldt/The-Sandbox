import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';


// =====================================
// 
// INVASION FORCE
// 
// =====================================
// 
// Looks really good along with the terminator theme song:
// https://www.youtube.com/watch?v=mpMg1upld0w&ab_channel=Atalantos1


let perspectiveCamera, controls, scene, renderer;

init();
animate();

function init() {
  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera = new THREE.PerspectiveCamera( 60, aspect, 1, 400 );
  perspectiveCamera.position.set( -10, -20, 0 );
  perspectiveCamera.lookAt( 0, 0, 0 );



  // WORLD
  const backgroundColor = 'hsl(210, 100%, 6%)';
  const fogDensity = 0.03;
  scene = new THREE.Scene();
  scene.background = new THREE.Color( backgroundColor );
  scene.fog = new THREE.FogExp2( backgroundColor, fogDensity );

  const geometry = new THREE.ConeGeometry( 0.2, 1, 3, 1  );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

  const count = 10;
  const spacing = 7;

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      for (let k = 0; k < count; k++) {
        const mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = Math.PI / 2;
        mesh.rotation.z = -Math.PI / 2;
        mesh.position.x = randomizer(-spacing, spacing * i) - 30;
        mesh.position.y = randomizer(-spacing, spacing * j) - 20;
        mesh.position.z = randomizer(-spacing, spacing * k) - 10;

        scene.add(mesh);
      }
    }
  }


  // LIGHTS
  const dirLight1 = new THREE.DirectionalLight( 'hsl(210, 50%, 50%)' );
  dirLight1.position.set( -10, -10, -10 );
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( backgroundColor );
  dirLight2.position.set( 10, 10, 10 );
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( backgroundColor );
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
  perspectiveCamera.position.x -= 0.01
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
