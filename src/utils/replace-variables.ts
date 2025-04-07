import { Variable } from '@/types';

export function replaceVariables(input: string, variables: Variable[]) {
  return input.replace(/{{(.*?)}}/g, (_, variableName) => {
    const variable = variables.find((v) => v.name === variableName.trim());
    return variable ? variable.value : `{{${variableName}}}`;
  });
}
