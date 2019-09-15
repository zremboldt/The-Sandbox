// https://www.youtube.com/watch?v=jmld3mIKBIo

let scene;
let camera;
let controls;
let dirLight;
let dirLightHelper;
let hemiLight;
let hemiLightHelper;
let renderer;
let composer;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);
  scene.fog = new THREE.Fog(scene.background, 1, 5000);

  // Camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;

  controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', renderer);

  // Lights
  hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 26);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
  scene.add(hemiLightHelper);

  //

  dirLight = new THREE.DirectionalLight(0xffffff, 40);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(10, 1.75, -3);
  dirLight.position.multiplyScalar(80);
  scene.add(dirLight);

  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  const d = 50;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  dirLight.shadow.camera.far = 3500;
  dirLight.shadow.bias = -0.0001;
  dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
  scene.add(dirLightHelper);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio); // This line is gold!
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;

  //
  //
  //

  let loader = new THREE.GLTFLoader();
  loader.load('../assets/1972_datsun_240k_gt/scene.gltf', function(gltf) {
    car = gltf.scene.children[0]; // select the model and store it in `car`
    const s = 0.35;
    car.scale.set(s, s, s);
    car.castShadow = true;
    car.receiveShadow = true;
    scene.add(car);

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
