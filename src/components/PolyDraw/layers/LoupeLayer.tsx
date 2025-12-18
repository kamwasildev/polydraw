import { useBackgroundStore } from '../store/backgroundStore';
import { useShapeStore } from '../store/shapeStore';
import type { LoupeState } from '../types/LoupeState';

import BackgroundLayer from './BackgroundLayer';

type Props = {
  loupe: LoupeState | null;
};

const LOUPE_RADIUS = 32;
const LOUPE_ZOOM = 2;
const LOUPE_MARGIN = 4;
const CLIP_PATH_ID = 'loupe-clip-path';

const LoupeLayer = ({ loupe }: Props) => {
  const selectedPolygonId = useShapeStore((s) => s.selectedPolygonId);
  const polygons = useShapeStore((state) => state.polygons);
  const backgroundWidth = useBackgroundStore((state) => state.image?.width ?? 600);

  if (!loupe) {
    return null;
  }

  const loupeX =
    loupe.corner === 'topLeft' ? LOUPE_RADIUS * 2 + LOUPE_MARGIN : backgroundWidth - LOUPE_RADIUS * 2 - LOUPE_MARGIN;
  const loupeY = LOUPE_RADIUS * 2 + LOUPE_MARGIN;

  return (
    <g pointerEvents="none">
      <defs>
        <clipPath id={CLIP_PATH_ID}>
          <circle cx={loupe.sourceX} cy={loupe.sourceY} r={LOUPE_RADIUS} />
        </clipPath>
      </defs>

      <g transform={`translate(${loupeX}, ${loupeY})`}>
        <g
          clipPath={`url(#${CLIP_PATH_ID})`}
          transform={`scale(${LOUPE_ZOOM}) translate(${-loupe.sourceX}, ${-loupe.sourceY})`}
        >
          <BackgroundLayer />

          {Object.values(polygons).map((p) => (
            <polygon
              key={p.id}
              points={p.points.map((pt) => `${pt.x},${pt.y}`).join(' ')}
              fill={p.color}
              stroke={p.color}
              fillOpacity={selectedPolygonId === p.id ? 0 : 0.25}
              strokeWidth={2}
            />
          ))}
        </g>
      </g>
    </g>
  );
};

export default LoupeLayer;
