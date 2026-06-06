import Link from "next/link";
import { Box } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans text-center min-h-screen relative">
      <main className="flex flex-col items-center justify-center max-w-3xl px-6 w-full z-10">
        <div className="mb-8 p-4 bg-zinc-50 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center">
          <Box className="w-12 h-12 text-black" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-900 mb-6">
          Build Your <br className="hidden sm:block" />
          <span className="text-zinc-600">3D Viewport</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mb-12 leading-relaxed">
          A minimalist 3D workspace where you can spawn objects, interact with
          them in real-time, and save your scenes to the cloud.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/login"
            className="flex items-center justify-center w-full sm:w-40 h-12 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="flex items-center justify-center w-full sm:w-40 h-12 bg-white text-black border border-zinc-200 rounded-xl font-medium hover:bg-zinc-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-4 sm:gap-8 text-sm text-zinc-400 font-medium px-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
          Next.js App Router
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
          Three.js & R3F
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
          MongoDB Atlas
        </div>
      </footer>
    </div>
  );
}

