import * as THREE from '../../../intro-to-threejs-3/src/js/node_modules/three';


// CAMERA
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 5 );
camera.lookAt( 0, 0, 0 );


// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// GEOMETRY
const geometry = new THREE.BoxGeometry(2,2,2);
const material1 = new THREE.MeshPhysicalMaterial( { color: 0xffaa00 } );
const material2 = new THREE.MeshPhysicalMaterial( { color: 'hotpink' } );
const cube1 = new THREE.Mesh( geometry, material1 );
const cube2 = new THREE.Mesh( geometry, material2 );
cube1.position.x = 2;
cube2.position.x = -2;


// LIGHTS
const light1 = new THREE.AmbientLight(0xFFFFFF, 0.5);
const light2 = new THREE.DirectionalLight(0xFFFFFF);
light2.position.set(0,5,5);


// SCENE
const scene = new THREE.Scene();
scene.add(light1, light2);
scene.add( cube1, cube2 );


// ANIMATION LOOP
const animate = function () {
  requestAnimationFrame( animate );

  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;
  cube2.rotation.x -= 0.01;
  cube2.rotation.y -= 0.01;

  renderer.render( scene, camera );
};

animate();