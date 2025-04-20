import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { CodeGenerator, CodeGeneratorProps } from './code-generator';
import { Methods } from '@/types';
import { useLocalStorage } from '@/hooks';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

vi.mock('../code-editor/code-editor', () => ({
  CodeEditor: vi.fn().mockImplementation(({ value }: { value: string }) => {
    return <div data-testid="code-editor-testid">{value}</div>;
  }),
}));

const CodeGeneratorWrapper = (
  props: Omit<CodeGeneratorProps, 'snippet' | 'setSnippet'>
) => {
  const [snippet, setSnippet] = useState('');
  return <CodeGenerator {...props} snippet={snippet} setSnippet={setSnippet} />;
};

describe('CodeGenerator', () => {
  const urlMock = 'https://api.test.com';
  const codeGenerateBtnName = 'RestClient.CodeGenerator.buttonGenerate';
  const errorMessage = 'RestClient.CodeGenerator.errorMessageInEditor';

  const mockProps: Omit<CodeGeneratorProps, 'snippet' | 'setSnippet'> = {
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

  it('should render CodeGenerator', async () => {
    render(<CodeGeneratorWrapper {...mockProps} />);

    expect(
      screen.getByRole('button', { name: codeGenerateBtnName })
    ).toBeInTheDocument();
  });

  it('should show an error message when request creation fails', async () => {
    const mockPropsWithEmptyUrl: Omit<
      CodeGeneratorProps,
      'snippet' | 'setSnippet'
    > = {
      ...mockProps,
      url: '',
    };

    render(<CodeGeneratorWrapper {...mockPropsWithEmptyUrl} />);

    const generateCodeButton = screen.getByRole('button', {
      name: codeGenerateBtnName,
    });

    await userEvent.click(generateCodeButton);

    const codeEditor = screen.getByTestId('code-editor-testid');
    expect(codeEditor).toBeInTheDocument();
    expect(codeEditor).toHaveTextContent(errorMessage);
  });

  it('generates code successfully', async () => {
    render(<CodeGeneratorWrapper {...mockProps} />);
    const generateCodeButton = screen.getByRole('button', {
      name: codeGenerateBtnName,
    });

    await userEvent.click(generateCodeButton);

    const codeEditor = screen.getByTestId('code-editor-testid');
    expect(codeEditor).toBeInTheDocument();
    expect(codeEditor).toHaveTextContent(urlMock);
  });
});
