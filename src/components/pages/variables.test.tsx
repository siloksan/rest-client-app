import { render, screen } from '@testing-library/react';
import VariablePage from './variables';

vi.mock('@/components/variable-editor/variable-editor', () => ({
  VariableEditor: () => <div data-testid="variable-editor" />,
}));

describe('VariablePage', () => {
  it('should render page title', () => {
    render(<VariablePage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'VariablesPage.title' })
    ).toBeInTheDocument();
    expect(screen.getByText('VariablesPage.description')).toBeInTheDocument();
  });
});
