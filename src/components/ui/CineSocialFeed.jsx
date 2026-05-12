import React from 'react';
import {
  sidePanelStyle, panelHeader, feedItem, userRow, ratingStyle, commentStyle,
} from '../../styles/hubStyles';

const FEED_ITEMS = [
  { user: 'Lara',  rating: '★ 4',   comment: '"The twist in Scream 6 blew my mind!"' },
  { user: 'Fahed', rating: '★ 2.9', comment: '"I can\'t believe the ending of that movie it sucks"' },
  { user: 'Lilia', rating: '★ 4.5', comment: '"minecraft movie was AMAZINGG"' },
];

const CineSocialFeed = () => (
  <div style={sidePanelStyle}>
    <h4 style={panelHeader}>CINE-SOCIAL</h4>
    {FEED_ITEMS.map(({ user, rating, comment }) => (
      <div key={user} style={feedItem}>
        <div style={userRow}>
          <b>{user}</b>
          <span style={ratingStyle}>{rating}</span>
        </div>
        <p style={commentStyle}>{comment}</p>
      </div>
    ))}
  </div>
);

export default CineSocialFeed;
