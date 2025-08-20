import React, { useRef, useEffect } from 'react';
import './TriangleCanvas.css';

const TriangleCanvas = ({ points, angles, width = 800, height = 600 }) => {
  const canvasRef = useRef(null);

  // פונקציה מקומית לחישוב offset לטקסט
  const getAngleTextOffset = (point, centerX, centerY, distance = 60) => {
    const dx = centerX - point.x;
    const dy = centerY - point.y;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    
    return {
      x: (dx / length) * distance,
      y: (dy / length) * distance
    };
  };

  useEffect(() => {
    if (points && angles) {
      drawTriangle();
    }
  }, [points, angles]);

  const drawTriangle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Clear canvas completely
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw in this order:
    drawTriangleShape(ctx, points);
    drawAngleArcs(ctx, points);
    drawAngleValues(ctx, points, angles);
    drawPoints(ctx, points);
  };

  const drawAngleArcs = (ctx, points) => {
    const radius = 35;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    // Draw angle arcs for each vertex
    drawAngleArc(ctx, points.A, points.B, points.C, radius, colors[0]);
    drawAngleArcB(ctx, points.B, points.A, points.C, radius, colors[1]); // Special for B
    drawAngleArc(ctx, points.C, points.A, points.B, radius, colors[2]);
  };

  const drawAngleArc = (ctx, vertex, p1, p2, radius, color) => {
    // Calculate vectors from vertex to the two other points
    const v1x = p1.x - vertex.x;
    const v1y = p1.y - vertex.y;
    const v2x = p2.x - vertex.x;
    const v2y = p2.y - vertex.y;
    
    // Calculate angles
    const angle1 = Math.atan2(v1y, v1x);
    const angle2 = Math.atan2(v2y, v2x);
    
    // Find the smaller arc (interior angle)
    let startAngle = angle1;
    let endAngle = angle2;
    
    // Normalize the angle difference
    let diff = endAngle - startAngle;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    
    // If the arc spans more than 180 degrees, use the other direction
    if (Math.abs(diff) > Math.PI) {
      [startAngle, endAngle] = [endAngle, startAngle];
    }
    
    // Draw the arc
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, radius, startAngle, endAngle, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const drawAngleArcB = (ctx, vertex, p1, p2, radius, color) => {
    // Special handling for vertex B
    const v1x = p1.x - vertex.x;
    const v1y = p1.y - vertex.y;
    const v2x = p2.x - vertex.x;
    const v2y = p2.y - vertex.y;
    
    const angle1 = Math.atan2(v1y, v1x);
    const angle2 = Math.atan2(v2y, v2x);
    
    // For B, swap the angles to get interior arc
    let startAngle = angle2;
    let endAngle = angle1;
    
    // Draw the arc
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, radius, startAngle, endAngle, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const drawTriangleShape = (ctx, points) => {
    ctx.beginPath();
    ctx.moveTo(points.A.x, points.A.y);
    ctx.lineTo(points.B.x, points.B.y);
    ctx.lineTo(points.C.x, points.C.y);
    ctx.lineTo(points.A.x, points.A.y);
    ctx.closePath();
    
    // Fill triangle
    ctx.fillStyle = 'rgba(102, 126, 234, 0.15)';
    ctx.fill();
    
    // Stroke triangle
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  const drawPoints = (ctx, points) => {
    const pointLabels = Object.keys(points);
    
    pointLabels.forEach((label) => {
      const point = points[label];
      
      // Draw point circle
      ctx.beginPath();
      ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#667eea';
      ctx.fill();
      
      // Draw point border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw point label with special positioning for C
      ctx.fillStyle = '#333';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      
      if (label === 'C') {
        // For point C, place the label below the point
        ctx.fillText(label, point.x, point.y + 40);
      } else {
        // For points A and B, place above as usual
        ctx.fillText(label, point.x, point.y - 25);
      }
    });
  };

  const drawAngleValues = (ctx, points, angles) => {
    ctx.fillStyle = '#333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    
    // Calculate triangle center
    const centerX = (points.A.x + points.B.x + points.C.x) / 3;
    const centerY = (points.A.y + points.B.y + points.C.y) / 3;
    
    // Draw angle values - all towards center (inside triangle)
    const angleLabels = Object.keys(angles);
    angleLabels.forEach(label => {
      const point = points[label];
      const angle = angles[label];
      
      // Use original offset calculation for all points (towards center)
      const offset = getAngleTextOffset(point, centerX, centerY, 60);
      
      // Draw white background circle for text
      ctx.beginPath();
      ctx.arc(point.x + offset.x, point.y + offset.y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw angle text
      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(`${angle}°`, point.x + offset.x, point.y + offset.y + 6);
    });
  };

  return (
    <div className="triangle-canvas-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="triangle-canvas"
      />
    </div>
  );
};

export default TriangleCanvas;