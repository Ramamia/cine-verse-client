import React from 'react';
import { headerStyle, logoStyle, headlineStyle, taglineStyle } from '../../styles/componentStyles';

const Header = () => (
  <div style={headerStyle}>
    <img src="/logo.png" alt="Cine-Verse" style={logoStyle} />
    <h1 style={headlineStyle}>Step into the scene.</h1>
    <p style={taglineStyle}>
      More than movies <br />
      it's a whole experience.
    </p>
  </div>
);

export default Header;
