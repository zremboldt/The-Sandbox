let scene;
let camera;
let renderer;
let controls;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xc4e5df);

  // Camera
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = -800;
  camera.position.y = 300;
  camera.position.z = 1000;

  controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', renderer);

  // Lights
  ambientLight = new THREE.AmbientLight(0x404040, 100);
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // pointLight1 = new THREE.PointLight(0xc4c4c4, 10);
  // pointLight1.position.set(0, 300, 500);
  // scene.add(pointLight1);

  // pointLight2 = new THREE.PointLight(0xc4c4c4, 10);
  // pointLight2.position.set(500, 100, 0);
  // scene.add(pointLight2);

  // pointLight3 = new THREE.PointLight(0xc4c4c4, 10);
  // pointLight3.position.set(0, 100, -500);
  // scene.add(pointLight3);

  // pointLight4 = new THREE.PointLight(0xc4c4c4, 10);
  // pointLight4.position.set(-500, 300, 0);
  // scene.add(pointLight4);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //
  //
  //

  let loader = new THREE.GLTFLoader();
  loader.load('../assets/the_mill/scene.gltf', function(gltf) {
    millScene = gltf.scene.children[0]; // select the model and store it in `millScene`
    millScene.scale.set(4, 4, 4);
    scene.add(gltf.scene);
    animate();
  });
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
