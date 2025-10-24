import React from 'react';

interface ConnectionLineProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  label?: string;
  isDashed?: boolean;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  isDashed = false
}) => {
  // Calculate control points for smooth curves
  const dx = targetX - sourceX;
  
  // Control points for bezier curve
  const cp1x = sourceX + dx * 0.5;
  const cp1y = sourceY;
  const cp2x = targetX - dx * 0.5;
  const cp2y = targetY;

  const pathData = `M ${sourceX} ${sourceY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

  return (
    <g>
      {/* Connection line */}
      <path
        d={pathData}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeDasharray={isDashed ? "5,5" : "none"}
        className="pointer-events-none"
      />
      
      {/* Connection circles at endpoints */}
      <circle
        cx={sourceX}
        cy={sourceY}
        r="4"
        fill="hsl(var(--primary))"
        className="pointer-events-none"
      />
      <circle
        cx={targetX}
        cy={targetY}
        r="4"
        fill="hsl(var(--primary))"
        className="pointer-events-none"
      />
      
      {/* Label */}
      {label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2 - 10}
          textAnchor="middle"
          className="text-xs fill-primary pointer-events-none"
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default ConnectionLine;
