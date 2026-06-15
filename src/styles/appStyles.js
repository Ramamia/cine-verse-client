export const appContainerStyle = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
  background: '#000'
};

export const globalAlertOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.8)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999
};

export const globalAlertBoxStyle = {
  background: 'rgba(10,0,0,0.95)',
  border: '1px solid #760707',
  padding: '30px 40px',
  borderRadius: '8px',
  boxShadow: '0 0 30px rgba(118,7,7,0.5)',
  textAlign: 'center',
  maxWidth: '400px',
  animation: 'fadeInScale 0.3s ease forwards'
};

export const globalAlertTitleStyle = {
  color: '#ff4b4b',
  fontFamily: 'monospace',
  letterSpacing: '2px',
  margin: '0 0 15px 0',
  fontSize: '18px'
};

export const globalAlertTextStyle = {
  color: '#ddd',
  fontFamily: 'monospace',
  fontSize: '14px',
  lineHeight: '1.5',
  marginBottom: '25px'
};

export const globalAlertBtnStyle = {
  background: '#760707',
  color: '#fff',
  border: 'none',
  padding: '10px 30px',
  fontFamily: 'monospace',
  fontSize: '14px',
  letterSpacing: '1px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontWeight: 'bold'
};

export const floatingProfileBtnStyle = {
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
  transition: 'all 0.3s ease'
};

export const searchErrorOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.8)',
  zIndex: 2000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(5px)'
};

export const searchErrorBoxStyle = {
  background: '#111',
  border: '2px solid #760707',
  padding: '40px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 0 30px rgba(118, 7, 7, 0.5)',
  maxWidth: '400px'
};

export const searchErrorTitleStyle = {
  color: '#ff4444',
  letterSpacing: '3px',
  margin: '0 0 20px 0',
  fontFamily: 'monospace'
};

export const searchErrorTextStyle = {
  color: '#fff',
  opacity: 0.8,
  letterSpacing: '1px',
  marginBottom: '30px'
};

export const searchErrorBtnStyle = {
  background: '#760707',
  color: '#fff',
  border: 'none',
  padding: '10px 30px',
  cursor: 'pointer',
  fontWeight: 'bold',
  letterSpacing: '2px',
  borderRadius: '4px',
  transition: 'all 0.3s ease'
};
