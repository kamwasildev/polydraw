import { useDeferredValue, useMemo, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';

import { useBackgroundStore } from './store/backgroundStore';
import { useShapeStore } from './store/shapeStore';

const DrawingDetails = () => {
  const polygons = useShapeStore((state) => state.polygons);
  const deferredPolygons = useDeferredValue(polygons);
  const backgroundImageName = useBackgroundStore((state) => state.image?.fileName);
  const [open, setOpen] = useState(false);

  const details = useMemo(() => {
    if (!open) {
      return '';
    }

    return JSON.stringify(deferredPolygons, null, 2);
  }, [deferredPolygons, open]);

  return (
    <Box width="100%">
      <Accordion expanded={open} onChange={(_, newExpanded) => setOpen(newExpanded)}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>Details</AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left ' }}>
          {backgroundImageName != null && <Typography variant="body1">File: {backgroundImageName}</Typography>}
          <Typography component="pre">{details}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DrawingDetails;
