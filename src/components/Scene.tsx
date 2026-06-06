'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, useGLTF, DragControls } from '@react-three/drei';
import { Suspense, useState, useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// Type definition for our 3D objects
export type SceneObject = {
  id: string;
  type: 'cube' | 'sphere' | 'custom1' | 'custom2';
  position: [number, number, number];
};

// Component for Custom Model 1 (Duck)
const CustomModel1 = ({ isDragged, isHovered }: { isDragged: boolean, isHovered: boolean }) => {
  const { scene } = useGLTF('/models/custom1.glb');
  const clone = useMemo(() => scene.clone(true), [scene]);
  
  useEffect(() => {
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // Clone material once per instance to avoid sharing between multiple objects
        if (!mesh.userData.hasClonedMaterial) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map(m => m.clone());
          } else {
            mesh.material = mesh.material.clone();
          }
          mesh.userData.hasClonedMaterial = true;
        }

        const applyEffect = (mat: THREE.Material) => {
          const standardMat = mat as THREE.MeshStandardMaterial;
          if (isDragged) {
            standardMat.emissive = new THREE.Color("#888888");
            standardMat.emissiveIntensity = 1.0; // increased visual effect
          } else if (isHovered) {
            standardMat.emissive = new THREE.Color("#444444");
            standardMat.emissiveIntensity = 0.5;
          } else {
            standardMat.emissive = new THREE.Color("#000000");
            standardMat.emissiveIntensity = 0;
          }
        };

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(applyEffect);
        } else {
          applyEffect(mesh.material);
        }
      }
    });
  }, [clone, isDragged, isHovered]);
  
  return <primitive object={clone} scale={0.5} castShadow />;
};

// Component for Custom Model 2 (Avocado)
const CustomModel2 = ({ isDragged, isHovered }: { isDragged: boolean, isHovered: boolean }) => {
  const { scene } = useGLTF('/models/custom2.glb');
  const clone = useMemo(() => scene.clone(true), [scene]);
  
  useEffect(() => {
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        if (!mesh.userData.hasClonedMaterial) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map(m => m.clone());
          } else {
            mesh.material = mesh.material.clone();
          }
          mesh.userData.hasClonedMaterial = true;
        }

        const applyEffect = (mat: THREE.Material) => {
          const standardMat = mat as THREE.MeshStandardMaterial;
          if (isDragged) {
            standardMat.emissive = new THREE.Color("#888888");
            standardMat.emissiveIntensity = 1.0; // increased visual effect
          } else if (isHovered) {
            standardMat.emissive = new THREE.Color("#444444");
            standardMat.emissiveIntensity = 0.5;
          } else {
            standardMat.emissive = new THREE.Color("#000000");
            standardMat.emissiveIntensity = 0;
          }
        };

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(applyEffect);
        } else {
          applyEffect(mesh.material);
        }
      }
    });
  }, [clone, isDragged, isHovered]);

  return <primitive object={clone} scale={15} castShadow />;
};

// Preload models for better performance
useGLTF.preload('/models/custom1.glb');
useGLTF.preload('/models/custom2.glb');

// Component to render individual objects
const ObjectRenderer = ({ obj, onUpdate }: { obj: SceneObject; onUpdate: (id: string, pos: [number, number, number]) => void }) => {
  const [hovered, setHovered] = useState(false);
  const [dragged, setDragged] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  // Visual feedback on hover and drag
  // Kept original size when dragged to prevent alignment issues
  const scaleMultiplier = dragged ? 1 : hovered ? 1.05 : 1;

  const renderContent = () => {
    if (obj.type === 'cube') {
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={dragged ? "#93c5fd" : (hovered ? "#60a5fa" : "#3b82f6")} 
            emissive={dragged ? "#3b82f6" : (hovered ? "#1e3a8a" : "#000000")}
            emissiveIntensity={dragged ? 0.5 : (hovered ? 0.2 : 0)}
          />
        </mesh>
      );
    }
    if (obj.type === 'sphere') {
      return (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial 
            color={dragged ? "#fca5a5" : (hovered ? "#f87171" : "#ef4444")} 
            emissive={dragged ? "#ef4444" : (hovered ? "#7f1d1d" : "#000000")}
            emissiveIntensity={dragged ? 0.5 : (hovered ? 0.2 : 0)}
          />
        </mesh>
      );
    }
    if (obj.type === 'custom1') return <CustomModel1 isDragged={dragged} isHovered={hovered} />;
    if (obj.type === 'custom2') return <CustomModel2 isDragged={dragged} isHovered={hovered} />;
    return null;
  };

  return (
    <DragControls
      onDragStart={() => {
        setDragged(true);
        document.body.style.cursor = 'grabbing';
      }}
      onDragEnd={() => {
        setDragged(false);
        document.body.style.cursor = hovered ? 'grab' : 'auto';
        if (groupRef.current) {
          const pos = groupRef.current.position;
          onUpdate(obj.id, [pos.x, pos.y, pos.z]);
        }
      }}
    >
      <group
        ref={groupRef}
        position={obj.position}
        scale={scaleMultiplier}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (!dragged) document.body.style.cursor = 'grab';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          if (!dragged) document.body.style.cursor = 'auto';
        }}
      >
        {renderContent()}
      </group>
    </DragControls>
  );
};

export default function Scene({ 
  objects = [], 
  onUpdateObject 
}: { 
  objects?: SceneObject[];
  onUpdateObject: (id: string, pos: [number, number, number]) => void;
}) {
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
          <ObjectRenderer key={obj.id} obj={obj} onUpdate={onUpdateObject} />
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
