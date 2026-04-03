import React from 'react';

const Header = () => {
  return (
    <div style={headerStyle}>
      <img src="/logo.png" alt="Cine-Verse" style={logoStyle} />
{/* Primary Headline */}
      <h1 style={headlineStyle}>Step into the scene.</h1>

      {/* Secondary Tagline */}
      <p style={taglineStyle}>
        More than movies <br /> 
        it's a whole experience.
      </p>

    </div>
  );
};

const headerStyle = {
  position: 'absolute',
  top: '30px',
  width: '100%',
  textAlign: 'center',
  zIndex: 101,
  pointerEvents: 'none'
};

const logoStyle = {
  height: '120px', // or whatever your original height was
  marginBottom: '-3px',
  marginTop: '-30px',
  filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.95))', 
  transition: 'filter 0.3s ease', // Optional smooth transition if you add a hover
};

const headlineStyle = {
  color: '#ffffff',
  fontSize: '1.3rem', // Significantly larger
  fontWeight: '800',
  letterSpacing: '8px',
  textTransform: 'uppercase',
  margin: '0 0 5px 0',
  textShadow: '0 0 20px rgba(255,255,255,0.2)'
};

const taglineStyle = {
  color: '#9b6868', // Red text as requested
  fontSize: '0.9rem', // Smaller secondary text
  letterSpacing: '4px',
  textTransform: 'uppercase',
  lineHeight: '1.4',
  fontWeight: '420',
  margin: 0
};

export default Header;