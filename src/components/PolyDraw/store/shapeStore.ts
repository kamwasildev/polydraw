import { create } from 'zustand';

import type { Point, Polygon } from '../types/Shapes';

type ShapeStore = {
  polygons: Record<string, Polygon>;
  selectedPolygonId: string | null;
  addPolygon: (polygon: Polygon) => void;
  selectPolygon: (id: string | null) => void;
  updatePoint: (polygonId: string, index: number, point: Point) => void;
  removePolygon: (id: string | null) => void;
  removeAll: () => void;
};

export const useShapeStore = create<ShapeStore>((set) => ({
  polygons: {},
  selectedPolygonId: null,
  addPolygon: (polygon) =>
    set((state) => ({
      polygons: { ...state.polygons, [polygon.id]: polygon },
    })),

  selectPolygon: (id) => set({ selectedPolygonId: id }),

  updatePoint: (polygonId, index, point) =>
    set((state) => {
      const polygon = state.polygons[polygonId];
      if (!polygon) {
        return state;
      }

      const points = [...polygon.points];
      points[index] = point;

      return {
        polygons: {
          ...state.polygons,
          [polygonId]: { ...polygon, points },
        },
      };
    }),

  removePolygon: (id) =>
    set((state) => {
      if (!id) return state;

      const { [id]: _, ...rest } = state.polygons;
      const isSelectedRemoved = state.selectedPolygonId === id;

      return {
        polygons: rest,
        selectedPolygonId: isSelectedRemoved ? null : state.selectedPolygonId,
      };
    }),

  removeAll: () => set({ polygons: {} }),
}));
