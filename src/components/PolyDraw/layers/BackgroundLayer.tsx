import { useBackgroundStore } from '../store/backgroundStore';

const BackgroundLayer = () => {
  const backgroundImage = useBackgroundStore((state) => state.image);

  if (!backgroundImage) {
    return null;
  }

  return <image href={backgroundImage.src} x={0} y={0} width={backgroundImage.width} height={backgroundImage.height} />;
};

export default BackgroundLayer;
