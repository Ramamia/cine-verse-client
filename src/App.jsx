import React, {useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, MeshReflectorMaterial, Environment } from '@react-three/drei';
import Entrance from './pages/Entrance';
import AuthModal from './components/ui/AuthModal';
import Header from './components/ui/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>

{!isLoggedIn && (
        <>
          <Header />
          <AuthModal onLogin={() => setIsLoggedIn(true)} />
        </>
      )}
      
<Canvas 
  shadows={{ type: 'basic' }} // or 'percentage' - this replaces the deprecated PCFSoft
  camera={{ position: [2, 7, 13], fov: 80 }}
>
        <color attach="background" args={['#4d0a0a']} />
        <fog attach="fog" args={['#4d0a0a', 3, 30]} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          
          {/* Targeted Lighting for the Booth */}
          <pointLight position={[0, 5, -2]} color="#ff2222" intensity={20} />
          <spotLight 
            position={[0, 10, 5]} 
            angle={0.4} 
            penumbra={1} 
            intensity={10} 
            color="#ffffff" 
            castShadow 
          />

          <Entrance />

          {/* High-End Reflective Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={50}
              roughness={1}
              depthScale={1.2}
              color="#2a0505"
              metalness={0.5}
            />
          </mesh>

          <Environment preset="night" />
        </Suspense>
      </Canvas>
      
      {/* Percentage Loader - helps track if model is actually downloading */}
      <Loader />
    </div>
  );
}

export default App;