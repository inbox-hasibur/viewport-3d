'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// Type definition for our 3D objects
export type SceneObject = {
  id: string;
  type: 'cube' | 'sphere' | 'custom1' | 'custom2';
  position: [number, number, number];
};

// Component for Custom Model 1 (Duck)
const CustomModel1 = ({ position }: { position: [number, number, number] }) => {
  const { scene } = useGLTF('/models/custom1.glb');
  return <primitive object={scene.clone()} position={position} scale={0.5} castShadow />;
};

// Component for Custom Model 2 (Avocado)
const CustomModel2 = ({ position }: { position: [number, number, number] }) => {
  const { scene } = useGLTF('/models/custom2.glb');
  return <primitive object={scene.clone()} position={position} scale={15} castShadow />;
};

// Preload models for better performance
useGLTF.preload('/models/custom1.glb');
useGLTF.preload('/models/custom2.glb');

// Component to render individual objects
const ObjectRenderer = ({ obj }: { obj: SceneObject }) => {
  if (obj.type === 'cube') {
    return (
      <mesh position={obj.position} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    );
  }

  if (obj.type === 'sphere') {
    return (
      <mesh position={obj.position} castShadow receiveShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    );
  }

  if (obj.type === 'custom1') {
    return <CustomModel1 position={obj.position} />;
  }

  if (obj.type === 'custom2') {
    return <CustomModel2 position={obj.position} />;
  }

  return null;
};

export default function Scene({ objects = [] }: { objects?: SceneObject[] }) {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
      <color attach="background" args={['#1a1a1a']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      <Environment preset="city" />
      
      {/* Render all objects from state inside Suspense for loading models */}
      <Suspense fallback={null}>
        {objects.map((obj) => (
          <ObjectRenderer key={obj.id} obj={obj} />
        ))}
      </Suspense>
      
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        sectionColor="#444" 
        cellColor="#222" 
        position={[0, -0.5, 0]} 
        receiveShadow
      />

      <OrbitControls makeDefault />
    </Canvas>
  );
}
