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
 * Scale points to fit within canvas bounds
 */
const scalePointsToCanvas = (points, canvasWidth = 800, canvasHeight = 600, margin = 80) => {
  const workingWidth = canvasWidth - 2 * margin;
  const workingHeight = canvasHeight - 2 * margin;
  
  // Find bounds
  const xs = [points.A.x, points.B.x, points.C.x];
  const ys = [points.A.y, points.B.y, points.C.y];
  
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  
  // Calculate scale factor
  const scaleX = workingWidth / rangeX;
  const scaleY = workingHeight / rangeY;
  const scale = Math.min(scaleX, scaleY);
  
  // Scale and center points
  return {
    A: {
      x: margin + (points.A.x - minX) * scale,
      y: margin + (points.A.y - minY) * scale
    },
    B: {
      x: margin + (points.B.x - minX) * scale,
      y: margin + (points.B.y - minY) * scale
    },
    C: {
      x: margin + (points.C.x - minX) * scale,
      y: margin + (points.C.y - minY) * scale
    }
  };
};

/**
 * Custom hook for triangle calculations
 * @param {Object} points - Triangle points
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @returns {Object} Calculations and utilities
 */
export const useTriangleCalculations = (points, canvasWidth = 800, canvasHeight = 600) => {
  const [angles, setAngles] = useState({ A: 0, B: 0, C: 0 });
  const [scaledPoints, setScaledPoints] = useState(points);

  useEffect(() => {
    if (points) {
      // Calculate angles
      const calculatedAngles = calculateAngles(points);
      setAngles(calculatedAngles);

      // Scale points for canvas
      const scaled = scalePointsToCanvas(points, canvasWidth, canvasHeight);
      setScaledPoints(scaled);
    }
  }, [points, canvasWidth, canvasHeight]);

  return {
    angles,
    scaledPoints,
    recalculate: () => {
      const calculatedAngles = calculateAngles(points);
      setAngles(calculatedAngles);
      const scaled = scalePointsToCanvas(points, canvasWidth, canvasHeight);
      setScaledPoints(scaled);
    }
  };
};