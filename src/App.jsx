import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, MeshReflectorMaterial, Environment } from '@react-three/drei';
import Entrance from './pages/Entrance';
import CharacterCreator from './pages/CharacterCreator'; // Import the new page
import AuthModal from './components/ui/AuthModal';
import Header from './components/ui/Header';
import CustomizePanel from './components/ui/CustomizePanel.jsx'; // Import the new UI

function App() {
  const [step, setStep] = useState('entrance'); // 'entrance' or 'customize'

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      
      {/* Step 1: Entrance UI */}
      {step === 'entrance' && (
        <>
          <Header />
          <AuthModal onLogin={() => setStep('customize')} />
        </>
      )}

      {/* Step 2: Customization UI */}
      {step === 'customize' && (
        <>
          <div style={customizeHeader}>
            <h1 style={titleStyle}>DESIGN YOUR IDENTITY</h1>
            <p style={subtitleStyle}>Fine-tuning your presence for the Cine-Verse experience.</p>
          </div>
          <CustomizePanel onFinish={() => console.log("Next Step")} />
        </>
      )}
      
      <Canvas 
        shadows={{ type: 'basic' }}
        camera={{ position: [2, 7, 13], fov: 80 }}
      >
        <color attach="background" args={['#4d0a0a']} />
        <fog attach="fog" args={['#4d0a0a', 3, 30]} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          
          {/* Keep your exact lighting from the old code */}
          <pointLight position={[0, 5, -2]} color="#ff2222" intensity={20} />
          <spotLight position={[0, 10, 5]} angle={0.4} penumbra={1} intensity={10} color="#ffffff" castShadow />

          {/* Switch scenes based on state */}
          {step === 'entrance' ? <Entrance /> : <CharacterCreator />}

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
      <Loader />
    </div>
  );
}

const customizeHeader = { position: 'absolute', top: '50px', left: '60px', zIndex: 10, pointerEvents: 'none' };
const titleStyle = { color: '#fff', fontSize: '2.4rem', letterSpacing: '10px', margin: 0, fontWeight: '900' };
const subtitleStyle = { color: '#160101', letterSpacing: '3px', fontSize: '0.9rem', marginTop: '10px', textTransform: 'uppercase', fontWeight: 'bold', textShadow: '0 0 5px rgba(59, 3, 3, 0.8)' };

export default App;