'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Scene from '@/components/Scene';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('cube');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  const handleAddObject = () => {
    // In Sprint 3, we will add the object to state here.
    console.log('Adding object:', selectedType);
    setIsDialogOpen(false);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="text-white font-bold text-xl pointer-events-auto">
          3D Viewport
        </div>
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors shadow-lg"
          >
            Add Objects
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-lg"
            onClick={() => console.log('Saving scene...')}
          >
            Save
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-full w-full">
        <Scene />
      </div>

      {/* Add Object Dialog */}
      {isDialogOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 max-w-[90%]">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Add Object</h3>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="objectType" 
                  value="cube" 
                  checked={selectedType === 'cube'}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-4 h-4 text-black focus:ring-black"
                />
                <span className="text-gray-700">Cube</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="objectType" 
                  value="sphere" 
                  checked={selectedType === 'sphere'}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-4 h-4 text-black focus:ring-black"
                />
                <span className="text-gray-700">Sphere</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="objectType" 
                  value="custom" 
                  checked={selectedType === 'custom'}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-4 h-4 text-black focus:ring-black"
                />
                <span className="text-gray-700">Custom Model</span>
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddObject}
                className="px-4 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
