// ─── Hub / App-level UI styles ───────────────────────────────────────────────

export const searchWrapper = {
  position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)',
  zIndex: 100, width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center',
};

export const searchGlassContainer = {
  width: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '4px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
};

export const filterBar = {
  display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '5px',
  padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)',
};

export const filterTab = {
  fontSize: '0.65rem', letterSpacing: '2px', cursor: 'pointer', transition: '0.3s all ease',
  fontWeight: 'bold', textTransform: 'uppercase', paddingBottom: '4px',
};

export const searchField = {
  width: '100%', background: 'transparent', border: 'none', padding: '15px 0',
  color: '#fff', letterSpacing: '4px', outline: 'none', fontSize: '0.8rem', textAlign: 'center',
};

export const searchAccent = {
  width: '100px', height: '2px', marginTop: '12px', transition: '0.5s all ease',
};

export const sidePanelStyle = {
  position: 'absolute', left: '20px', height: '35%', top: '75%', transform: 'translateY(-50%)',
  width: '260px', background: 'rgba(10, 0, 0, 0.4)', padding: '23px', borderRadius: '2px',
  borderLeft: '4px solid #760707', zIndex: 100, backdropFilter: 'blur(10px)',
};

export const panelHeader = { color: '#760707', letterSpacing: '5px', marginBottom: '25px', fontSize: '0.8rem' };
export const feedItem    = { marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #222' };
export const userRow     = { display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.75rem', marginBottom: '5px' };
export const ratingStyle = { color: '#ffd700', fontSize: '0.65rem' };
export const commentStyle = { color: '#999', fontSize: '0.7rem', margin: 0, fontStyle: 'italic', lineHeight: '1.4' };

// ─── Customize page ──────────────────────────────────────────────────────────
export const customizeHeader = { position: 'absolute', top: '40px', left: '40px', zIndex: 10 };
export const titleStyle = {
  color: '#fff', fontSize: '2rem', letterSpacing: '10px', fontWeight: '900',
  textShadow: '0 0 20px rgba(118, 7, 7, 0.5)',
};

// ─── Genre page ──────────────────────────────────────────────────────────────
export const genreUI   = { position: 'absolute', top: '40px', left: '40px', zIndex: 1000 };
export const backBtn   = { background: 'rgba(0,0,0,0.5)', border: '1px solid #760707', color: '#fff', padding: '12px 24px', cursor: 'pointer', letterSpacing: '2px', backdropFilter: 'blur(10px)' };
export const genreTitle = { color: '#fff', letterSpacing: '10px', marginTop: '20px', fontSize: '1.5rem' };
