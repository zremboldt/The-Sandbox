// This function gives you the perfect value for your camera field of view so that planes at the center of your scene are scaled to match precise pixel values.
// In other words if you have a 100x100px div on your screen and you put a WebGL plane next to it that is sized 100x100units, they will appear exactly the same size on the screen.

/* 
IMPLEMENTATION EXAMPLE

containerEl = document.getElementById('container_webgl');
const { offsetWidth, offsetHeight } = containerEl;

const cameraZPosition = 600;
camera = new THREE.PerspectiveCamera(calculateCameraFov(cameraZPosition, offsetHeight), offsetWidth / offsetHeight, 10, 1000);
camera.position.z = cameraZPosition;
scene = new THREE.Scene();
*/

export default function calculateCameraFov(cameraDistanceToPlane, planeHeight) {
  const halfOfPlaneHeight = planeHeight / 2;
  const fovInRadians = Math.atan(halfOfPlaneHeight / cameraDistanceToPlane)
  const fovInDegrees = fovInRadians * 180 / Math.PI;
  const finalFov = fovInDegrees * 2;

  return finalFov;
}
