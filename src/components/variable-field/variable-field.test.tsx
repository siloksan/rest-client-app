import { render, screen } from '@testing-library/react';
import { VariableField } from './variable-field';
import { Variable } from '@/types';
import userEvent from '@testing-library/user-event';

describe('VariableField', () => {
  const mockDeleteVariable = vi.fn();
  const mockAddVariable = vi.fn();
  const mockUpdateVariable = vi.fn();
  const key = '1';
  const name = 'testName';
  const value = 'testValue';

  const defaultProps = {
    variableName: name,
    variableValue: value,
    deleteVariable: mockDeleteVariable,
    addVariable: mockAddVariable,
    updateVariable: mockUpdateVariable,
    variables: [{ key, name, value }] as Variable[],
    idx: key,
  };

  it('renders the component with initial values', () => {
    render(<VariableField {...defaultProps} />);

    expect(screen.getByLabelText(/name/i)).toHaveValue(name);
    expect(screen.getByLabelText(/value/i)).toHaveValue(value);
  });

  it('calls updateVariable when save button is clicked and variable exists', async () => {
    render(<VariableField {...defaultProps} />);

    const newName = 'updatedName';
    const newValue = 'updatedValue';

    const nameInput = screen.getByLabelText(/name/i);
    const valueInput = screen.getByLabelText(/value/i);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, newName);

    await userEvent.clear(valueInput);
    await userEvent.type(valueInput, newValue);

    const saveButton = screen.getByLabelText(/add/i);
    await userEvent.click(saveButton);

    expect(mockUpdateVariable).toHaveBeenCalledWith({
      key,
      name: newName,
      value: newValue,
    });
  });

  it('calls addVariable when save button is clicked and variable does not exist', async () => {
    const newName = 'updatedName';
    const newValue = 'updatedValue';

    const props = {
      ...defaultProps,
      variables: [],
    };

    render(<VariableField {...props} />);

    const nameInput = screen.getByLabelText(/name/i);
    const valueInput = screen.getByLabelText(/value/i);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, newName);

    await userEvent.clear(valueInput);
    await userEvent.type(valueInput, newValue);

    const saveButton = screen.getByLabelText(/add/i);
    await userEvent.click(saveButton);

    expect(mockAddVariable).toHaveBeenCalledWith({
      key,
      name: newName,
      value: newValue,
    });
  });

  it('calls deleteVariable when delete button is clicked', async () => {
    render(<VariableField {...defaultProps} />);

    const deleteButton = screen.getByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    expect(mockDeleteVariable).toHaveBeenCalledWith(key);
  });
});
