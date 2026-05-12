import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, MeshReflectorMaterial, Environment, OrbitControls } from '@react-three/drei';

// Pages (full-screen scenes)
import Entrance        from './pages/Entrance';
import CharacterCreator from './pages/CharacterCreator';
import GrandRotunda    from './pages/GrandRotunda';
import LoadingScreen   from './pages/LoadingScreen';

// UI components
import Header          from './components/ui/Header';
import AuthModal       from './components/ui/AuthModal';
import CustomizePanel  from './components/ui/CustomizePanel';
import SearchBar       from './components/ui/SearchBar';
import CineSocialFeed  from './components/ui/CineSocialFeed';

// Styles
import { roomSettings } from './styles/theme';
import {
  searchWrapper, searchGlassContainer, filterBar, filterTab,
  searchField, searchAccent,
  sidePanelStyle, panelHeader, feedItem, userRow, ratingStyle, commentStyle,
  customizeHeader, titleStyle,
  genreUI, backBtn, genreTitle,
} from './styles/hubStyles';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const GENRE_COLORS = {
  'ROM-COM': '#ff69b4',
  'HORROR':  '#433636',
  'SCI-FI':  '#00d4ff',
};
const getGenreColor = (genre) => GENRE_COLORS[genre] ?? '#760707';

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [step,          setStep]          = useState('entrance');
  const [isLoading,     setIsLoading]     = useState(false);
  const [activeGenre,   setActiveGenre]   = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [config,        setConfig]        = useState({ acc: null, hair: null, skin: '#ffdbac' });

  const enterGenrePortal = (genreId) => {
    setIsLoading(true);
    setActiveGenre(genreId);
    setTimeout(() => {
      setIsLoading(false);
      setStep('genrePage');
    }, 10000);
  };

  const handleSearch = (val) => console.log('Searching TMDB for:', val);

  const currentSettings = roomSettings[step] ?? roomSettings.hub;

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#000' }}>

      {/* ── UI LAYER (outside Canvas) ─────────────────────────────────────── */}

      {isLoading && <LoadingScreen genre={activeGenre} />}

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
          </div>
          <CustomizePanel config={config} setConfig={setConfig} onFinish={() => setStep('hub')} />
        </>
      )}

      {step === 'hub' && (
  <>
    <CineSocialFeed />
    <SearchBar onSearch={handleSearch} />
  </>
)}

      {step === 'genrePage' && (
        <div style={genreUI}>
          <button onClick={() => setStep('hub')} style={backBtn}>← BACK TO ROTUNDA</button>
          <h1 style={genreTitle}>{activeGenre?.toUpperCase()} VAULT</h1>
        </div>
      )}

      {/* ── 3D LAYER ──────────────────────────────────────────────────────── */}

      <Canvas shadows camera={{ position: currentSettings.camPos, fov: 50 }}>
        <color attach="background" args={[currentSettings.bg]} />
        <fog attach="fog" args={[currentSettings.bg, currentSettings.fogNear, currentSettings.fogFar]} />

        {step === 'entrance' && (
          <OrbitControls
            enablePan={false} enableZoom={false} enableRotate
            minDistance={180} maxDistance={200}
            target={[-2, 10, 5]}
            minAzimuthAngle={-Math.PI / 16} maxAzimuthAngle={Math.PI / 16}
            minPolarAngle={Math.PI / 2.5}   maxPolarAngle={Math.PI / 2.1}
          />
        )}
        {step === 'hub' && (
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.5}
            minDistance={10} maxDistance={16}
            target={[3.5, 4, 2]}
            enableRotate
            minAzimuthAngle={-Math.PI / 12} maxAzimuthAngle={Math.PI / 12}
          />
        )}

        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <spotLight
            position={[0, 10, 0]}
            intensity={step === 'hub' ? 30 : 20}
            angle={0.5}
            penumbra={1}
            castShadow
          />

          {step === 'entrance'  && <Entrance />}
          {step === 'customize' && <CharacterCreator config={config} />}
          {step === 'hub'       && <GrandRotunda config={config} enterGenrePortal={enterGenrePortal} />}

          {/* Reflective floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              color={step === 'hub' ? '#696666' : '#312b2b'}
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

export default App;
