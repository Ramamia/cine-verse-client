import React, { useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame} from '@react-three/fiber';
import { Loader, MeshReflectorMaterial, Environment, OrbitControls } from '@react-three/drei';

// our big full-screen scenes
import Entrance        from './pages/Entrance';
import GrandRotunda    from './pages/GrandRotunda';
import CharacterCreator from './pages/CharacterCreator';
import HorrorRoom from './pages/HorrorRoom';
import RomComRoom from './pages/RomComRoom';
import ScifiRoom from './pages/ScifiRoom';
import { HORROR_MOVIES as horrorMovies, ROMCOM_MOVIES as romcomMovies, SCIFI_MOVIES as scifiMovies } from './data/movies';
import LoadingScreen   from './pages/LoadingScreen';

// ui stuff
import Header          from './components/ui/Header';
import AuthModal       from './components/ui/AuthModal';
import CustomizePanel  from './components/ui/CustomizePanel';
import SearchBar       from './components/ui/SearchBar';
import CineSocialFeed  from './components/ui/CineSocialFeed';
import ProfilePopup    from './components/ui/ProfilePopup';
import MovieDetailPopup from './components/ui/MovieDetailPopup';

// all the styles
import { roomSettings } from './styles/theme';
import {
  customizeHeader, titleStyle,
  genreUI, backBtn, genreTitle,
} from './styles/hubStyles';
import {
  appContainerStyle, globalAlertOverlayStyle, globalAlertBoxStyle,
  globalAlertTitleStyle, globalAlertTextStyle, globalAlertBtnStyle,
  floatingProfileBtnStyle, searchErrorOverlayStyle, searchErrorBoxStyle,
  searchErrorTitleStyle, searchErrorTextStyle, searchErrorBtnStyle
} from './styles/appStyles';

// smooth zoom out animation for when you first enter
function EntranceCamera() {
  const initialized = React.useRef(false);
  useFrame((state) => {
    if (!initialized.current) {
      state.camera.position.set(2, 7, 7); // start zoomed-in closer
      initialized.current = true;
    }
    // smoothly pull the camera back
    state.camera.position.x += (2 - state.camera.position.x) * 0.025;
    state.camera.position.y += (7 - state.camera.position.y) * 0.025;
    state.camera.position.z += (13 - state.camera.position.z) * 0.025;
  });
  return null;
}


// main app component where everything starts
function App() {
  const [step,          setStep]          = useState('entrance');
  const [activeGenre,   setActiveGenre]   = useState(null);
  const [isLoading,     setIsLoading]     = useState(false);
  const [searchError,   setSearchError]   = useState(null);
  const [globalAlert,   setGlobalAlert]   = useState(null);
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

  useEffect(() => {
    const handleAlert = (e) => setGlobalAlert(e.detail);
    window.addEventListener('show-alert', handleAlert);
    return () => window.removeEventListener('show-alert', handleAlert);
  }, []);

  const enterGenrePortal = (genreId) => {
    setIsLoading(true);
    setActiveGenre(genreId);
    setTimeout(() => {
      setIsLoading(false);
      setStep('genrePage');
    }, 2500); // keep the loading screen snappy
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
    <div style={appContainerStyle}>

      {/* standard react ui layer sitting on top of the 3d stuff */}

      {globalAlert && (
        <div style={globalAlertOverlayStyle}>
          <div style={globalAlertBoxStyle}>
            <h3 style={globalAlertTitleStyle}>SYSTEM MESSAGE</h3>
            <p style={globalAlertTextStyle}>
              {globalAlert}
            </p>
            <button
              onClick={() => setGlobalAlert(null)}
              style={globalAlertBtnStyle}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 0 15px rgba(118,7,7,0.8)'}
              onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
            >
              ACKNOWLEDGE
            </button>
            <style>{`
              @keyframes fadeInScale {
                0% { opacity: 0; transform: scale(0.9); }
                100% { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>
        </div>
      )}

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
            currentUser={user.nickname}
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
          
          {/* floating profile button so you can always check your stats */}
          <button 
            onClick={() => setIsProfileOpen(true)} 
            style={floatingProfileBtnStyle}
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
            currentUser={user.nickname}
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

          {/* floating profile button so you can always check your stats */}
          <button 
            onClick={() => setIsProfileOpen(true)} 
            style={floatingProfileBtnStyle}
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

      {/* 3d layer where the magic happens */}

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
          {/* horror room has its own spooky lighting so we turn off the main lights there */}
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
          {step === 'hub'       && <GrandRotunda enterGenrePortal={enterGenrePortal} />}
          {step === 'genrePage' && activeGenre === 'horror' && (
            <HorrorRoom onSelectMovie={setSelectedMovie} />
          )}
          {step === 'genrePage' && activeGenre === 'romcom' && (
            <RomComRoom onSelectMovie={setSelectedMovie} />
          )}
          {step === 'genrePage' && activeGenre === 'scifi' && (
            <ScifiRoom onSelectMovie={setSelectedMovie} />
          )}

          {/* cool reflective floor to tie the rooms together */}
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

      {/* popups and overlays that can show up anytime */}
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
        <div style={searchErrorOverlayStyle}>
          <div style={searchErrorBoxStyle}>
            <h2 style={searchErrorTitleStyle}>
              ACCESS DENIED
            </h2>
            <p style={searchErrorTextStyle}>
              {searchError}
            </p>
            <button
              onClick={() => setSearchError(null)}
              style={searchErrorBtnStyle}
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
