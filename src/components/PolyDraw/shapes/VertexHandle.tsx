import React from 'react';

import type { Point } from '../types/Shapes';

type Props = {
  point: Point;
  onClick: () => void;
};

const VertexHandle = React.memo(({ point, onClick }: Props) => {
  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={6}
      fill="orange"
      stroke="black"
      strokeWidth={1}
      style={{ cursor: 'move' }}
      onPointerDown={(e) => {
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        onClick();
      }}
    />
  );
});

export default VertexHandle;
