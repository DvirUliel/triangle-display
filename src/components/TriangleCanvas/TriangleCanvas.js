import React, { useRef, useEffect } from 'react';
import './TriangleCanvas.css';

const TriangleCanvas = ({ points, angles, width = 800, height = 800 }) => {
  const canvasRef = useRef(null);

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
    
    // Convert coordinates to Canvas coordinate system (flip Y axis)
    const canvasPoints = {
      A: { x: points.A.x, y: canvas.height - points.A.y },
      B: { x: points.B.x, y: canvas.height - points.B.y },
      C: { x: points.C.x, y: canvas.height - points.C.y }
    };
    
    // Draw triangle using corrected coordinates
    drawTriangleShape(ctx, canvasPoints);
    drawAngleArcs(ctx, canvasPoints);
    drawAngleValues(ctx, canvasPoints, angles);
    drawPoints(ctx, canvasPoints);
  };

  const drawAngleArcs = (ctx, points) => {
    const radius = 35;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    // Draw angle arcs for each vertex
    drawAngleArc(ctx, points.A, points.B, points.C, radius, colors[0]);
    drawAngleArcB(ctx, points.B, points.A, points.C, radius, colors[1]);
    drawAngleArc(ctx, points.C, points.A, points.B, radius, colors[2]);
  };

  const drawAngleArc = (ctx, vertex, p1, p2, radius, color) => {
    const v1x = p1.x - vertex.x;
    const v1y = p1.y - vertex.y;
    const v2x = p2.x - vertex.x;
    const v2y = p2.y - vertex.y;
    
    const angle1 = Math.atan2(v1y, v1x);
    const angle2 = Math.atan2(v2y, v2x);
    
    let startAngle = angle1;
    let endAngle = angle2;
    
    let diff = endAngle - startAngle;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    
    if (Math.abs(diff) > Math.PI) {
      [startAngle, endAngle] = [endAngle, startAngle];
    }
    
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, radius, startAngle, endAngle, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const drawAngleArcB = (ctx, vertex, p1, p2, radius, color) => {
    const v1x = p1.x - vertex.x;
    const v1y = p1.y - vertex.y;
    const v2x = p2.x - vertex.x;
    const v2y = p2.y - vertex.y;
    
    const angle1 = Math.atan2(v1y, v1x);
    const angle2 = Math.atan2(v2y, v2x);
    
    let startAngle = angle2;
    let endAngle = angle1;
    
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
    
    ctx.fillStyle = 'rgba(102, 126, 234, 0.15)';
    ctx.fill();
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  const drawPoints = (ctx, points) => {
    const pointLabels = Object.keys(points);
    
    pointLabels.forEach((label) => {
      const point = points[label];
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#667eea';
      ctx.fill();
      
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.fillStyle = '#333';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(label, point.x, point.y - 25);
    });
  };

  const drawAngleValues = (ctx, points, angles) => {
    ctx.fillStyle = '#333';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    
    // Calculate triangle center for INTERIOR positioning only
    const centerX = (points.A.x + points.B.x + points.C.x) / 3;
    const centerY = (points.A.y + points.B.y + points.C.y) / 3;
    
    const angleLabels = Object.keys(angles);
    angleLabels.forEach(label => {
      const point = points[label];
      const angle = angles[label];
      
      // Position angle text towards triangle interior
      const dx = centerX - point.x;
      const dy = centerY - point.y;
      const length = Math.sqrt(dx * dx + dy * dy) || 1;
      
      // Use smaller offset to keep inside triangle
      const distance = 40;
      const offsetX = (dx / length) * distance;
      const offsetY = (dy / length) * distance;
      
      ctx.beginPath();
      ctx.arc(point.x + offsetX, point.y + offsetY, 20, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = '#333';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`${angle}°`, point.x + offsetX, point.y + offsetY + 4);
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