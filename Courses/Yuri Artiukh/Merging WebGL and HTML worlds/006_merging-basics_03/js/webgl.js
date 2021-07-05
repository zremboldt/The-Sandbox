import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import Scroll from './scroll';
import imagesLoaded from 'imagesloaded';
import FontFaceObserver from 'fontfaceobserver';

export default class Sketch {
  constructor(options) {
    this.cameraPosZ = 600;
    this.time = 0;

    this.scene = new THREE.Scene();

    this.container = options.container;

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    
    this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 100, 2000 );
    this.camera.position.z = this.cameraPosZ;

    // ==========================
    // The next 2 lines are the most important part in connecting the HTML and JS worlds.
    // ==========================
    // Here we're finding the correct camera field-of-view in order to make a 100x100 square on our canvas
    // appear to be the same size as a 100px x 100px div in our HTML.
    this.calculatedFov = 2 * Math.atan((this.height / 2) / this.cameraPosZ); 
    // Math.atan (above) returns an angle in radians so we'll convert it to degrees on the next line and assign it to the camera.fov.
    this.camera.fov = this.calculatedFov * (180 / Math.PI); 

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    // this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.images = [...document.querySelectorAll('.article-image')];

    this.currentScroll = 0; // TODO: This may not be 0 when page loads because of scrollRestoration.

    // The next three promises allow us to wait for the fonts and images to load
    // and after they've loaded the promises resolve.
    // Then the code inside of Promise.all is triggered to run.
    const fontExo = new Promise(resolve => {
      new FontFaceObserver('Exo 2').load().then(() => resolve());
    })

    const fontMono = new Promise(resolve => {
      new FontFaceObserver('IBM Plex Mono').load().then(() => resolve());
    })

    const imagesHaveLoaded = new Promise(resolve => {
      imagesLoaded(this.images, resolve)
    })

    Promise.all([fontExo, fontMono, imagesHaveLoaded]).then(() => {
      this.scroll = new Scroll();
      this.addImages();
      this.setPosition();
      this.resize();
      this.setupResize();
      // this.addObjects();
      this.render();

      // window.addEventListener('scroll', () => {
      //   this.currentScroll = window.scrollY;
      //   this.setPosition();
      // })
    })
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize( this.width, this.height );
    this.camera.aspect = this.width/this.height;
    this.camera.updateProjectionMatrix();
  }

  addImages() {
    this.imageStore = this.images.map(img => {
      let bounds = img.getBoundingClientRect();

      let geometry = new THREE.PlaneBufferGeometry( bounds.width, bounds.height, 1, 1 );
      let texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      let material = new THREE.MeshBasicMaterial({ map: texture });
      let mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

      return {
        img,
        mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
      }
    })
  }

  setPosition() {
    this.imageStore.forEach(obj => {

      obj.mesh.position.y = this.currentScroll - obj.top + this.height/2 - obj.height/2;
      obj.mesh.position.x = obj.left - this.width/2 + obj.width/2;
    })
  }

  // addObjects() {
  //   this.geometry = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 );
  //   this.material = new THREE.ShaderMaterial({
  //     side: THREE.DoubleSide,
  //     wireframe: true,
  //     fragmentShader: fragment,
  //     vertexShader: vertex,
  //     uniforms: {
  //       time: { value: 0 },
  //       // wavesTexture: { value: new THREE.TextureLoader().load(waves)}
  //     }
  //   })
  
  //   this.mesh = new THREE.Mesh( this.geometry, this.material );
  //   this.scene.add( this.mesh );
  // }

  render() {
    this.time += 0.05;

    this.scroll.render();
    this.currentScroll = this.scroll.scrollToRender;
    this.setPosition();
    
    // this.material.uniforms.time.value = this.time;

    this.renderer.render( this.scene, this.camera );

    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({ container: document.getElementById('container_webgl') });
