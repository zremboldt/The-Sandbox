import * as THREE from "three";
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import imgAbove from '../assets/above.jpg';

export default class Sketch{
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild( this.renderer.domElement );

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 1;
    this.scene = new THREE.Scene();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.addObjects();
    this.time = 0;
    this.render();
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: { derivatives: '#extension GL_OES_standard_derivatives : enable' },
      side: THREE.DoubleSide,
      uniforms: {
        image: { type: 't', value: new THREE.TextureLoader().load(imgAbove) },
        uvRate1: { value: new THREE.Vector2(1,1) }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    });

    this.geometry = new THREE.PlaneGeometry(1,1,1,1);

    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.plane );
  }
  
  render() {
    this.time++;
    console.log(this.time);
    
    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch();