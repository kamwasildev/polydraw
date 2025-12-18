import type { Rectangle } from './Shapes';

export type DrawingState = Rectangle & {
  startX: number;
  startY: number;
};
