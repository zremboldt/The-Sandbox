// https://www.youtube.com/watch?v=jmld3mIKBIo

let scene;
let camera;
let renderer;
let controls;
let composer;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  // Camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;

  controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', renderer);

  // Lights
  ambientLight = new THREE.AmbientLight(0x202020, 200);
  scene.add(ambientLight);

  directionalLight1 = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight1.position.set(0, 1, 0);
  directionalLight1.castShadow = true;
  scene.add(directionalLight1);

  directionalLight2 = new THREE.DirectionalLight(0xc4c4c4, 50);
  directionalLight2.position.set(28000, 5800, -14000);
  directionalLight2.castShadow = true;
  scene.add(directionalLight2);

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
  loader.load('../assets/1972_datsun_240k_gt/scene.gltf', function(gltf) {
    car = gltf.scene.children[0]; // select the model and store it in `car`
    car.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);

    composer = new POSTPROCESSING.EffectComposer(renderer);
    composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

    const effectPass = new POSTPROCESSING.EffectPass(camera, new POSTPROCESSING.BloomEffect());
    effectPass.renderToScreen = true;
    composer.addPass(effectPass);

    animate();
  });
}

function animate() {
  // renderer.render(scene, camera);
  composer.render();
  requestAnimationFrame(animate);
}

init();
