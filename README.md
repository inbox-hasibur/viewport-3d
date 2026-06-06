# 🧊 Viewport 3D - Interactive 3D Scene Builder

📍 **Live Demo:** [https://viewport-3d.vercel.app](https://viewport-3d.vercel.app/https://viewport-3d.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js) ![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-3D-blue?style=for-the-badge&logo=react) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

Viewport 3D is a modern, interactive web application that allows users to create, manipulate, and save custom 3D environments directly in their browser. Built with Next.js and React Three Fiber, it provides a seamless and optimized 3D building experience.

---

## ✨ Key Features

### 🎮 Interactive 3D Canvas
*   **Dynamic Object Spawning:** Easily add basic shapes (Cubes, Spheres) and custom 3D models (.glb/.gltf) to the scene.
*   **Drag & Drop:** Intuitively move objects around the 3D space using mouse controls.
*   **Visual Feedback:** Real-time visual effects (emissive glow) when hovering and dragging objects for better UX.

### 💾 Persistent Scenes
*   **Database Integration:** Save your custom 3D scene layouts to MongoDB.
*   **Auto-Load:** Your saved environment automatically loads the next time you log in to your dashboard.
*   **Real-time Save Status:** Visual indicators to confirm successful data sync.

### 🔒 Secure Authentication
*   **NextAuth.js:** Secure login and signup system to protect user data and ensure each user has their own personal 3D workspace.

---

## 🛠️ Tech Stack

*   **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/)
*   **3D Rendering:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
*   **Backend/Database:** API Routes (Next.js), [MongoDB Atlas](https://www.mongodb.com/atlas) with Mongoose
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Credentials Provider)
*   **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine. You will also need a MongoDB Atlas connection string.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/viewport-3d.git
   cd viewport-3d
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_super_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.
