export const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 10000,
  background: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(15px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

export const ticketStyle = {
  display: 'flex',
  width: '100%',
  maxWidth: '920px',
  height: '580px',
  background: 'rgba(15, 15, 18, 0.8)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(118, 7, 7, 0.25)',
  overflow: 'hidden',
  position: 'relative',
};

export const leftStubStyle = {
  flex: '1',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
};

export const rightStubStyle = {
  width: '320px',
  background: 'rgba(255, 255, 255, 0.01)',
  borderLeft: '1px dashed rgba(255, 255, 255, 0.08)',
  padding: '24px 20px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
};

export const dividerStyle = {
  position: 'relative',
  width: '1px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const topTearCircleStyle = {
  position: 'absolute',
  top: '-15px',
  left: '-15px',
  width: '30px',
  height: '30px',
  background: 'rgba(0,0,0,1)',
  borderRadius: '50%',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
  zIndex: 10,
};

export const bottomTearCircleStyle = {
  position: 'absolute',
  bottom: '-15px',
  left: '-15px',
  width: '30px',
  height: '30px',
  background: 'rgba(0,0,0,1)',
  borderRadius: '50%',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
  zIndex: 10,
};

export const dividerLineStyle = {
  height: '100%',
  borderRight: '1px dashed rgba(255, 255, 255, 0.15)',
};

export const ticketHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  paddingBottom: '10px',
};

export const logoWrapperStyle = {
  color: '#fff',
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  letterSpacing: '2px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

export const vipBadgeStyle = {
  background: 'rgba(118, 7, 7, 0.15)',
  border: '1px solid rgba(118, 7, 7, 0.4)',
  borderRadius: '4px',
  padding: '4px 10px',
  color: '#c61a1a',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
  fontFamily: 'monospace',
};

export const profileGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  margin: '12px 0',
};

export const credentialsColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

export const bioColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  textAlign: 'left',
};

export const bioTextareaStyle = {
  width: '100%',
  height: '110px',
  background: 'rgba(0, 0, 0, 0.4)',
  border: '1px solid rgba(118, 7, 7, 0.4)',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '0.75rem',
  padding: '10px',
  boxSizing: 'border-box',
  resize: 'none',
  outline: 'none',
  fontFamily: 'monospace',
  lineHeight: '1.4',
  letterSpacing: '0.5px',
};

export const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  textAlign: 'left',
};

export const fieldLabelStyle = {
  color: '#555',
  fontSize: '0.6rem',
  fontWeight: 'bold',
  letterSpacing: '1.5px',
  fontFamily: 'monospace',
};

export const fieldValueStyle = {
  color: '#fff',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  letterSpacing: '1.5px',
  fontFamily: 'monospace',
};

export const moviesSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  textAlign: 'left',
};

export const movieSlotsContainerStyle = {
  display: 'flex',
  gap: '10px',
  margin: '4px 0',
};

export const movieCardStyle = {
  position: 'relative',
  width: '72px',
  height: '108px',
  borderRadius: '6px',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(0, 0, 0, 0.5)',
  cursor: 'pointer',
  boxSizing: 'border-box',
};

export const emptyMovieCardStyle = {
  width: '72px',
  height: '108px',
  borderRadius: '6px',
  border: '1px dashed rgba(118, 7, 7, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.2)',
  boxSizing: 'border-box',
};

export const emptyCardNumberStyle = {
  fontFamily: 'monospace',
  fontSize: '0.9rem',
  color: '#333',
  fontWeight: 'bold',
};

export const moviePosterStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const moviePosterFallbackStyle = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #1f1f2e 0%, #11111a 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px',
  boxSizing: 'border-box',
};

export const movieFallbackTitleStyle = {
  fontFamily: 'monospace',
  fontSize: '0.55rem',
  color: '#aaa',
  textAlign: 'center',
  lineHeight: '1.2',
};

export const movieRemoveOverlayStyle = {
  position: 'absolute',
  inset: 0,
  background: 'rgba(118, 7, 7, 0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.2s ease',
};

export const removeBtnTextStyle = {
  color: '#fff',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  letterSpacing: '1px',
};

export const searchSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginTop: '10px',
};

export const searchFormStyle = {
  display: 'flex',
  gap: '8px',
};

export const movieSearchInputStyle = {
  flex: '1',
  background: 'rgba(0, 0, 0, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '4px',
  padding: '8px 12px',
  color: '#fff',
  fontSize: '0.75rem',
  fontFamily: 'monospace',
  outline: 'none',
  letterSpacing: '0.5px',
};

export const movieSearchBtnStyle = {
  background: '#760707',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  padding: '8px 16px',
  fontFamily: 'monospace',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  letterSpacing: '1px',
  cursor: 'pointer',
};

export const searchErrorStyle = {
  color: '#ff4b4b',
  fontSize: '0.7rem',
  fontFamily: 'monospace',
  textAlign: 'left',
};

export const searchResultsContainerStyle = {
  display: 'flex',
  gap: '10px',
  overflowX: 'auto',
  paddingBottom: '8px',
  minHeight: '80px',
  maxHeight: '90px',
  alignItems: 'center',
  width: '100%',
  maxWidth: '520px',
  boxSizing: 'border-box',
};

export const searchResultItemStyle = {
  flex: '0 0 160px',
  height: '74px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '4px',
  display: 'flex',
  gap: '8px',
  padding: '4px',
  boxSizing: 'border-box',
  textAlign: 'left',
};

export const searchResultPosterStyle = {
  width: '42px',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '2px',
};

export const searchResultPosterFallbackStyle = {
  width: '42px',
  height: '100%',
  background: '#1a1a24',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
  color: '#555',
  fontFamily: 'monospace',
  borderRadius: '2px',
};

export const searchResultDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: '1',
  overflow: 'hidden',
};

export const searchResultTitleStyle = {
  color: '#fff',
  fontSize: '0.6rem',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const addMovieBtnStyle = {
  background: 'rgba(118, 7, 7, 0.2)',
  border: '1px solid rgba(118, 7, 7, 0.5)',
  borderRadius: '2px',
  color: '#c61a1a',
  fontSize: '0.55rem',
  padding: '2px 6px',
  fontFamily: 'monospace',
  fontWeight: 'bold',
  cursor: 'pointer',
  textAlign: 'center',
  width: 'fit-content',
};

export const noResultsStyle = {
  color: '#444',
  fontSize: '0.7rem',
  fontFamily: 'monospace',
  width: '100%',
  textAlign: 'center',
};

export const barcodeContainerStyle = {
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  paddingTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
};

export const barcodeLinesStyle = {
  width: '100%',
  height: '30px',
  backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 6px, #fff 6px, #fff 8px, transparent 8px, transparent 12px, #fff 12px, #fff 13px, transparent 13px, transparent 18px, #fff 18px, #fff 22px, transparent 22px, transparent 24px)',
  opacity: 0.6,
};

export const barcodeNumberStyle = {
  color: '#444',
  fontSize: '0.55rem',
  letterSpacing: '4px',
  fontFamily: 'monospace',
};

export const closeBtnStyle = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  zIndex: 100,
  background: 'none',
  border: 'none',
  color: '#666',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'color 0.2s',
  padding: '5px',
};

export const viewerLabelStyle = {
  color: '#555',
  fontSize: '0.6rem',
  fontWeight: 'bold',
  letterSpacing: '2px',
  fontFamily: 'monospace',
  marginBottom: '10px',
};

export const canvasContainerStyle = {
  width: '100%',
  height: '420px',
  background: 'transparent',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.02)',
  overflow: 'hidden',
};

export const photoboothFrameStyle = {
  background: '#000000',
  padding: '8px 8px 30px 8px',
  boxShadow: '2px 8px 15px rgba(0,0,0,0.5)',
  transform: 'rotate(-2deg)',
  display: 'inline-block',
  width: '60%',
  borderRadius: '2px',
  transition: 'transform 0.3s ease',
  border: '1px solid #333',
};

export const photoboothImageStyle = {
  width: '100%',
  height: 'auto',
  border: '1px solid #111',
  display: 'block',
  background: '#111',
};

export const photoboothContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '15px',
  position: 'relative',
};

export const filmStripStyle = {
  width: '35px',
  height: '130%',
  objectFit: 'cover',
  position: 'absolute',
  left: '5px',
  top: '-35px',
  opacity: 0.85,
  transform: 'rotate(2deg)',
};
