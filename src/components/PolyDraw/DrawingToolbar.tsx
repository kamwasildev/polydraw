import { useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, Box, Button } from '@mui/material';

import useSelectImage from './hooks/useSelectImage';
import SelectImageButton from './SelectImageButton';
import { useBackgroundStore } from './store/backgroundStore';
import { useShapeStore } from './store/shapeStore';

const DrawingToolbar = () => {
  const { image, error, loading, handleFileChange } = useSelectImage();
  const selectedPolygonId = useShapeStore((state) => state.selectedPolygonId);
  const removePolygon = useShapeStore((state) => state.removePolygon);
  const removeAll = useShapeStore((state) => state.removeAll);
  const setBackgroundImage = useBackgroundStore((state) => state.setImage);

  useEffect(() => {
    if (image) {
      setBackgroundImage({
        src: image.src,
        width: image.width,
        height: image.height,
        fileName: image.file.name,
      });
      removeAll();
    }
  }, [image, removeAll, setBackgroundImage]);

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={1}>
        <SelectImageButton onFileSelected={(file) => handleFileChange(file)} loading={loading} />
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          disabled={selectedPolygonId == null}
          onClick={() => removePolygon(selectedPolygonId)}
          loading={loading}
        >
          Remove selected
        </Button>
        <Button
          startIcon={<DeleteForeverIcon />}
          variant="contained"
          color="error"
          onClick={removeAll}
          loading={loading}
        >
          Remove all
        </Button>
      </Box>
      {error != null && (
        <Box width="100%">
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </>
  );
};

export default DrawingToolbar;
