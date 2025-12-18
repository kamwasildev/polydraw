import { Box } from '@mui/material';

import DrawingCanvas from './DrawingCanvas';
import DrawingDetails from './DrawingDetails';
import DrawingToolbar from './DrawingToolbar';

export default function ShapeDraw() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <DrawingCanvas />
      <DrawingToolbar />
      <DrawingDetails />
    </Box>
  );
}
