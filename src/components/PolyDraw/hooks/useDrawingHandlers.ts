import { useCallback, useRef, useState } from 'react';

import { useBackgroundStore } from '../store/backgroundStore';
import { useShapeStore } from '../store/shapeStore';
import type { DraggingPoint } from '../types/DraggingPoint';
import type { DrawingState } from '../types/DrawingState';
import type { LoupeState } from '../types/LoupeState';
import { getNextColor } from '../utils/Colors';
import { rectangleToPolygon } from '../utils/shapeUtils';

export const useDrawingHandlers = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const backgroundWidth = useBackgroundStore((state) => state.image?.width ?? 600);

  const addPolygon = useShapeStore((s) => s.addPolygon);
  const selectPolygon = useShapeStore((s) => s.selectPolygon);

  const [drawing, setDrawing] = useState<DrawingState | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<DraggingPoint>(null);
  const [loupe, setLoupe] = useState<LoupeState | null>(null);

  const getPoint = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current!;
    const rect = svg.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startVertexDrag = useCallback(
    (polygonId: string, index: number, x: number, y: number) => {
      setLoupe({
        sourceX: x,
        sourceY: y,
        corner: x < backgroundWidth / 2 ? 'topRight' : 'topLeft',
      });

      setDraggingPoint({ polygonId, index });
    },
    [backgroundWidth],
  );

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (draggingPoint) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    const { x, y } = getPoint(e);

    setDrawing({
      id: crypto.randomUUID(),
      startX: x,
      startY: y,
      x,
      y,
      width: 0,
      height: 0,
      color: getNextColor(),
    });

    selectPolygon(null);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const { x, y } = getPoint(e);

    if (draggingPoint) {
      const { polygonId, index } = draggingPoint;

      useShapeStore.getState().updatePoint(polygonId, index, { x, y });

      setLoupe((l) => (l ? { ...l, sourceX: x, sourceY: y } : null));
      return;
    }

    if (!drawing) return;

    setDrawing((d) =>
      d
        ? {
            ...d,
            x: Math.min(d.startX, x),
            y: Math.min(d.startY, y),
            width: Math.abs(x - d.startX),
            height: Math.abs(y - d.startY),
          }
        : null,
    );
  };

  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (drawing && drawing.width > 0 && drawing.height > 0) {
      addPolygon(rectangleToPolygon(drawing));
    }

    setLoupe(null);
    setDrawing(null);
    setDraggingPoint(null);
  };

  const onPointerCancel = () => {
    setLoupe(null);
    setDrawing(null);
    setDraggingPoint(null);
  };

  return {
    svgRef,
    drawing,
    loupe,
    startVertexDrag,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
};
