import React from 'react';

import { useShapeStore } from '../store/shapeStore';

import VertexHandle from './VertexHandle';

type RectProps = {
  id: string;
  startVertexDrag: (polygonId: string, index: number, x: number, y: number) => void;
};

const Polygon = React.memo(({ id, startVertexDrag }: RectProps) => {
  const polygon = useShapeStore((state) => state.polygons[id]);
  const isSelected = useShapeStore((state) => state.selectedPolygonId === id);
  const selectPolygon = useShapeStore((state) => state.selectPolygon);

  if (!polygon) return null;

  const points = polygon.points.map((p) => `${p.x},${p.y}`).join(' ');

  const handleSelect = () => {
    selectPolygon(id);
  };

  return (
    <>
      <polygon
        points={points}
        fill={polygon.color}
        fillOpacity={isSelected ? 0 : 0.25}
        stroke={polygon.color}
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
        onPointerDown={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
      />
      {isSelected &&
        polygon.points.map((p, i) => (
          <VertexHandle key={i} point={p} onClick={() => startVertexDrag(id, i, p.x, p.y)} />
        ))}
    </>
  );
});

export default Polygon;
