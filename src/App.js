import React, { useState } from 'react';
import InputPage from './components/InputPage';
import DisplayPage from './components/DisplayPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('input');
  const [points, setPoints] = useState({
    A: { x: 100, y: 100 },
    B: { x: 700, y: 100 },
    C: { x: 400, y: 600 }
  });

  const handleShowTriangle = (newPoints) => {
    setPoints(newPoints);
    setCurrentPage('display');
  };

  const handleGoBack = () => {
    setCurrentPage('input');
  };

  return (
    <div className="app">
      {currentPage === 'input' && (
        <InputPage 
          points={points}
          onShowTriangle={handleShowTriangle}
        />
      )}
      
      {currentPage === 'display' && (
        <DisplayPage 
          points={points}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
}

export default App;