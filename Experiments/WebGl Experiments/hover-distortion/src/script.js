import './styles/index.sass';
import hoverEffect from 'hover-effect';
import img1 from './img/green.jpg';
import img2 from './img/underSea.jpg';
import img3 from './img/underwaterChain.jpg';
import img4 from './img/wreckage.jpg';
import img5 from './img/jelly3.jpg';
import img6 from './img/jelly2.jpg';
import img7 from './img/jelly1.jpg';
import blk from './img/blk.jpg';
import wash from './img/displacement/4.png';

// converts degrees to radians
const degreesToRadians = degrees => ((degrees - 45) * Math.PI) / 180;

new hoverEffect({
  parent: document.querySelector('#img1'),
  intensity1: 0.3,
  intensity2: 0.3,
  angle: degreesToRadians(45),
  speedIn: 1,
  speedOut: 1,
  easing: Expo.easeOut,
  image1: img1,
  image2: img2,
  displacementImage: wash
});

new hoverEffect({
  parent: document.querySelector('#img2'),
  intensity1: 0.3,
  intensity2: 0.3,
  angle: degreesToRadians(45),
  speedIn: 1,
  speedOut: 1,
  easing: Expo.easeOut,
  image1: img3,
  image2: img4,
  displacementImage: wash
});

new hoverEffect({
  parent: document.querySelector('#img3'),
  intensity1: 0.3,
  intensity2: 0.3,
  angle: degreesToRadians(45),
  speedIn: 1,
  speedOut: 1,
  easing: Expo.easeOut,
  image1: img5,
  image2: img7,
  displacementImage: wash
});

new hoverEffect({
  parent: document.querySelector('#img4'),
  intensity1: 0.3,
  intensity2: 0.3,
  angle: degreesToRadians(45),
  speedIn: 1,
  speedOut: 1,
  easing: Expo.easeOut,
  image1: img6,
  image2: img5,
  displacementImage: wash
});

new hoverEffect({
  parent: document.querySelector('#img5'),
  intensity1: 0.3,
  intensity2: 0.3,
  angle: degreesToRadians(45),
  speedIn: 1,
  speedOut: 1,
  easing: Expo.easeOut,
  image1: img2,
  image2: img1,
  displacementImage: wash
});

new hoverEffect({
  parent: document.querySelector('#img6'),
  intensity1: 0.3,
  intensity2: 0.3,
  angle: degreesToRadians(45),
  speedIn: 1,
  speedOut: 1,
  easing: Expo.easeOut,
  image1: blk,
  image2: img6,
  displacementImage: wash
});
