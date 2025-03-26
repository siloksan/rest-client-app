'use client';

import {
  hideSnackbar,
  useSnackbarStore,
} from '@/store/snackbar/snackbar-store';
import { Snackbar, Typography } from '@mui/material';

export function SnackbarContainer() {
  const { open, content, autoHideDuration, position } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      onClose={hideSnackbar}
      autoHideDuration={autoHideDuration}
      anchorOrigin={position}
    >
      {typeof content === 'string' ? (
        <Typography>{content}</Typography>
      ) : (
        content
      )}
    </Snackbar>
  );
}
