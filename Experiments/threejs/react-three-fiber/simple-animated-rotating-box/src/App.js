import React, { useState, useRef } from 'react';
import { Canvas, useRender } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

const Box = () => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const props = useSpring({
    scale: isActive ? [1.5, 1.5, 1.5] : [1,1,1],
    color: isHovered ? 'hotpink' : 'gray'
  })

  useRender(() => {
    meshRef.current.rotation.y += 0.01;
  })

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      scale={props.scale}
    >
      <boxBufferGeometry attach='geometry' args={[1,1,1]} />
      <a.meshBasicMaterial attach='material' color={props.color} />
    </a.mesh>
  )
}

export default function App() {
  return (
    <>
      <Canvas>
        <Box />
      </Canvas>
    </>
  )
}
