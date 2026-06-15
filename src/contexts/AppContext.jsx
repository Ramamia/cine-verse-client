import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [globalAlert, setGlobalAlert] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [config, setConfig] = useState({ acc: null, hair: null, skin: '#ffdbac' });
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    bio: '',
    topMovies: [],
    following: [],
  });

  const [feedItems, setFeedItems] = useState([
    { user: 'Lara', rating: '★ 4', comment: '"The twist in Scream 6 blew my mind!"' },
    { user: 'Fahed', rating: '★ 2.9', comment: '"I can\'t believe the ending of that movie it sucks"' },
    { user: 'Lilia', rating: '★ 4.5', comment: '"minecraft movie was AMAZINGG"' },
  ]);

  useEffect(() => {
    const handleAlert = (e) => setGlobalAlert(e.detail);
    window.addEventListener('show-alert', handleAlert);
    return () => window.removeEventListener('show-alert', handleAlert);
  }, []);

  const value = {
    isLoading, setIsLoading,
    searchError, setSearchError,
    globalAlert, setGlobalAlert,
    isProfileOpen, setIsProfileOpen,
    selectedMovie, setSelectedMovie,
    config, setConfig,
    user, setUser,
    feedItems, setFeedItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
