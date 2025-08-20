import React from 'react';
import './AngleCard.css';

const AngleCard = ({ label, angle, color = '#667eea' }) => {
  return (
    <div className="angle-card" style={{ borderRightColor: color }}>
      <h4 className="angle-label">זווית {label}</h4>
      <div className="angle-value" style={{ color }}>
        {angle}°
      </div>
      <div className="angle-description">
        {angle < 90 ? 'זווית חדה' : angle === 90 ? 'זווית ישרה' : 'זווית קהה'}
      </div>
    </div>
  );
};

export default AngleCard;