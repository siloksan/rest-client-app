import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, Mock } from 'vitest';
import { VariableEditor } from './variable-editor';
import { useLocalStorage } from '@/hooks';
import userEvent from '@testing-library/user-event';
import { v4 as uuidv4 } from 'uuid';
import {
  addVariableToLocalStorage,
  deleteVariableFromLocalStorage,
  updateVariableInLocalStorage,
} from './variable-editor.utils';

vi.mock('uuid', () => ({
  v4: vi.fn(),
}));

vi.mock('./variable-editor.utils', () => ({
  addVariableToLocalStorage: vi.fn(),
  deleteVariableFromLocalStorage: vi.fn(),
  updateVariableInLocalStorage: vi.fn(),
}));

describe('VariableEditor', () => {
  const addButtonText = 'VariablesPage.buttons.addField';
  const mockSetStoredValue = vi.fn();

  beforeEach(() => {
    (useLocalStorage as Mock).mockReturnValue({
      storedValue: [],
      setStoredValue: vi.fn(),
      initialized: true,
    });
  });

  it('renders without crashing', () => {
    render(<VariableEditor />);
    expect(
      screen.getByRole('button', { name: addButtonText })
    ).toBeInTheDocument();
  });

  it('adds a new field when "Add Field" button is clicked', async () => {
    render(<VariableEditor />);

    const field = screen.getByLabelText(/name/i);
    const addButton = screen.getByRole('button', { name: addButtonText });

    await userEvent.click(addButton);

    expect(field).toHaveValue('');
  });

  it('should add new variable', async () => {
    const variableData = { key: '1', name: 'Test', value: 'Value' };
    (uuidv4 as Mock).mockReturnValue(variableData.key);
    (useLocalStorage as Mock).mockReturnValue({
      storedValue: [],
      setStoredValue: mockSetStoredValue,
      initialized: true,
    });

    render(<VariableEditor />);

    const fieldName = screen.getByLabelText(/name/i);
    const fieldValue = screen.getByLabelText(/value/i);
    expect(fieldName).toHaveValue('');
    expect(fieldValue).toHaveValue('');

    await userEvent.type(fieldName, variableData.name);
    await userEvent.type(fieldValue, variableData.value);
    const addButton = screen.getByLabelText(/add/i);
    expect(addButton).not.toBeDisabled();

    await userEvent.click(addButton);

    expect(addVariableToLocalStorage).toHaveBeenCalledWith(
      variableData,
      [],
      mockSetStoredValue
    );
  });

  it('updates fields when variable name is changed', async () => {
    const variableData = { key: '1', name: 'Test', value: 'Value' };
    const newVariableName = 'Updated Name';
    (useLocalStorage as Mock).mockReturnValue({
      storedValue: [variableData],
      setStoredValue: mockSetStoredValue,
      initialized: true,
    });

    render(<VariableEditor />);

    const field = screen.getByLabelText(/name/i);
    expect(field).toHaveValue(variableData.name);
    await userEvent.clear(field);
    await userEvent.type(field, newVariableName);

    const updateBtn = screen.getByLabelText('add');
    await userEvent.click(updateBtn);

    expect(updateVariableInLocalStorage).toHaveBeenCalledWith(
      { ...variableData, name: newVariableName },
      [variableData],
      mockSetStoredValue
    );
  });

  it('should delete a variable', async () => {
    const variableData = { key: '1', name: 'Test', value: 'Value' };

    (useLocalStorage as Mock).mockReturnValue({
      storedValue: [variableData],
      setStoredValue: mockSetStoredValue,
      initialized: true,
    });

    render(<VariableEditor />);

    const field = screen.getByLabelText(/name/i);
    expect(field).toHaveValue(variableData.name);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
    expect(deleteVariableFromLocalStorage).toHaveBeenCalledWith(
      variableData.key,
      [variableData],
      mockSetStoredValue
    );
  });
});
