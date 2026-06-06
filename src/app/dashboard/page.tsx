'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Scene, { SceneObject } from '@/components/Scene';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'cube' | 'sphere' | 'custom1' | 'custom2'>('cube');
  
  // State to hold all 3D objects in the scene
  const [objects, setObjects] = useState<SceneObject[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  const handleAddObject = () => {
    // Generate random position between -3 and 3 for x and z, and drop from y=3
    const randomX = (Math.random() - 0.5) * 6;
    const randomZ = (Math.random() - 0.5) * 6;
    
    const newObject: SceneObject = {
      id: Math.random().toString(36).substring(2, 9),
      type: selectedType,
      position: [randomX, 2, randomZ], // y=2 so it spawns slightly above the ground
    };

    setObjects((prev) => [...prev, newObject]);
    setIsDialogOpen(false);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <button 
          className="px-6 py-2.5 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg border-2 border-black pointer-events-auto flex items-center gap-2"
          onClick={() => console.log('Saving scene...', objects)}
        >
          Save
          <span className="text-xl leading-none">›</span>
        </button>

        <div className="relative pointer-events-auto">
          <button 
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="px-6 py-2.5 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg border-2 border-black flex items-center gap-2"
          >
            <span className="text-xl leading-none">‹</span>
            Add Object
          </button>

          {/* Add Object Dialog */}
          {isDialogOpen && (
            <div className="absolute top-14 right-0 mt-2 bg-white p-6 rounded-3xl shadow-xl w-64 border-2 border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-black">Add Object</h3>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="objectType" 
                    value="cube" 
                    checked={selectedType === 'cube'}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-5 h-5 text-black focus:ring-black accent-black"
                  />
                  <span className="text-black font-medium">Cube</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="objectType" 
                    value="sphere" 
                    checked={selectedType === 'sphere'}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-5 h-5 text-black focus:ring-black accent-black"
                  />
                  <span className="text-black font-medium">Sphere</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="objectType" 
                    value="custom1" 
                    checked={selectedType === 'custom1'}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-5 h-5 text-black focus:ring-black accent-black"
                  />
                  <span className="text-black font-medium">Duck</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="objectType" 
                    value="custom2" 
                    checked={selectedType === 'custom2'}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-5 h-5 text-black focus:ring-black accent-black"
                  />
                  <span className="text-black font-medium">Avocado</span>
                </label>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={handleAddObject}
                  className="px-8 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 w-3/4"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Left Logo/Title */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
        <h1 className="text-white text-2xl font-bold tracking-tight">
          3D Viewport
        </h1>
      </div>

      {/* 3D Canvas */}
      <div className="h-full w-full bg-[#2a2a2a]">
        <Scene objects={objects} />
      </div>
    </div>
  );
}
