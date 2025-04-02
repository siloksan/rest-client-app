import { useSnackbarStore, showSnackbar, hideSnackbar } from './snackbar-store';

describe('hideSnackbar', () => {
  it('should set open to true and update content in the snackbar store', () => {
    const content = 'Test message';

    showSnackbar(content);

    const state = useSnackbarStore.getState();
    expect(state.open).toBe(true);
    expect(state.content).toBe(content);
  });

  it('should set open to false in the snackbar store', () => {
    useSnackbarStore.setState({ open: true });

    hideSnackbar();

    const state = useSnackbarStore.getState();
    expect(state.open).toBe(false);
  });

  it('should update autoHideDuration and position if provided', () => {
    const content = 'Test message';
    const options = {
      autoHideDuration: 6000,
      position: { vertical: 'top', horizontal: 'center' },
    };

    showSnackbar(content, options);

    const state = useSnackbarStore.getState();
    expect(state.autoHideDuration).toBe(options.autoHideDuration);
    expect(state.position).toEqual(options.position);
  });
});
