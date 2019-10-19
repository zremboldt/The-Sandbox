// global variables
let renderer;
let scene;
let camera;
let control;

function init() {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  // position and point the camera to the center of the scene
  camera.position.x = 15;
  camera.position.y = 16;
  camera.position.z = 13;
  camera.lookAt(scene.position);

  // create a render, sets the background color and the size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  var ambientLight = new THREE.AmbientLight(0x090909);
  scene.add(ambientLight);

  var spotLight = new THREE.SpotLight();
  spotLight.position.set(10, 80, 30);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add elements
  addFloor();
  addCube();
  addSphere();

  // add the output of the renderer to the html element
  document.body.appendChild(renderer.domElement);

  control = new (function() {
    this.rotSpeed = 0.001;
    this.scale = 1;
  })();
  addControls(control);

  // call the render function
  render();
}

function addControls(controlObject) {
  var gui = new dat.GUI();
  gui.add(controlObject, 'rotSpeed', -0.1, 0.1);
}

function render() {
  renderer.render(scene, camera);
  var x = camera.position.x;
  var z = camera.position.z;

  camera.position.x = x * Math.cos(control.rotSpeed) + z * Math.sin(control.rotSpeed);
  camera.position.z = z * Math.cos(control.rotSpeed) - x * Math.sin(control.rotSpeed);

  camera.lookAt(scene.position);

  requestAnimationFrame(render);
}

function addSphere() {
  var sphereGeometry = new THREE.SphereGeometry(1.5, 20, 20);
  var matProps = {
    specular: '#a9fcff',
    color: '#00abb1',
    emissive: '#006063',
    shininess: 10
  };

  var sphereMaterial = new THREE.MeshPhongMaterial(matProps);
  var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.castShadow = true;
  sphereMesh.position.x = -2;
  sphereMesh.position.y = (0.75 * Math.PI) / 2;
  sphereMesh.position.z = 3;
  sphereMesh.name = 'sphere';
  scene.add(sphereMesh);
}

function addCube() {
  var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x917464 });
  var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.castShadow = true;
  cubeMesh.receiveShadow = true;
  cubeMesh.position.z = 0;
  cubeMesh.position.y = 1;
  scene.add(cubeMesh);
}

function addFloor() {
  var floorGeometry = new THREE.PlaneGeometry(120, 120, 20, 20);
  var floorMaterial = new THREE.MeshPhongMaterial();
  floorMaterial.map = THREE.ImageUtils.loadTexture('assets/floor_2-1024x1024.png');

  floorMaterial.map.wrapS = floorMaterial.map.wrapT = THREE.RepeatWrapping;
  floorMaterial.map.repeat.set(8, 8);
  var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.receiveShadow = true;
  floorMesh.rotation.x = -0.5 * Math.PI;
  scene.add(floorMesh);
}

// calls the init function when the window is done loading.
window.onload = init;
