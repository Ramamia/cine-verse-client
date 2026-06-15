import React, { useState } from 'react';
import {
  searchWrapper, searchGlassContainer, searchField,
  filterBar, filterTab, searchAccent,
} from '../../styles/hubStyles';

const GENRES = ['ALL', 'ROM-COM', 'HORROR', 'SCI-FI'];

const GENRE_COLORS = {
  'ROM-COM': '#ff69b4',
  'HORROR':  '#433636',
  'SCI-FI':  '#00d4ff',
};
const getGenreColor = (genre) => GENRE_COLORS[genre] ?? '#760707';

const SearchBar = ({ onSearch }) => {
  const [selectedGenre, setSelectedGenre] = useState('ALL');

  const [searchValue, setSearchValue] = useState('');

  const handleSearchClick = () => {
    if (onSearch) onSearch(searchValue, selectedGenre);
  };

  return (
    <div style={searchWrapper}>
      <div style={searchGlassContainer}>
        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <input
            type="text"
            placeholder={`SEARCHING ${selectedGenre === 'ALL' ? 'CINEMA' : selectedGenre}...`}
            style={{ ...searchField, flex: 1 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearchClick(); }}
          />
          <button
            onClick={handleSearchClick}
            style={{
              background: 'transparent',
              border: `1px solid ${getGenreColor(selectedGenre)}`,
              color: getGenreColor(selectedGenre),
              padding: '8px 16px',
              marginLeft: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              borderRadius: '4px',
              letterSpacing: '2px',
            }}
          >
            SEARCH
          </button>
        </div>
        <div style={filterBar}>
          {GENRES.map((genre) => (
            <div
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              style={{
                ...filterTab,
                color:        selectedGenre === genre ? getGenreColor(genre) : '#555',
                borderBottom: selectedGenre === genre
                  ? `1px solid ${getGenreColor(genre)}`
                  : '1px solid transparent',
              }}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
      <div style={{
        ...searchAccent,
        background: getGenreColor(selectedGenre),
        boxShadow:  `0 0 15px ${getGenreColor(selectedGenre)}`,
      }} />
    </div>
  );
};

export default SearchBar;
