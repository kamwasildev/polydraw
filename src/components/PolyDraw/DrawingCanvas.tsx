import { useDrawingHandlers } from './hooks/useDrawingHandlers';
import BackgroundLayer from './layers/BackgroundLayer';
import DrawingLayer from './layers/DrawingLayer';
import LoupeLayer from './layers/LoupeLayer';
import PolygonsLayer from './layers/PolygonsLayer';
import { useBackgroundStore } from './store/backgroundStore';

const DrawingCanvas = () => {
  const { svgRef, drawing, loupe, startVertexDrag, handlers } = useDrawingHandlers();
  const backgroundImage = useBackgroundStore((state) => state.image);

  return (
    <svg
      ref={svgRef}
      width={backgroundImage?.width}
      height={backgroundImage?.height}
      {...handlers}
      style={{ cursor: 'crosshair', touchAction: 'none', border: '1px black solid' }}
    >
      <BackgroundLayer />
      <PolygonsLayer onStartVertexDrag={startVertexDrag} />
      <DrawingLayer drawing={drawing} />
      <LoupeLayer loupe={loupe} />
    </svg>
  );
};

export default DrawingCanvas;
