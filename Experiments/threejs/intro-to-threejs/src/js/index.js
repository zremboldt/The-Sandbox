import * as THREE from 'three';


// CAMERA
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;


// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// GEOMETRY
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhysicalMaterial( { color: 0xffaa00 } );
const cube = new THREE.Mesh( geometry, material );


// SCENE
const scene = new THREE.Scene();
scene.add( cube );


// LIGHTS
const light1 = new THREE.AmbientLight(0xFFFFFF, 0.5);
const light2 = new THREE.DirectionalLight(0xFFFFFF);
light2.position.set(10,0,5);

scene.add(light1);
scene.add(light2);


// ANIMATION LOOP
const animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();