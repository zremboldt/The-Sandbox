import * as THREE from 'three';
import React, { useRef, Suspense } from 'react'
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import importedImage from './image1.jpg'
import glsl from 'babel-plugin-glsl/macro';

const WaveShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.4, 1.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex shader
  glsl`
    precision mediump float;
    
    varying vec2 vUv;
    uniform float uTime;

    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

    void main() {
      vUv = uv;
      vec3 pos = position;
      float noiseFreq = 1.5;
      float noiseAmp = 0.3;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise3(noisePos) * noiseAmp;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  glsl`
    precision mediump float;

    uniform float uTime;
    uniform vec3 uColor;
    uniform sampler2D uTexture;

    varying vec2 vUv;

    void main() {
      vec3 texture = texture2D(uTexture, vUv).rgb;
      gl_FragColor = vec4(texture, 1.0);
    }
  `
);

extend({ WaveShaderMaterial });

function Wave() {
  const ref = useRef();
  useFrame(({ clock }) => ref.current.uTime = clock.getElapsedTime())

  const [image] = useLoader(THREE.TextureLoader, [
    importedImage,
  ]);

  return (
    <mesh>
      <planeBufferGeometry args={[0.4, 0.6, 16, 16]} />
      <waveShaderMaterial
        uColor={'hotpink'}
        ref={ref}
        uTexture={image}
      // wireframe
      />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas
      camera={{
        fov: 12,
        position: [0, 0, 5]
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  )
}

function App() {
  return (
    <>
      <h1>Schiaparelli Crater</h1>
      <Scene />
    </>
  )
}

export default App;
