import React, { useState, Suspense } from 'react';
import { Canvas, useFrame} from '@react-three/fiber';
import { Loader, MeshReflectorMaterial, Environment, OrbitControls } from '@react-three/drei';

// Pages (full-screen scenes)
import Entrance        from './pages/Entrance';
import GrandRotunda    from './pages/GrandRotunda';
import CharacterCreator from './pages/CharacterCreator';
import HorrorRoom, { MOVIES as horrorMovies } from './pages/HorrorRoom';
import RomComRoom, { ROMCOM_MOVIES as romcomMovies } from './pages/RomComRoom';
import ScifiRoom, { SCIFI_MOVIES as scifiMovies } from './pages/ScifiRoom';
import LoadingScreen   from './pages/LoadingScreen';

// UI components
import Header          from './components/ui/Header';
import AuthModal       from './components/ui/AuthModal';
import CustomizePanel  from './components/ui/CustomizePanel';
import SearchBar       from './components/ui/SearchBar';
import CineSocialFeed  from './components/ui/CineSocialFeed';
import ProfilePopup    from './components/ui/ProfilePopup';
import MovieDetailPopup from './components/ui/MovieDetailPopup';

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

// Entrance zoom-out camera animation component
function EntranceCamera() {
  const initialized = React.useRef(false);
  useFrame((state) => {
    if (!initialized.current) {
      state.camera.position.set(2, 7, 7); // Start zoomed-in closer
      initialized.current = true;
    }
    // Smoothly zoom out to target position [2, 7, 13]
    state.camera.position.x += (2 - state.camera.position.x) * 0.025;
    state.camera.position.y += (7 - state.camera.position.y) * 0.025;
    state.camera.position.z += (13 - state.camera.position.z) * 0.025;
  });
  return null;
}


// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [step,          setStep]          = useState('entrance');
  const [activeGenre,   setActiveGenre]   = useState(null);
  const [isLoading,     setIsLoading]     = useState(false);
  const [searchError,   setSearchError]   = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [config,        setConfig]        = useState({ acc: null, hair: null, skin: '#ffdbac' });
  const [user,          setUser]          = useState({
    nickname: '',
    email: '',
    bio: '',
    topMovies: [],
    following: [],
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [feedItems,     setFeedItems]     = useState([
    { user: 'Lara',  rating: '★ 4',   comment: '"The twist in Scream 6 blew my mind!"' },
    { user: 'Fahed', rating: '★ 2.9', comment: '"I can\'t believe the ending of that movie it sucks"' },
    { user: 'Lilia', rating: '★ 4.5', comment: '"minecraft movie was AMAZINGG"' },
  ]);

  const enterGenrePortal = (genreId) => {
    setIsLoading(true);
    setActiveGenre(genreId);
    setTimeout(() => {
      setIsLoading(false);
      setStep('genrePage');
    }, 2500); // Snappy loading screen response
  };

  const handleSearch = (val, genreFilter) => {
    if (!val || !val.trim()) return;
    const query = val.toLowerCase();
    const allMovies = [
      ...horrorMovies.map(m => ({ ...m, genreId: 'horror' })),
      ...romcomMovies.map(m => ({ ...m, genreId: 'romcom' })),
      ...scifiMovies.map(m => ({ ...m, genreId: 'scifi' })),
    ];
    
    let filtered = allMovies;
    if (genreFilter === 'HORROR') filtered = filtered.filter(m => m.genreId === 'horror');
    else if (genreFilter === 'ROM-COM') filtered = filtered.filter(m => m.genreId === 'romcom');
    else if (genreFilter === 'SCI-FI') filtered = filtered.filter(m => m.genreId === 'scifi');

    const found = filtered.find(m => m.title.toLowerCase().includes(query));
    if (found) {
      setSearchError(null);
      enterGenrePortal(found.genreId);
      setTimeout(() => setSelectedMovie(found), 2500);
    } else {
      setSearchError("THIS MOVIE DOESN'T EXIST YET! COMING SOON.");
    }
  };

  const currentSettings = step === 'genrePage' 
    ? (activeGenre === 'romcom' ? roomSettings.romcomPage : activeGenre === 'scifi' ? roomSettings.scifiPage : roomSettings.genrePage)
    : (roomSettings[step] ?? roomSettings.hub);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#000' }}>

      {/* ── UI LAYER (outside Canvas) ─────────────────────────────────────── */}

      {isLoading && <LoadingScreen genre={activeGenre} />}

      {step === 'entrance' && (
        <>
          <Header />
          <AuthModal onLogin={({ email }) => {
            setUser(prev => ({ ...prev, email }));
            setStep('customize');
          }} />
        </>
      )}

      {step === 'customize' && (
        <>
          <div style={customizeHeader}>
            <h1 style={titleStyle}>DESIGN YOUR IDENTITY</h1>
          </div>
          <CustomizePanel 
            config={config} 
            setConfig={setConfig} 
            user={user} 
            setUser={setUser} 
            onFinish={() => setStep('hub')} 
          />
        </>
      )}

      {step === 'hub' && (
        <>
          <CineSocialFeed 
            feedItems={feedItems}
            following={user.following} 
            onToggleFollow={(username) => {
              setUser(prev => {
                const isFollowing = prev.following.includes(username);
                return {
                  ...prev,
                  following: isFollowing
                    ? prev.following.filter(f => f !== username)
                    : [...prev.following, username],
                };
              });
            }} 
          />
          <SearchBar onSearch={handleSearch} />
          
          {/* Floating Profile Button */}
          <button 
            onClick={() => setIsProfileOpen(true)} 
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              zIndex: 100,
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid #760707',
              color: '#fff',
              padding: '12px 24px',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '2px',
              backdropFilter: 'blur(10px)',
              borderRadius: '4px',
              boxShadow: '0 0 15px rgba(118, 7, 7, 0.3)',
              fontFamily: 'monospace',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#760707';
              e.currentTarget.style.boxShadow = '0 0 25px #760707';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(118, 7, 7, 0.3)';
            }}
          >
            MY PROFILE
          </button>
        </>
      )}

      {step === 'genrePage' && (
        <>
          <CineSocialFeed 
            feedItems={feedItems}
            following={user.following} 
            onToggleFollow={(username) => {
              setUser(prev => {
                const isFollowing = prev.following.includes(username);
                return {
                  ...prev,
                  following: isFollowing
                    ? prev.following.filter(f => f !== username)
                    : [...prev.following, username],
                };
              });
            }} 
          />
          
          <div style={genreUI}>
            <button onClick={() => setStep('hub')} style={backBtn}>← BACK TO ROTUNDA</button>
            <h1 style={genreTitle}>{activeGenre?.toUpperCase()} VAULT</h1>
          </div>

          {/* Floating Profile Button */}
          <button 
            onClick={() => setIsProfileOpen(true)} 
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              zIndex: 100,
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid #760707',
              color: '#fff',
              padding: '12px 24px',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '2px',
              backdropFilter: 'blur(10px)',
              borderRadius: '4px',
              boxShadow: '0 0 15px rgba(118, 7, 7, 0.3)',
              fontFamily: 'monospace',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#760707';
              e.currentTarget.style.boxShadow = '0 0 25px #760707';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(118, 7, 7, 0.3)';
            }}
          >
            MY PROFILE
          </button>
        </>
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
        {step === 'customize' && (
          <OrbitControls
            enablePan={false} enableZoom={true} enableRotate
            minDistance={1} maxDistance={10}
            target={[-0.3, 2.67, 5.6]}
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
          {/* Spooky Room uses custom local lighting, so we turn off main ambient/spots in the Horror Vault */}
          {!(step === 'genrePage' && activeGenre === 'horror') && <ambientLight intensity={0.4} />}
          {!(step === 'genrePage' && activeGenre === 'horror') && (
            <spotLight
              position={[0, 10, 0]}
              intensity={step === 'hub' ? 30 : 20}
              angle={0.5}
              penumbra={1}
              castShadow
            />
          )}

          {step === 'entrance'  && (
            <>
              <EntranceCamera />
              <Entrance />
            </>
          )}
          {step === 'customize' && <CharacterCreator config={config} />}
          {step === 'hub'       && <GrandRotunda config={config} enterGenrePortal={enterGenrePortal} />}
          {step === 'genrePage' && activeGenre === 'horror' && (
            <HorrorRoom onSelectMovie={setSelectedMovie} />
          )}
          {step === 'genrePage' && activeGenre === 'romcom' && (
            <RomComRoom onSelectMovie={setSelectedMovie} />
          )}
          {step === 'genrePage' && activeGenre === 'scifi' && (
            <ScifiRoom onSelectMovie={setSelectedMovie} />
          )}

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

      {/* Global Overlays */}
      {isProfileOpen && (
        <ProfilePopup 
          user={user} 
          config={config} 
          setUser={setUser} 
          onClose={() => setIsProfileOpen(false)} 
          onEditAvatar={() => {
            setIsProfileOpen(false);
            setStep('customize');
          }}
        />
      )}

      {selectedMovie && (
        <MovieDetailPopup
          movie={selectedMovie}
          user={user}
          setUser={setUser}
          onClose={() => setSelectedMovie(null)}
          onAddReview={(newReview) => {
            setFeedItems(prev => [newReview, ...prev]);
          }}
          followedFriends={user.following}
          genre={activeGenre}
        />
      )}

      {searchError && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(5px)',
        }}>
          <div style={{
            background: '#111',
            border: '2px solid #760707',
            padding: '40px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 0 30px rgba(118, 7, 7, 0.5)',
            maxWidth: '400px',
          }}>
            <h2 style={{ color: '#ff4444', letterSpacing: '3px', margin: '0 0 20px 0', fontFamily: 'monospace' }}>
              ACCESS DENIED
            </h2>
            <p style={{ color: '#fff', opacity: 0.8, letterSpacing: '1px', marginBottom: '30px' }}>
              {searchError}
            </p>
            <button
              onClick={() => setSearchError(null)}
              style={{
                background: '#760707',
                color: '#fff',
                border: 'none',
                padding: '10px 30px',
                cursor: 'pointer',
                fontWeight: 'bold',
                letterSpacing: '2px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px #760707'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              DISMISS
            </button>
          </div>
        </div>
      )}

      <Loader />
    </div>
  );
}

export default App;
