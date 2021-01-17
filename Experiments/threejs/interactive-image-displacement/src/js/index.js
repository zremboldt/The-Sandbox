import * as THREE from "three";
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import imgAbove from '../assets/above.jpg';
import terrainMap from '../assets/terrain-height-map.png';

export default class Sketch {
  constructor() {
    this.scene = new THREE.Scene();
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor( 0x000000, 1);
    document.getElementById('container').appendChild( this.renderer.domElement );

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.001, 1000 );
    this.camera.position.set(0,0,1);
    this.raycaster = new THREE.Raycaster();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.settings();
    this.time = 0;
    this.mouseEvent();
    this.addObjects();
    this.render();
  }

  mouseEvent() {
    let that = this;
    this.mouse = new THREE.Vector2();
    
    function onMouseMove(event) {
      that.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      that.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      
      that.raycaster.setFromCamera( that.mouse, that.camera );
      
      const intersects = that.raycaster.intersectObjects( that.scene.children );
      
      if (intersects.length > 0) {
        that.material.uniforms.mouse.value = intersects[0].point;
      }
    }

    window.addEventListener( 'mousemove', onMouseMove, false );
  }

  settings() {
    this.settings = {
      progress: 0.5,
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
        mouse: { type: 'v3', value: new THREE.Vector3() },
        time: { type: 'f', value: 0 },
        terrainMap: { type: 't', value: new THREE.TextureLoader().load(terrainMap) },
        image: { type: 't', value: new THREE.TextureLoader().load(imgAbove) },
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
    // console.log(this.time);

    this.material.uniforms.progress.value = this.settings.progress;
    this.material.uniforms.time.value = this.time;
    
    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch();