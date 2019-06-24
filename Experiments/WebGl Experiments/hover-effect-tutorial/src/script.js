import hoverEffect from 'hover-effect';
import artifacts from './img/artifacts.jpg';
import plane from './img/plane.jpg';
import displace from './img/1.png';

const degreesToRadians = degrees => ((degrees - 45) * Math.PI) / 180;

const myElement = document.querySelector('#img1');

const magic = new hoverEffect({
  parent: myElement,
  hover: false,
  speed: 0.3,
  angle: degreesToRadians(90),
  image1: artifacts,
  image2: plane,
  displacementImage: displace
});

let first = true;
myElement.addEventListener('click', () => {
  if (first) {
    magic.next();
  } else {
    magic.previous();
  }
  first = !first;
});
