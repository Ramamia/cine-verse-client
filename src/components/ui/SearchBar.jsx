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

  const handleChange = (e) => {
    if (onSearch) onSearch(e.target.value, selectedGenre);
  };

  return (
    <div style={searchWrapper}>
      <div style={searchGlassContainer}>
        <input
          type="text"
          placeholder={`SEARCHING ${selectedGenre === 'ALL' ? 'CINEMA' : selectedGenre}...`}
          style={searchField}
          onChange={handleChange}
        />
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
