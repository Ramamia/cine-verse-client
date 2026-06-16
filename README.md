# Cineverse Frontend

Cineverse is an immersive, interactive 3D web application designed as a "Cinematic Museum." Built using React, Vite, and Three.js, it translates traditional flat interfaces into a dynamic 3D experience where users can navigate customized themed rooms, customize 3D avatars, select their top movies, and interact with a social movie-review feed.

---

## Table of Contents
1. [Architecture & Technology Stack](#architecture--technology-stack)
2. [Folder Structure](#folder-structure)
3. [Prerequisites & Installation](#prerequisites--installation)
4. [Environment Configuration](#environment-configuration)
5. [Key Components & Features](#key-components--features)

---

## Architecture & Technology Stack

- **Build Tool & Dev Server:** Vite
- **UI Framework:** React (with dynamic hooks & contexts)
- **3D Graphics Engine:** Three.js via `@react-three/fiber` and `@react-three/drei`
- **Styling:** Custom CSS + CSS Modules
- **State Management:** React Context (for global authentication & configuration)
- **API Client:** Axios / Fetch (communicates with the Express & PostgreSQL backend)

---

## Folder Structure

```
cine-verse-WebApp/
├── public/                 # Static assets (3D GLTF models, icons)
├── src/
│   ├── assets/             # Images and design assets
│   ├── components/         # Reusable UI components (buttons, panels, 3D scenes)
│   │   ├── canvas/         # Three.js 3D canvas components (Room, Avatar, Lights)
│   │   └── ui/             # Standard HTML/CSS components (Social Feed, Profile Panel)
│   ├── contexts/           # Global React Contexts (AuthContext, AppContext)
│   ├── data/               # Static frontend configuration data
│   ├── pages/              # Primary page views (Lobby, CineRoom, Auth)
│   ├── services/           # API integration methods (calls to the backend API server)
│   ├── styles/             # Global themes, CSS variables, and overrides
│   ├── App.jsx             # Main routing and page transition manager
│   └── main.jsx            # React application entry point
```

---

## Prerequisites & Installation

Ensure you have the following installed on your machine:
- Node.js (v18.x or higher recommended)
- npm or yarn

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd cine-verse-WebApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Environment Configuration

Create a `.env` file in the root directory to point the frontend to the correct backend API server:

```env
# URL of the Express API backend
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## Key Components & Features

1. **3D Interactive Lobby:** A cinema lobby utilizing OrbitControls to let users pan around, view detailed posters, and select movie rooms.
2. **Avatar Customizer:** An interactive panel where users customize their avatar's appearance (skins, accessories) stored dynamically in the backend.
3. **CineSocial Feed:** A responsive feed displaying global user reviews, rating systems, and real-time user-to-user follow/unfollow updates.
4. **Themed Rooms:** Custom 3D rooms (Sci-Fi, Rom-Com, Horror) styled with dynamic lighting, custom background colors, and active movie shelves.
