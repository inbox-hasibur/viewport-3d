'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { useState } from 'react';

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <color attach="background" args={['#1a1a1a']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <Environment preset="city" />
      
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        sectionColor="#444" 
        cellColor="#222" 
        position={[0, -0.5, 0]} 
      />

      <OrbitControls makeDefault />
    </Canvas>
  );
}
