import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import imgRoad from '../assets/road.jpg';

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
    this.raycaster = new THREE.Raycaster();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;
    this.addObjects();
    // this.settings();
    this.mouseEvent();
    this.render();
  }

  settings() {
    this.settings = {
      progress: 0,
    };
    this.gui = new GUI();
    this.gui.add(this.settings, 'progress', 0, 1, 0.01);
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
        that.material.uniforms.u_mouse.value = {x: intersects[0].point.x, y: intersects[0].point.y};
        console.log(that.material.uniforms.u_mouse.value);
      }
    }

    window.addEventListener( 'mousemove', onMouseMove, false );
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: { derivatives: '#extension GL_OES_standard_derivatives : enable' },
      side: THREE.DoubleSide,
      uniforms: {
        u_progress: { type: 'f', value: 0 },
        u_image: { type: 't', value: new THREE.TextureLoader().load(imgRoad) },
        u_time: { type: 'f', value: 0 },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        u_uvRate1: { value: new THREE.Vector2(1,1) },
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

    this.material.uniforms.u_progress.value = this.settings.progress;
    this.material.uniforms.u_time.value = this.time;
    // this.material.uniforms.u_mouse.value = this.point;
    // console.log(this.point)
    
    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch();