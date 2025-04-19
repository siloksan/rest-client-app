import { render, screen } from '@testing-library/react';
import { SnackbarContainer } from './snackbar';
import { useSnackbarStore } from '@/store/snackbar/snackbar-store';
import { Mock } from 'vitest';

vi.mock('@/store/snackbar/snackbar-store', () => ({
  useSnackbarStore: vi.fn(),
  hideSnackbar: vi.fn(),
}));

describe('SnackbarContainer', () => {
  it('renders the Snackbar with string content', () => {
    (useSnackbarStore as unknown as Mock).mockReturnValue({
      open: true,
      content: 'Test message',
      autoHideDuration: 3000,
      position: { vertical: 'top', horizontal: 'center' },
    });

    render(<SnackbarContainer />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders the Snackbar with JSX content', () => {
    const testid = 'testid';
    const mockContent = <div data-testid={testid} />;
    (useSnackbarStore as unknown as Mock).mockReturnValue({
      open: true,
      content: mockContent,
      autoHideDuration: 3000,
      position: { vertical: 'top', horizontal: 'center' },
    });

    render(<SnackbarContainer />);

    expect(screen.getByTestId(testid)).toBeInTheDocument();
  });
});
