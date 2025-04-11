import { Variable } from '@/types';
import { replaceVariables } from './replace-variables';

describe('replaceVariables', () => {
  const variable = { key: '1', name: 'nameTest', value: 'valueTest' };
  const variables = [variable];

  it('should replace variables with their corresponding values', () => {
    const input = 'http://example.com/{{nameTest}}/test';
    const result = replaceVariables(input, variables);
    expect(result).toBe('http://example.com/valueTest/test');
  });

  it('should return the input string unchanged if no variables are provided', () => {
    const input = 'http://example.com/{{nameTest}}/test';
    const variables: Variable[] = [];
    const result = replaceVariables(input, variables);
    expect(result).toBe(input);
  });

  it('should handle an empty input string', () => {
    const input = '';
    const result = replaceVariables(input, variables);
    expect(result).toBe(input);
  });
});
