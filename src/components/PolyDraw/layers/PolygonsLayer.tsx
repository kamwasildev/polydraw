import { useMemo } from 'react';

import Polygon from '../shapes/Polygon';
import { useShapeStore } from '../store/shapeStore';

type Props = {
  onStartVertexDrag: (id: string, index: number, x: number, y: number) => void;
};

const PolygonsLayer = ({ onStartVertexDrag }: Props) => {
  const polygons = useShapeStore((state) => state.polygons);
  const polygonIds = useMemo(() => Object.keys(polygons), [polygons]);

  return (
    <>
      {polygonIds.map((id) => (
        <Polygon key={id} id={id} startVertexDrag={onStartVertexDrag} />
      ))}
    </>
  );
};

export default PolygonsLayer;
