import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';

export default class Sketch{
  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor(0xeeeeee, 1);
    document.getElementById('container').appendChild( this.renderer.domElement );

    const size = 1;
    this.camera = new THREE.OrthographicCamera( size / - 2, size / 2, size / 2, size / - 2, -1000, 1000 );
    this.camera.position.set(0,0,1);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;
    this.addObjects();
    this.settings();
    this.render();
  }

  settings() {
    this.settings = {
      progress: 0,
    };
    this.gui = new GUI();
    this.gui.add(this.settings, 'progress', 0, 1, 0.01);
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: { derivatives: '#extension GL_OES_standard_derivatives : enable' },
      side: THREE.DoubleSide,
      uniforms: {
        progress: { type: 'f', value: 0 },
        time: { type: 'f', value: 0 },
        uvRate1: { value: new THREE.Vector2(1,1) },
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

    this.material.uniforms.progress.value = this.settings.progress;
    this.material.uniforms.time.value = this.time;
    
    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch();