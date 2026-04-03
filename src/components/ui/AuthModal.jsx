import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthModal = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const themeRed = "#760707";

  return (
    <div style={overlay}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        style={glassPanel}
      >
        <div style={toggleContainer}>
          <div 
            onClick={() => setIsLogin(true)}
            style={{...switchBtn, color: isLogin ? '#fff' : '#555', borderBottom: isLogin ? `2px solid ${themeRed}` : '2px solid transparent'}}
          >LOGIN</div>
          <div 
            onClick={() => setIsLogin(false)}
            style={{...switchBtn, color: !isLogin ? '#fff' : '#555', borderBottom: !isLogin ? `2px solid ${themeRed}` : '2px solid transparent'}}
          >SIGN UP</div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={title}>{isLogin ? 'ACCESS TERMINAL' : 'INITIALIZE IDENTITY'}</h2>
          <p style={subtitle}>
            {isLogin 
              ? "Welcome back. Let's access your profile." 
              : "The curtains are rising. Let's start your journey."}
          </p>
        </div>
        
        <div style={{ width: '100%' }}>
          <input type="text" placeholder="USERNAME" style={inputStyle} />
          <input type="password" placeholder="PASSWORD" style={inputStyle} />
        </div>

        <button onClick={onLogin} style={{ ...actionBtn, backgroundColor: themeRed }}>
          {isLogin ? 'RESUME EXPERIENCE' : 'TAKE YOUR SEAT'}
        </button>
      </motion.div>
    </div>
  );
};

const overlay = {
  position: 'absolute',
  inset: 0,
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column', // Stacked under the header
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '30vh', // Lowers the modal to clear the title
  pointerEvents: 'none'
};

const glassPanel = {
  pointerEvents: 'auto',
  background: 'rgba(15, 0, 0, 0.6)',
  backdropFilter: 'blur(2px)',
  padding: '30px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.08)',
  textAlign: 'center',
  width: '300px',
  boxShadow: '0 25px 50px rgba(0,0,0,0.9)'
};

const toggleContainer = { display: 'flex', justifyContent: 'space-around', marginBottom: '25px' };
const switchBtn = { cursor: 'pointer', paddingBottom: '8px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px', transition: '0.3s' };
const title = { color: '#fff', fontSize: '1.1rem', letterSpacing: '3px', margin: '0 0 5px 0' };
const subtitle = { color: '#888', fontSize: '0.75rem', fontStyle: 'italic', letterSpacing: '1px' };
const inputStyle = { width: '100%', padding: '12px', margin: '8px 0', background: 'rgba(0,0,0,0.7)', border: '1px solid #3a0404', color: '#fff', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' };
const actionBtn = { width: '100%', padding: '14px', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px', marginTop: '15px', fontSize: '0.8rem', borderRadius: '2px' };

export default AuthModal;