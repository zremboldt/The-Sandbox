import './styles/index.sass';
import hoverEffect from 'hover-effect';
import blank from './img/blank.gif';
import artifacts from './img/artifacts.jpg';
import plane from './img/plane.jpg';
import rocky from './img/rocky.jpg';
import school from './img/school.jpg';
import deep from './img/deep.jpg';
import jelly from './img/jelly.jpg';
import reef from './img/reef.jpg';
import reef2 from './img/reef2.jpg';
import perils from './img/perils.jpg';
import perils2 from './img/perils2.jpg';
import shallows from './img/shallows.jpg';
import shallows3 from './img/shallows3.jpg';
import wash from './img/displacement/4.png';

///////////////////////////////////////////////////////////
// WebGL Distortion Effects

// converts degrees to radians
const degreesToRadians = degrees => ((degrees - 45) * Math.PI) / 180;

const effectConfig = {
  hover: false, // This tells library not to trigger on hover
  intensity1: 0.5,
  intensity2: 0.5,
  angle: degreesToRadians(45),
  speedIn: 1,
  speedOut: 1,
  easing: Expo.easeOut,
  displacementImage: wash
};

const card1 = new hoverEffect({
  ...effectConfig,
  parent: document.querySelector('#img1'),
  image1: blank,
  image2: artifacts
});

const card2 = new hoverEffect({
  ...effectConfig,
  parent: document.querySelector('#img2'),
  image1: blank,
  image2: jelly
});

const card3 = new hoverEffect({
  ...effectConfig,
  parent: document.querySelector('#img3'),
  image1: blank,
  image2: reef
});

const card4 = new hoverEffect({
  ...effectConfig,
  parent: document.querySelector('#img4'),
  image1: blank,
  image2: perils
});

const card5 = new hoverEffect({
  ...effectConfig,
  parent: document.querySelector('#img5'),
  image1: blank,
  image2: shallows3
});

const imgEffect = [card1, card2, card3, card4, card5];

//

///////////////////////////////////////////////////////////
// Intersection Observer

const ioConfig = {
  root: null, // 'null' sets it to default value: viewport
  rootMargin: '0px 0px 0px', // I'm adding 600px to the top of the bounds, 0 to sides and 0 to bottom.
  threshold: 0.9 // isIntersecting triggers when 90% of observed object is visible.
};

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let elementNum = entry.target.children[0].id.substring(3) - 1;
      imgEffect[elementNum].next();
    } else {
      imgEffect[elementNum].previous();
    }
  });
}, ioConfig);

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  io.observe(card);
});
