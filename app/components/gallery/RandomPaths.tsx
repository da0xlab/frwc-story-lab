import React, { useState, useEffect, useRef } from 'react';

const CharacterInteractions = ({ roles, actions, places }: any) => {
  const [paths, setPaths] = useState([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    generatePaths();
    window.addEventListener('resize', generatePaths);
    return () => {
      window.removeEventListener('resize', generatePaths);
    };
  }, [roles, actions, places]);

  const generatePaths = () => {
    const svg: any = svgRef.current;
    const width = svg.clientWidth;
    
    // Calculate height based on the number of paths
    const baseHeight = 100;
    const additionalHeightPerPath = 30;
    const involvedEntitiesCount = [
      ...Object.values(roles).filter(Boolean),
      ...Object.values(actions).filter(Boolean),
      ...Object.values(places).filter(Boolean),
    ].length;

    const height = baseHeight + (additionalHeightPerPath * (involvedEntitiesCount - 1));

    const newPaths: any = [];
    const involvedEntities = [
      ...Object.values(roles).filter(Boolean).map((role: any) => role.name),
      ...Object.values(actions).filter(Boolean).map((action: any) => action.name),
      ...Object.values(places).filter(Boolean).map((place: any) => place.name),
    ];

    const mainPath: any = generateCharacterPath(0, width, height, involvedEntities.length, true);
    newPaths.push(mainPath);

    for (let i = 1; i < involvedEntities.length; i++) {
      const path = generateCharacterPath(i, width, height, involvedEntities.length, false, mainPath);
      newPaths.push(path);
    }

    setPaths(newPaths);
    svg.style.height = `${height}px`;  // Adjust the SVG height dynamically
  };

  const generateCharacterPath = (index: any, width: any, height: any, numEntities: any, isMainPath = false, mainPath = null) => {
    const path = [];
    const steps = 10;
    const timeStep = width / steps;

    if (isMainPath) {
      const startY = 10;
      const endY = height - 10;
      const stepY = (endY - startY) / steps;
      let currentY = startY;

      for (let i = 0; i <= steps; i++) {
        const x = timeStep * i;
        path.push({ x, y: currentY });
        currentY += stepY;
      }
    } else {
      const startY = Math.random() * (height - 20) + 10;
      let currentY = startY;
      let crossStep = Math.floor(Math.random() * (steps - 2)) + 1;

      for (let i = 0; i <= steps; i++) {
        const x = timeStep * i;

        if (i === crossStep && mainPath) {
          currentY = (mainPath[i] as { y: number }).y;
        } else {
          currentY += (Math.random() - 0.5) * 30;
          currentY = Math.max(10, Math.min(height - 10, currentY));
        }

        path.push({ x, y: currentY });
      }
    }

    return path;
  };

  return (
    <div>
      <svg ref={svgRef} style={{ width: '100%', border: '1px solid black' }}>
        {paths.map((path, i) => (
          <path
            key={i}
            d={generatePathD(path)}
            fill="none"
            stroke={i === 0 ? '#FF0000' : `hsl(${(i * 360) / paths.length}, 70%, 50%)`}
            strokeWidth={i === 0 ? 3 : 2}
          />
        ))}
      </svg>
    </div>
  );
};

const generatePathD = (points: any) => {
  const d = points.map((point: any, i: any) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    return `L ${point.x},${point.y}`;
  }).join(' ');

  return d;
};

export default CharacterInteractions;
