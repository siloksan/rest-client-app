import { create } from 'zustand';
import { SnackbarOrigin, SnackbarProps } from '@mui/material/Snackbar';
import { ReactElement } from 'react';

interface SnackbarState {
  open: boolean;
  content: string | ReactElement;
  autoHideDuration?: number;
  position?: SnackbarOrigin;
}

export const useSnackbarStore = create<SnackbarState>(() => ({
  open: false,
  content: '',
  autoHideDuration: 3000,
  position: { vertical: 'bottom', horizontal: 'right' },
}));

export function showSnackbar(
  content: string | React.ReactElement,
  options?: Partial<Omit<SnackbarProps, 'autoHideDuration'>> & {
    autoHideDuration?: number;
  }
) {
  useSnackbarStore.setState({ open: true, content, ...options });
}

export function hideSnackbar() {
  useSnackbarStore.setState({ open: false });
}
