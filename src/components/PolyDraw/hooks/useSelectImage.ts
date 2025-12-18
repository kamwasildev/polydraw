import { useState, useCallback } from 'react';

export interface LoadedImage {
  file: File;
  src: string;
  width: number;
  height: number;
}

const useSelectImage = () => {
  const [image, setImage] = useState<LoadedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Selected file is not an image');
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        setImage({
          file,
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        setLoading(false);
      };

      img.onerror = () => {
        setError('Failed to load image');
        setLoading(false);
      };
    };

    reader.onerror = () => {
      setError('Failed to read file');
      setLoading(false);
    };
  }, []);

  return { image, loading, error, handleFileChange };
};

export default useSelectImage;
