import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { CodeGenerator, CodeGeneratorProps } from './code-generator';
import { Methods } from '@/types';
import { useLocalStorage } from '@/hooks';
import userEvent from '@testing-library/user-event';

vi.mock('../code-editor/code-editor', () => ({
  CodeEditor: vi.fn().mockImplementation(({ value }: { value: string }) => {
    return <div data-testid="code-editor-testid">{value}</div>;
  }),
}));

describe('CodeGenerator', () => {
  const urlMock = 'https://api.test.com';
  const mockProps: CodeGeneratorProps = {
    method: Methods.GET,
    url: urlMock,
    headers: [],
    body: '',
  };

  beforeEach(() => {
    (useLocalStorage as Mock).mockReturnValue({
      storedValue: [],
      setStoredValue: vi.fn(),
      initialized: true,
    });
  });

  it('renders the component', async () => {
    render(<CodeGenerator {...mockProps} />);
    expect(screen.getByText('Code Generator')).toBeInTheDocument();
    expect(screen.getByLabelText('Language')).toBeInTheDocument();
  });
  it('shows an error snackbar when request creation fails', async () => {
    const mockPropsWithEmptyUrl: CodeGeneratorProps = {
      ...mockProps,
      url: '',
    };

    render(<CodeGenerator {...mockPropsWithEmptyUrl} />);

    const generateCodeButton = screen.getByText(/Generate Code/i);
    await userEvent.click(generateCodeButton);

    expect(
      screen.getByText('// Please provide a valid data')
    ).toBeInTheDocument();
  });

  it('generates code successfully', async () => {
    render(<CodeGenerator {...mockProps} />);
    const generateCodeButton = screen.getByText(/Generate Code/i);
    await userEvent.click(generateCodeButton);

    const codeEditor = screen.getByTestId('code-editor-testid');
    expect(codeEditor).toBeInTheDocument();
    expect(codeEditor).toHaveTextContent(urlMock);
  });
});
