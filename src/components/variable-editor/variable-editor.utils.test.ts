import {
  deleteVariableFromLocalStorage,
  addVariableToLocalStorage,
  updateVariableInLocalStorage,
} from './variable-editor.utils';
import { Variable } from '@/types';

describe('deleteVariableFromLocalStorage', () => {
  it('should remove the variable with the specified key from the stored variables', () => {
    const mockSet = vi.fn();
    const variable = { key: '1', name: 'name1', value: 'value1' };
    const storedVariables: Variable[] = [variable];

    deleteVariableFromLocalStorage(variable.key, storedVariables, mockSet);

    expect(mockSet).toHaveBeenCalledWith([]);
  });
});

describe('addVariableToLocalStorage', () => {
  it('should add a new variable to the stored variables', () => {
    const mockSet = vi.fn();
    const variable = { key: '1', name: 'name1', value: 'value1' };
    const storedVariables: Variable[] = [];

    addVariableToLocalStorage(variable, storedVariables, mockSet);

    expect(mockSet).toHaveBeenCalledWith([variable]);
  });
});

describe('updateVariableInLocalStorage', () => {
  it('should update an existing variable in the stored variables', () => {
    const mockSet = vi.fn();
    const variable = { key: '1', name: 'name1', value: 'value1' };
    const newValue = 'newValue1';
    const storedVariables: Variable[] = [variable];

    updateVariableInLocalStorage(
      { ...variable, value: newValue },
      storedVariables,
      mockSet
    );

    expect(mockSet).toHaveBeenCalledWith([{ ...variable, value: newValue }]);
  });
});
