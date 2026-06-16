import React, { useState, useEffect } from 'react';
import { Loader } from '@react-three/drei';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from './contexts/AppContext';

import RoomCanvas      from './components/3d/RoomCanvas';
import './App.css';

import LoadingScreen   from './pages/LoadingScreen';
import NotFound        from './pages/NotFound';

// ui stuff
import Header          from './components/ui/Header';
import AuthModal       from './components/ui/AuthModal';
import CustomizePanel  from './components/ui/CustomizePanel';
import { api }         from './services/api';
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

// main app component where everything starts
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const {
    isLoading, setIsLoading,
    searchError, setSearchError,
    globalAlert, setGlobalAlert,
    isProfileOpen, setIsProfileOpen,
    selectedMovie, setSelectedMovie,
    config, setConfig,
    user, setUser,
    feedItems, setFeedItems,
    movies, horrorMovies, romcomMovies, scifiMovies,
  } = useAppContext();

  // Derive current view from the URL
  const path = location.pathname;
  let step = 'entrance';
  let activeGenre = null;

  if (path === '/') step = 'entrance';
  else if (path === '/customize') step = 'customize';
  else if (path === '/hub') step = 'hub';
  else if (path.startsWith('/vault/')) {
    step = 'genrePage';
    activeGenre = path.split('/')[2]; // e.g., 'horror'
  } else {
    step = 'notfound';
  }

  const enterGenrePortal = (genreId) => {
    setIsLoading(genreId);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/vault/${genreId}`);
    }, 2500); // keep the loading screen snappy
  };

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    console.log("Saving session data for user before logging out...");
    try {
      if (user.id) {
        await api.updateProfile({
          bio: user.bio,
          avatar_skin: config.skin,
          avatar_acc: config.acc
        });
        console.log("Session data saved successfully!");
      }
    } catch (err) {
      console.error("Failed to save session data:", err);
    }
    
    localStorage.removeItem('cineverse_token');
    setUser({
      id: null,
      nickname: '',
      email: '',
      bio: '',
      topMovies: [],
      following: [],
    });
    setConfig({
      skin: 'baseAvatar.png',
      acc: null,
      hair: null
    });
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleSearch = (val, genreFilter) => {
    if (!val || !val.trim()) return;
    const query = val.toLowerCase();
    const allMovies = movies;
    
    let filtered = allMovies;
    if (genreFilter === 'HORROR') filtered = filtered.filter(m => m.genre === 'horror');
    else if (genreFilter === 'ROM-COM') filtered = filtered.filter(m => m.genre === 'romcom');
    else if (genreFilter === 'SCI-FI') filtered = filtered.filter(m => m.genre === 'scifi');

    const found = filtered.find(m => m.title.toLowerCase().includes(query));
    if (found) {
      setSearchError(null);
      enterGenrePortal(found.genre);
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
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div style={globalAlertOverlayStyle}>
          <div style={globalAlertBoxStyle}>
            <h3 style={globalAlertTitleStyle}>LOGOUT TERMINAL</h3>
            <p style={globalAlertTextStyle}>
              ARE YOU SURE YOU WANT TO TERMINATE YOUR SESSION AND LOG OUT?
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
              <button
                onClick={handleLogout}
                style={{
                  ...globalAlertBtnStyle,
                  background: '#760707',
                  border: '1px solid #ff4b4b',
                  margin: 0
                }}
                onMouseEnter={(e) => e.target.style.boxShadow = '0 0 15px rgba(255,75,75,0.8)'}
                onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
              >
                YES, LOGOUT
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  ...globalAlertBtnStyle,
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid #555',
                  margin: 0
                }}
                onMouseEnter={(e) => e.target.style.boxShadow = '0 0 15px rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && <LoadingScreen genre={typeof isLoading === 'string' ? isLoading : activeGenre} />}

      {step === 'notfound' && <NotFound />}

      {step === 'entrance' && (
        <>
          <Header />
          <AuthModal onLogin={async (userData) => {
            try {
              const profileRes = await api.getProfile();
              const u = profileRes.user;
              setUser({
                id: u.id,
                nickname: u.nickname,
                email: u.email,
                bio: u.bio || '',
                topMovies: u.top_movies || [],
                following: u.following || [],
              });
              setConfig({
                skin: u.avatar_skin || 'baseAvatar.png',
                acc: u.avatar_acc || null,
                hair: null
              });
            } catch (err) {
              console.error("Failed to load user profile on login:", err);
              setUser({
                id: userData.id,
                nickname: userData.nickname || '',
                email: userData.email || '',
                bio: '',
                topMovies: [],
                following: [],
              });
              setConfig({
                skin: userData.avatar_skin || 'baseAvatar.png',
                acc: userData.avatar_acc || null,
                hair: null
              });
            }
            navigate('/customize');
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
            onFinish={() => navigate('/hub')} 
          />
        </>
      )}

      {step === 'hub' && (
        <>
          <CineSocialFeed 
            feedItems={feedItems}
            following={user.following} 
            currentUser={user}
            onToggleFollow={async (userId) => {
              try {
                await api.toggleFollow(userId);
                const profileRes = await api.getProfile();
                const u = profileRes.user;
                setUser(prev => ({
                  ...prev,
                  following: u.following || [],
                }));
              } catch (err) {
                setGlobalAlert('FAILED TO TOGGLE FOLLOW: ' + err.message.toUpperCase());
              }
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

          {/* floating logout button */}
          <button 
            onClick={() => setShowLogoutConfirm(true)} 
            className="floating-logout-btn"
          >
            LOGOUT
          </button>
        </>
      )}

      {step === 'genrePage' && (
        <>
          <CineSocialFeed 
            feedItems={feedItems}
            following={user.following} 
            currentUser={user}
            onToggleFollow={async (userId) => {
              try {
                await api.toggleFollow(userId);
                const profileRes = await api.getProfile();
                const u = profileRes.user;
                setUser(prev => ({
                  ...prev,
                  following: u.following || [],
                }));
              } catch (err) {
                setGlobalAlert('FAILED TO TOGGLE FOLLOW: ' + err.message.toUpperCase());
              }
            }} 
          />
          
          <div style={genreUI}>
            <button onClick={() => navigate('/hub')} style={backBtn}>← BACK TO ROTUNDA</button>
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

          {/* floating logout button */}
          <button 
            onClick={() => setShowLogoutConfirm(true)} 
            className="floating-logout-btn"
          >
            LOGOUT
          </button>
        </>
      )}

      {/* 3d layer where the magic happens */}

      <RoomCanvas
        step={step}
        activeGenre={activeGenre}
        config={config}
        enterGenrePortal={enterGenrePortal}
        setSelectedMovie={setSelectedMovie}
        currentSettings={currentSettings}
      />

      {/* popups and overlays that can show up anytime */}
      {isProfileOpen && (
        <ProfilePopup 
          user={user} 
          config={config} 
          setUser={setUser} 
          onClose={() => setIsProfileOpen(false)} 
          onEditAvatar={() => {
            setIsProfileOpen(false);
            navigate('/customize');
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
