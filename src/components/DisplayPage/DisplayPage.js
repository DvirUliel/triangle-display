import React from 'react';
import TriangleCanvas from '../TriangleCanvas';
import AngleCard from '../AngleCard';
import { useTriangleCalculations } from '../../hooks/useTriangleCalculations';
import './DisplayPage.css';

const DisplayPage = ({ points, onGoBack }) => {
  const { angles } = useTriangleCalculations(points);

  const angleColors = {
    A: '#ff6b6b',
    B: '#4ecdc4', 
    C: '#45b7d1'
  };

  return (
    <div className="display-page">
      <div className="display-container">
        <header className="display-header">
          <button onClick={onGoBack} className="btn btn-secondary back-btn">
            ← חזור לעמוד הקלט
          </button>
          
          <h1>תצוגת המשולש</h1>
          
          <div className="coordinates-display">
            <h3>הקואורדינטות שהוזנו:</h3>
            <div className="coordinates-grid">
              {Object.entries(points).map(([label, point]) => (
                <div key={label} className="coord-item">
                  <strong>{label}:</strong> ({point.x}, {point.y})
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="canvas-section">
          <TriangleCanvas 
            points={points}
            angles={angles}
            width={800}
            height={800}
          />
        </div>

        <div className="angles-section">
          <h2>זוויות המשולש</h2>
          <div className="angles-grid">
            {Object.entries(angles).map(([label, angle]) => (
              <AngleCard
                key={label}
                label={label}
                angle={angle}
                color={angleColors[label]}
              />
            ))}
          </div>
          
          <div className="angles-summary">
            <p className="total-angles">
              סכום הזוויות: {Object.values(angles).reduce((sum, angle) => sum + angle, 0).toFixed(2)}°
            </p>
            <p className="triangle-type">
              {getTriangleType(angles)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const getTriangleType = (angles) => {
  const angleValues = Object.values(angles);
  const hasRightAngle = angleValues.some(angle => Math.abs(angle - 90) < 0.01);
  const hasObtuseAngle = angleValues.some(angle => angle > 90);
  
  if (hasRightAngle) {
    return 'סוג המשולש: משולש ישר זווית';
  } else if (hasObtuseAngle) {
    return 'סוג המשולש: משולש קהה זווית';
  } else {
    return 'סוג המשולש: משולש חד זווית';
  }
};

export default DisplayPage;