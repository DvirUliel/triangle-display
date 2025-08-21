import { useState, useEffect } from 'react';

/**
 * Calculate distance between two points
 */
const calculateDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * Calculate triangle angles using law of cosines
 */
const calculateAngles = (points) => {
  // Calculate side lengths
  const a = calculateDistance(points.B, points.C); // BC
  const b = calculateDistance(points.A, points.C); // AC
  const c = calculateDistance(points.A, points.B); // AB
  
  // Law of cosines: cos(A) = (b² + c² - a²) / (2bc)
  const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c));
  const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c));
  const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b));
  
  // Convert to degrees and round
  return {
    A: Math.round(angleA * 180 / Math.PI * 100) / 100,
    B: Math.round(angleB * 180 / Math.PI * 100) / 100,
    C: Math.round(angleC * 180 / Math.PI * 100) / 100
  };
};

/**
 * Custom hook for triangle calculations
 * @param {Object} points - Triangle points
 * @returns {Object} Calculations
 */
export const useTriangleCalculations = (points) => {
  const [angles, setAngles] = useState({ A: 0, B: 0, C: 0 });

  useEffect(() => {
    if (points) {
      // Calculate angles only - no scaling
      const calculatedAngles = calculateAngles(points);
      setAngles(calculatedAngles);
    }
  }, [points]);

  return {
    angles,
    scaledPoints: points, // Return original points without scaling
    recalculate: () => {
      const calculatedAngles = calculateAngles(points);
      setAngles(calculatedAngles);
    }
  };
};