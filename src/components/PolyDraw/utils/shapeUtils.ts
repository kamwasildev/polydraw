import type { Point, Polygon, Rectangle } from '../types/Shapes';

export const rectangleToPolygon = (rect: Rectangle): Polygon => {
  const points: Point[] = [
    { x: rect.x, y: rect.y },
    { x: rect.x + rect.width, y: rect.y },
    { x: rect.x + rect.width, y: rect.y + rect.height },
    { x: rect.x, y: rect.y + rect.height },
  ];

  return {
    id: rect.id,
    points,
    color: rect.color,
  };
};
