# Backlog

Sprint 1: Project Initialization & Authentication (Base Setup)
Goal: Project setup, database connection, and user login/signup system creation.
Tasks:
- Create Next.js (App Router) + Tailwind CSS project using create-next-app.
- Connect with MongoDB Atlas using Mongoose.
- Create User Model (Schema).
- Create UI for Login and Signup.
- Implement user tracking system with NextAuth.js or basic JWT/Session.

Sprint 2: 3D Scene Setup & Dashboard UI Shell
Goal: Create user dashboard after login and set up an empty 3D room/environment.
Tasks:
- Install @react-three/fiber and @react-three/drei.
- Create a 3D Canvas (with lighting, a floor/grid).
- Build UI Overlay at the top of the screen with "Add Objects" and "Save" buttons.
- Create the UI for the dialog box (Popup) that appears when clicking "Add Objects" (containing radio buttons for Cube, Sphere, Custom Model).

Sprint 3: Dynamic Object Spawning (Core 3D Logic)
Goal: Add objects selected from the dialog box to random positions in the 3D space.
Tasks:
- Create a global State (e.g., useState or Zustand) to hold the list of objects.
- Push new object to State when clicking "Add" button (with x, y, z positions generated via Math.random()).
- Map from State to render Cube and Sphere on the 3D Canvas.
- Download a free .glb/.gltf model from the internet and render it using the useGLTF hook.

Sprint 4: Interaction - Drag, Drop & Visual Feedback
Goal: Move objects by dragging with the mouse and provide visual feedback.
Tasks:
- Implement drag and drop system for objects using <DragControls> from @react-three/drei.
- Update the object's new position (x, y, z) in State after drag ends (onDragEnd).
- (Nice to have feature): Apply visual effects during dragging (change color/texture/emissive) and return to normal when released, without scaling to prevent alignment issues.

Sprint 5: Database Integration (Save & Load Data)
Goal: Save the arranged 3D scene to the database and reload it upon login.
Tasks:
- Create a new collection/schema in MongoDB named Scene or SavedObject.
- Push the entire Array from State to the database via API when clicking the "Save" button.
- Fetch the user's saved data from API using useEffect when entering the dashboard after login, and set it to State (so the scene loads).

Sprint 6: Polish & Deployment (Final)
Goal: Project finishing, minor bug fixes, and going live.
Tasks:
- Improve User Experience (UX) and add loading states (Loading spinners).
- Refactor and clean up the entire code.
- Deploy the project live on Vercel or any other free hosting.
