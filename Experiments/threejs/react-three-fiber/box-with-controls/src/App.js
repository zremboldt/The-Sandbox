// Built watching: https://www.youtube.com/watch?v=1rP3nNY2hTo&ab_channel=JasonLengstorf

import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';
import { Fog } from 'three';

// OrbitControls is not included with `threejs` so to let reactThreeFiber know 
// that this can also be used we add it to `extend`.
extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  })

  return (
    <orbitControls
      autoRotate
      enableDamping
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[ camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,-0.5,0]} receiveShadow>
    <planeBufferGeometry attach='geometry' args={[100,100]} />
    <meshPhysicalMaterial attach='material' color='white' />
  </mesh>
)

const Box = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const props = useSpring({
    scale: isActive ? [2, 2, 2] : [1,1,1],
    color: isHovered ? 'hotpink' : 'gray',
    position: isActive ? [0,0.5,0] : [0,0,0],
  })

  return (
    <a.mesh
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      scale={props.scale}
      position={props.position}
      castShadow
    >
      <boxBufferGeometry attach='geometry' args={[1,1,1]} />
      <a.meshPhysicalMaterial attach='material' color={props.color} />
    </a.mesh>
  )
}

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0,0,5] }} onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}>
        <ambientLight />
        <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
        <fog attach='fog' args={['white', 0, 30]} />
        <Controls />
        <Box />
        <Plane />
      </Canvas>
    </>
  )
}
