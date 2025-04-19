import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeEditor } from './code-editor';

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange?: (value: string) => void;
  }) => <textarea value={value} onChange={(e) => onChange?.(e.target.value)} />,
}));

describe('CodeEditor', () => {
  const formatBtnName = 'RestClient.CodeEditor.buttonFormat';

  it('should render not editable CodeEditor component', async () => {
    render(<CodeEditor value={''} extensions={[]} editable={false} />);
    expect(screen.queryByText(formatBtnName)).toBeNull();
  });

  it('should change body type', async () => {
    const mockedSetBodyType = vi.fn();
    render(<CodeEditor value={''} editable setBodyType={mockedSetBodyType} />);
    const jsonBtn = screen.getByRole('button', { name: 'JSON' });
    expect(jsonBtn).toBeInTheDocument();
    jsonBtn.click();
    expect(mockedSetBodyType).toBeCalledWith('json');
  });

  it('should correct format JSON content', async () => {
    const mockedHandler = vi.fn();
    render(
      <CodeEditor
        value={'{"key":1}'}
        editable
        bodyType="json"
        handler={mockedHandler}
      />
    );

    const formatBtn = screen.getByText(formatBtnName);
    expect(formatBtn).toBeInTheDocument();
    formatBtn.click();
    expect(mockedHandler).toBeCalledWith(`{
  "key": 1
}`);

    await userEvent.keyboard('{Alt>}{Shift>}F{/Shift}{/Alt}');
    expect(mockedHandler).toBeCalledTimes(2);
  });
});
