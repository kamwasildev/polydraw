import type { DrawingState } from '../types/DrawingState';

type Props = {
  drawing: DrawingState | null;
};

const DrawingLayer = ({ drawing }: Props) => {
  if (!drawing) {
    return null;
  }

  return (
    <rect
      x={drawing.x}
      y={drawing.y}
      width={drawing.width}
      height={drawing.height}
      fill={drawing.color}
      fillOpacity={0.25}
      stroke={drawing.color}
      strokeWidth={2}
      strokeDasharray="4"
    />
  );
};

export default DrawingLayer;
