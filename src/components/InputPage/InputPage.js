import React, { useState } from 'react';
import PointInput from '../PointInput';
import './InputPage.css';

const InputPage = ({ points, onShowTriangle }) => {
  const [localPoints, setLocalPoints] = useState(points);

  const handlePointChange = (label, newPoint) => {
    setLocalPoints(prev => ({
      ...prev,
      [label]: newPoint
    }));
  };

  const handleShowTriangle = () => {
    onShowTriangle(localPoints);
  };

  const handleReset = () => {
    const defaultPoints = {
      A: { x: 100, y: 100 },
      B: { x: 700, y: 100 },
      C: { x: 400, y: 600 }
    };
    setLocalPoints(defaultPoints);
  };

  return (
    <div className="input-page">
      <div className="input-container">
        <header className="input-header">
          <h1>הזנת נקודות המשולש</h1>
          <p>הזן שלוש נקודות ליצירת משולש והצגת זוויותיו</p>
        </header>
        
        <div className="points-grid">
          {Object.entries(localPoints).map(([label, point]) => (
            <PointInput
              key={label}
              label={label}
              point={point}
              onChange={handlePointChange}
            />
          ))}
        </div>
        
        <div className="actions">
          <button 
            onClick={handleShowTriangle} 
            className="btn btn-primary show-triangle-btn"
          >
            הצג משולש
          </button>
          <button 
            onClick={handleReset} 
            className="btn btn-secondary reset-btn"
          >
            איפוס לערכי דפולט
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPage;