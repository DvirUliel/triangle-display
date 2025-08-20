import React from 'react';
import './PointInput.css';

const PointInput = ({ label, point, onChange }) => {
  const handleXChange = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(label, { ...point, x: newValue });
  };

  const handleYChange = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(label, { ...point, y: newValue });
  };

  return (
    <div className="point-input">
      <h3>נקודה {label}</h3>
      <div className="coordinate-inputs">
        <div className="input-group">
          <label htmlFor={`${label}-x`}>X:</label>
          <input
            id={`${label}-x`}
            type="number"
            value={point.x}
            onChange={handleXChange}
            placeholder="X"
            step="any"
          />
        </div>
        <div className="input-group">
          <label htmlFor={`${label}-y`}>Y:</label>
          <input
            id={`${label}-y`}
            type="number"
            value={point.y}
            onChange={handleYChange}
            placeholder="Y"
            step="any"
          />
        </div>
      </div>
    </div>
  );
};

export default PointInput;