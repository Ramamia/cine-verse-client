import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, MeshReflectorMaterial, Environment } from '@react-three/drei';
import Entrance from './pages/Entrance';
import CharacterCreator from './pages/CharacterCreator';
import GrandRotunda from './pages/GrandRotunda'; 
import AuthModal from './components/ui/AuthModal';
import Header from './components/ui/Header';
import CustomizePanel from './components/ui/CustomizePanel.jsx';

function App() {
  const [step, setStep] = useState('entrance'); 
  const [config, setConfig] = useState({ 
    acc: null, 
    hair: null, 
    skin: '#ffdbac' 
  });

  const handleSearch = (val) => {
    console.log("Searching TMDB for:", val);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#000' }}>
      
      {/* UI LAYER */}
      {step === 'entrance' && (
        <>
          <Header />
          <AuthModal onLogin={() => setStep('customize')} />
        </>
      )}

      {step === 'customize' && (
        <>
          <div style={customizeHeader}>
            <h1 style={titleStyle}>DESIGN YOUR IDENTITY</h1>
            <p style={subtitleStyle}>Fine-tuning your presence for the Cine-Verse experience.</p>
          </div>
          <CustomizePanel 
            config={config} 
            setConfig={setConfig} 
            onFinish={() => setStep('hub')} 
          />
        </>
      )}

      {step === 'hub' && (
        <>
          <div style={hubOverlay}>
            <h2 style={hubTitle}>SELECT GENRE</h2>
          </div>

          <div style={sidePanelStyle}>
            <h4 style={panelHeader}>COMMUNITY FEED</h4>
            <div style={feedItem}><b>Joudeh</b> just watched <i>Scream 6</i></div>
            <div style={feedItem}><b>Lilia</b> added <i>Interstellar</i> to Vault</div>
            <div style={feedItem}><b>Abdelrahman</b> is in SCI-FI lobby</div>
          </div>

          <div style={searchContainer}>
            <input 
              type="text" 
              placeholder="SEARCH THE CINE-VERSE (TMDB)..." 
              style={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div style={searchGlow} />
          </div>
        </>
      )}
      
      {/* 3D LAYER */}
      <Canvas shadows camera={{ position: [2, 7, 13], fov: 80 }}>
        <color attach="background" args={['#160101']} />
        <fog attach="fog" args={['#160101', 5, 25]} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 5, -2]} color="#ff2222" intensity={10} />
          <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={5} color="#ffffff" castShadow />

          {step === 'entrance' && <Entrance />}
          {step === 'customize' && <CharacterCreator config={config} />}
          {step === 'hub' && <GrandRotunda config={config} />}

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#150202"
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
const titleStyle = { color: '#fff', fontSize: '2.4rem', letterSpacing: '10px', margin: 0, fontWeight: '900', textShadow: '0 0 20px rgba(118, 7, 7, 0.5)' };
const subtitleStyle = { color: '#888', letterSpacing: '3px', fontSize: '0.8rem', marginTop: '10px', textTransform: 'uppercase', fontWeight: 'bold' };
const hubOverlay = { position: 'absolute', top: '10%', width: '100%', textAlign: 'center', zIndex: 10, pointerEvents: 'none' };
const hubTitle = { color: '#fff', fontSize: '1.5rem', letterSpacing: '15px', fontWeight: 'bold' };

const searchContainer = { position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: '400px' };
const searchInput = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(118, 7, 7, 0.5)', padding: '15px 25px', color: '#fff', letterSpacing: '2px', outline: 'none', backdropFilter: 'blur(10px)', textTransform: 'uppercase', fontSize: '0.8rem' };
const searchGlow = { width: '100%', height: '1px', background: '#760707', boxShadow: '0 0 15px #760707', marginTop: '2px' };

const sidePanelStyle = { position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)', width: '260px', background: 'rgba(0,0,0,0.6)', padding: '25px', borderRadius: '4px', borderLeft: '2px solid #760707', zIndex: 100 };
const panelHeader = { color: '#760707', letterSpacing: '4px', marginBottom: '20px', fontSize: '0.9rem' };
const feedItem = { color: '#ccc', fontSize: '0.75rem', marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '10px' };

export default App;