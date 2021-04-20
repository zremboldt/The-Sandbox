import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


// =============================
// Base
// =============================

// Debug
const gui = new dat.GUI({ width: 400 });
gui.hide();

const guiParams = {
  ambientLightColor: 0x334566,
  pointLightColor: 0x8c7b76,
  moonlightColor: 0x4b526e,
  fogColor: 0x90911,
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x90911)

// Fog
const fog = new THREE.Fog(guiParams.fogColor, 0, 25);
scene.fog = fog;

gui.addColor(guiParams, 'fogColor').onChange(() => {
  fog.color.set(guiParams.fogColor);
});

// =============================
// Textures
// =============================

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAOTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const doorDisplacementTexture = textureLoader.load('./textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg');

const woodPlanksColorTexture = textureLoader.load('./textures/wood-planks/wood-planks-color.jpg');
const woodPlanksNormalTexture = textureLoader.load('./textures/wood-planks/wood-planks-normal.jpg');
const porchPlanksColorTexture = textureLoader.load('./textures/wood-planks/wood-planks-color.jpg');
const porchPlanksNormalTexture = textureLoader.load('./textures/wood-planks/wood-planks-normal.jpg');

const chimneyTopTexture = textureLoader.load('./textures/stone/stone-color.jpg');
const chimneyMiddleTexture = textureLoader.load('./textures/stone/stone-color.jpg');
const chimneyBaseTexture = textureLoader.load('./textures/stone/stone-color.jpg');

const grassColorTexture = textureLoader.load('./textures/grass/color.jpg');
const grassNormalTexture = textureLoader.load('./textures/grass/normal.jpg');
const grassAOTexture = textureLoader.load('./textures/grass/ambientOcclusion.jpg');
const grassRoughnessTexture = textureLoader.load('./textures/grass/roughness.jpg');


woodPlanksColorTexture.repeat.x = 2;
woodPlanksColorTexture.wrapS = THREE.RepeatWrapping;
woodPlanksColorTexture.wrapT = THREE.RepeatWrapping;
woodPlanksColorTexture.rotation = Math.PI * 0.5;

woodPlanksNormalTexture.repeat.x = 2;
woodPlanksNormalTexture.wrapS = THREE.RepeatWrapping;
woodPlanksNormalTexture.wrapT = THREE.RepeatWrapping;
woodPlanksNormalTexture.rotation = Math.PI * 0.5;

porchPlanksColorTexture.repeat.x = 4;
porchPlanksColorTexture.wrapS = THREE.RepeatWrapping;
porchPlanksNormalTexture.repeat.x = 4;
porchPlanksNormalTexture.wrapS = THREE.RepeatWrapping;

chimneyTopTexture.repeat.x = 0.5;

chimneyMiddleTexture.repeat.x = 2;
chimneyMiddleTexture.repeat.y = 0.8;
chimneyMiddleTexture.wrapS = THREE.RepeatWrapping;

chimneyBaseTexture.repeat.x = 0.5;
chimneyBaseTexture.repeat.y = 0.5;

grassColorTexture.repeat.x = 16
grassColorTexture.repeat.y = 16
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;

grassNormalTexture.repeat.x = 16
grassNormalTexture.repeat.y = 16
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;


// =============================
// House
// =============================

// Group
const house = new THREE.Group();
house.position.z = -1;
scene.add(house);

// Walls
const cabinBlockMain = new THREE.Mesh(
  new THREE.BoxGeometry(6, 3.5, 4, 80,80,80),
  new THREE.MeshStandardMaterial({ 
    map: woodPlanksColorTexture,
    normalMap: woodPlanksNormalTexture,
    normalScale: { x: 3, y: 3 },
  })
)
cabinBlockMain.position.y = 3.5 * 0.5;
house.add(cabinBlockMain);

const porchFloor = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.2, 1.5),
  new THREE.MeshStandardMaterial({
    map: porchPlanksColorTexture,
    normalMap: porchPlanksNormalTexture,
    normalScale: { x: 3, y: 3 },
  })
)
porchFloor.position.y = 0.2 * 0.5;
porchFloor.position.z = (1.5 * 0.5) + 2
house.add(porchFloor);

const postGeometry = new THREE.BoxGeometry(0.12, 2.2, 0.12);
const postMaterial = new THREE.MeshStandardMaterial({ color: '#ac8e82' });

const post1 = new THREE.Mesh(postGeometry, postMaterial);
post1.position.x = (6 * 0.5) -0.1;
post1.position.y = 2.2 * 0.5;
post1.position.z = 3.4;
house.add(post1);

const post2 = new THREE.Mesh(postGeometry, postMaterial);
post2.position.x = -(6 * 0.5) + 0.1;
post2.position.y = 2.2 * 0.5;
post2.position.z = 3.4;
house.add(post2);

const post3 = new THREE.Mesh(postGeometry, postMaterial);
post3.position.x = -(2 * 0.5) + 0.1;
post3.position.y = 2.2 * 0.5;
post3.position.z = 3.4;
house.add(post3);

const post4 = new THREE.Mesh(postGeometry, postMaterial);
post4.position.x = (2 * 0.5) -0.1;
post4.position.y = 2.2 * 0.5;
post4.position.z = 3.4;
house.add(post4);

// Roof
const roofGeometry = new THREE.CylinderGeometry(1, 1, 6, 3);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 'hsl(22, 82%, 22%)' });

const roofMain = new THREE.Mesh(roofGeometry, roofMaterial);
roofMain.rotation.reorder('YXZ');
roofMain.rotation.y = Math.PI * -0.5;
roofMain.rotation.x = Math.PI * -0.5;
roofMain.scale.x = 2.6
roofMain.position.y = 3.5 + (1 * 0.5);
house.add(roofMain);

const roofPorch = new THREE.Mesh(roofGeometry, roofMaterial);
roofPorch.rotation.reorder('YXZ');
roofPorch.rotation.y = Math.PI * -0.5;
roofPorch.rotation.x = Math.PI * -0.5;
roofPorch.scale.x = 2.6;
roofPorch.scale.y = 0.999;
roofPorch.position.y = 2.2 + (1 * 0.5);
roofPorch.position.z = 1.3
house.add(roofPorch);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 60, 60),
  new THREE.MeshStandardMaterial({
    color: 'hsl(25, 0%, 50%)',
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAOTexture,
    displacementMap: doorDisplacementTexture,
    displacementScale: 0.2,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    roughness: 2
  })
)
// NOTE: This next line is necessary for ambient Occlusion to work.
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)); 
door.position.z = 2 - 0.04;
door.position.y = 2.4 * 0.5;
house.add(door);

// Windows
const windowGeometry = new THREE.PlaneGeometry(1, 1);
const windowMaterial = new THREE.MeshStandardMaterial({ color: 'hsl(0, 0%, 40%)' });

const window1 = new THREE.Mesh(windowGeometry, windowMaterial)
window1.position.x = 1.8;
window1.position.y = 3 * 0.5;
window1.position.z = 2 + 0.01;
house.add(window1);

const window2 = new THREE.Mesh(windowGeometry, windowMaterial)
window2.position.x = -1.8;
window2.position.y = 3 * 0.5;
window2.position.z = 2 + 0.01;
house.add(window2);

// Chimney
const chimney = new THREE.Group();
chimney.position.x = -(0.8 * 0.5) -3;
house.add(chimney);

const chimneyBase = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ 
    map: chimneyBaseTexture 
  })
);
chimneyBase.position.y = 1.5 * 0.5;
chimney.add(chimneyBase);

const chimneyMiddle = new THREE.Mesh(
  new THREE.ConeGeometry(1.06, 2, 4),
  new THREE.MeshStandardMaterial({ 
    map: chimneyMiddleTexture 
  })
);
chimneyMiddle.rotation.y = Math.PI * 0.25
chimneyMiddle.position.y = (2 * 0.5) + 1.5;
chimneyMiddle.position.x = 0.35;
chimney.add(chimneyMiddle);

const chimneyTop = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 3.5, 1),
  new THREE.MeshStandardMaterial({ 
    map: chimneyTopTexture 
  })  
);
chimneyTop.position.x = 0.15;
chimneyTop.position.y = (3 * 0.5) + 2.1;
chimney.add(chimneyTop);

// Trees
const trees = new THREE.Group();
scene.add(trees);

const treeGeometry = new THREE.BoxGeometry(1, 20, 1);
const treeMaterial = new THREE.MeshStandardMaterial({ color: '#453729' });

for (let i = 0; i < 100; i++) {
  const angle = (Math.PI * 2) * Math.random();
  const circleRaduis = 6 + Math.random() * 14;
  const xPos = Math.cos(angle) * circleRaduis;
  const zPos = Math.sin(angle) * circleRaduis;
  const treeThickness = 0.4 + (Math.random() * 0.6)

  // Thin out trees in front of house
  const isInFrontOfHouseX = xPos > -4 && xPos < -1;
  const isInFrontOfHouseZ = zPos > 0;
  if (isInFrontOfHouseX && isInFrontOfHouseZ) { continue };

  // Place trees
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);
  tree.position.set(xPos, 9.5, zPos);
  tree.scale.set(treeThickness, 1, treeThickness);
  console.log(tree)
  tree.rotation.x = (Math.random() - 0.5) * 0.1;
  tree.rotation.y = (Math.random() - 0.5) * 0.5;
  tree.rotation.z = (Math.random() - 0.5) * 0.1;
  tree.castShadow = true;
  trees.add(tree);
}


// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ 
    color: 'hsl(0, 10%, 50%)',
    map: grassColorTexture,
    normalMap: grassNormalTexture,
    aoMap: grassAOTexture,
    roughnessMap: grassRoughnessTexture,
    roughness: 1.3,
  })
)
ground.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(ground.geometry.attributes.uv.array, 2)); 
ground.rotation.x = - Math.PI * 0.5
ground.position.y = 0
scene.add(ground)

// =============================
// Lights
// =============================

const ghost1 = new THREE.PointLight(0x00ffff, 2, 4)
scene.add(ghost1);

const ghost2 = new THREE.PointLight(0xff00ff, 2, 4)
scene.add(ghost2);

const ghost3 = new THREE.PointLight(0x0000ff, 2, 4)
scene.add(ghost3);

// Ambient light
const ambientLight = new THREE.AmbientLight(guiParams.ambientLightColor, 0.1)
scene.add(ambientLight)

gui.addColor(guiParams, 'ambientLightColor').onChange(() => {
  ambientLight.color.set(guiParams.ambientLightColor);
});
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient light intensity');


// Point light
const pointLight = new THREE.PointLight(guiParams.pointLightColor, 0.75, 6)
pointLight.position.set(0, 1.8, 2.5);
house.add(pointLight)

gui.addColor(guiParams, 'pointLightColor').onChange(() => {
  pointLight.color.set(guiParams.pointLightColor);
})
gui.add(pointLight, 'intensity').min(0).max(1).step(0.001).name('Pointlight intensity');

// Directional light
const moonLight = new THREE.DirectionalLight(guiParams.moonlightColor, 0.2)
moonLight.position.set(5, -0.5, -1.5)
scene.add(moonLight)

gui.addColor(guiParams, 'moonlightColor').onChange(() => {
  moonLight.color.set(guiParams.moonlightColor);
})
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('Moonlight intensity');
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)

// =============================
// Sizes
// =============================

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// =============================
// Camera
// =============================

// Base camera
const cameraSubject = new THREE.Vector3(0, 2, 0);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -4
camera.position.y = 2
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// =============================
// Renderer
// =============================

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// =============================
// Shadows
// =============================

renderer.shadowMap.enabled = true;

ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

pointLight.castShadow = true;

cabinBlockMain.castShadow = true;
roofMain.castShadow = true;
roofPorch.castShadow = true;
porchFloor.castShadow = true;

post1.castShadow = true;
post2.castShadow = true;
post3.castShadow = true;
post4.castShadow = true;

ground.receiveShadow = true;
cabinBlockMain.receiveShadow = true;
roofMain.receiveShadow = true;
roofPorch.receiveShadow = true;

// =============================
// Animate
// =============================

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  ghost1.position.x = -Math.cos(elapsedTime * 0.1) * (10 + Math.sin(elapsedTime * 1) * 4);
  ghost1.position.z = -Math.sin(elapsedTime * 0.1) * (10 + Math.sin(elapsedTime * 1) * 4);
  ghost1.position.y = 3 + Math.cos(elapsedTime * 0.25) * 3;

  ghost2.position.x = -Math.cos(elapsedTime * 0.2) * (10 + Math.sin(elapsedTime * 1) * 4);
  ghost2.position.z = -Math.sin(elapsedTime * 0.2) * (10 + Math.sin(elapsedTime * 1) * 4);
  ghost2.position.y = 3 + Math.cos(elapsedTime * 0.25) * 3;

  ghost3.position.x = -Math.cos(elapsedTime * 0.3) * (10 + Math.sin(elapsedTime * 1) * 4);
  ghost3.position.z = -Math.sin(elapsedTime * 0.3) * (10 + Math.sin(elapsedTime * 1) * 4);
  ghost3.position.y = 3 + Math.cos(elapsedTime * 0.25) * 3;

  // Update controls
  controls.update()
  camera.lookAt(cameraSubject);

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()