export type Rectangle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

export type Point = { x: number; y: number };

export type Polygon = {
  id: string;
  points: Point[];
  color: string;
};
