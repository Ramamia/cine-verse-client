import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  panelStyle, tabContainer, tabBtn, contentBody, label,
  optionGrid, optionBox, boxInner, videoStyle,
  equipBtn, customizeActionBtn,
} from '../../styles/componentStyles';
import { colors } from '../../styles/theme';

const TABS = ['ACCESSORIES', 'HAIR', 'COLOR'];

const CATALOG = {
  ACCESSORIES: [
    { id: 'cowboy',  name: 'Cowboy Hat',      vid: '/videos/cowboy.mp4'  },
    { id: 'glasses', name: 'Cinema Glasses',  vid: '/videos/glasses.mp4' },
  ],
  HAIR: [
    { id: 'marilyn', name: 'Monroe Blonde', vid: '/videos/marilyn.mp4' },
  ],
  COLOR: [
    { id: 'pink',  name: 'Pink',  colorCode: '#cb186c' },
    { id: 'green', name: 'Green', colorCode: '#06973d' },
  ],
};

const CustomizePanel = ({ config, setConfig, onFinish }) => {
  const [activeTab,    setActiveTab]    = useState('ACCESSORIES');
  const [selectedItem, setSelectedItem] = useState(null);

  const isEquipped = () => {
    if (!selectedItem) return false;
    if (activeTab === 'ACCESSORIES') return config?.acc  === selectedItem.id;
    if (activeTab === 'HAIR')        return config?.hair === selectedItem.id;
    if (activeTab === 'COLOR')       return config?.skin === selectedItem.id;
    return false;
  };

  const handleEquipToggle = () => {
    if (!selectedItem) return;
    const newVal = isEquipped() ? null : selectedItem.id;
    if (activeTab === 'ACCESSORIES') setConfig({ ...config, acc:  newVal });
    else if (activeTab === 'HAIR')   setConfig({ ...config, hair: newVal });
    else if (activeTab === 'COLOR')  setConfig({ ...config, skin: newVal });
  };

  const isActive = (item) =>
    (activeTab === 'ACCESSORIES' && config?.acc  === item.id) ||
    (activeTab === 'HAIR'        && config?.hair === item.id) ||
    (activeTab === 'COLOR'       && config?.skin === item.id);

  return (
    <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={panelStyle}>

      {/* Tabs */}
      <div style={tabContainer}>
        {TABS.map((tab) => (
          <div
            key={tab}
            onClick={() => { setActiveTab(tab); setSelectedItem(null); }}
            style={{
              ...tabBtn,
              color:        activeTab === tab ? '#fff' : '#555',
              borderBottom: activeTab === tab ? `2px solid ${colors.themeRed}` : '2px solid transparent',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Options grid */}
      <div style={contentBody}>
        <p style={label}>{activeTab} OPTIONS</p>
        <div style={optionGrid}>
          {CATALOG[activeTab].map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              style={{
                ...optionBox,
                border: (selectedItem?.id === item.id || isActive(item))
                  ? `2px solid ${colors.themeRed}`
                  : '1px solid #222',
              }}
            >
              {activeTab === 'COLOR'
                ? <div style={{ ...boxInner, background: item.colorCode }} />
                : <video src={item.vid} autoPlay loop muted playsInline style={videoStyle} />}
            </div>
          ))}
        </div>
      </div>

      {/* Equip / Unequip */}
      <AnimatePresence>
        {selectedItem && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={handleEquipToggle}
            style={{
              ...equipBtn,
              background:   isEquipped() ? colors.themeRed : 'transparent',
              borderColor:  colors.themeRed,
            }}
          >
            {isEquipped()
              ? `UNEQUIP ${selectedItem.name.toUpperCase()}`
              : `EQUIP ${selectedItem.name.toUpperCase()}`}
          </motion.button>
        )}
      </AnimatePresence>

      <button onClick={onFinish} style={customizeActionBtn}>CONFIRM IDENTITY</button>
    </motion.div>
  );
};

export default CustomizePanel;
