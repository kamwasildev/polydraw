import { create } from 'zustand';

import testBackground from '../assets/test-img1.jpg';
import type { BackgroundImage } from '../types/BackgroundImage';

type BackgroundState = {
  image: BackgroundImage | null;
  setImage: (image: BackgroundImage | null) => void;
};

const defaultImage: BackgroundImage = {
  src: testBackground,
  width: 600,
  height: 400,
};

export const useBackgroundStore = create<BackgroundState>((set) => ({
  image: defaultImage,
  setImage: (image) => set({ image }),
}));
