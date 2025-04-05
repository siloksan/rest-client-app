import { Variable } from '@/types';

export function deleteVariableFromLocalStorage(
  variableKey: string,
  storedVariables: Variable[],
  set: (value: Variable[]) => void
) {
  const updatedVariables = storedVariables.filter(
    (variable) => variable.key !== variableKey
  );

  set(updatedVariables);
}

export function addVariableToLocalStorage(
  variable: Variable,
  storedVariables: Variable[],
  set: (value: Variable[]) => void
) {
  const updatedVariables = [...storedVariables, variable];
  set(updatedVariables);
}

export function updateVariableInLocalStorage(
  variable: Variable,
  storedVariables: Variable[],
  set: (value: Variable[]) => void
) {
  const updatedVariables = storedVariables.map((storedVariable) => {
    if (storedVariable.key === variable.key) {
      return variable;
    }

    return storedVariable;
  });

  set(updatedVariables);
}
