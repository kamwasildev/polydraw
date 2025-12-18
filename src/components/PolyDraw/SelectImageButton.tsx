import React from 'react';

import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { Button } from '@mui/material';

type Props = {
  onFileSelected: (file: File) => void;
  loading?: boolean;
};

const SelectImageButton = ({ onFileSelected, loading }: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <Button component="label" variant="contained" startIcon={<WallpaperIcon />} loading={loading}>
      Select image
      <input type="file" accept="image/*" hidden onChange={onChange} />
    </Button>
  );
};

export default SelectImageButton;
