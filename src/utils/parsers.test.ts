import { parseJson } from './parsers';

describe('parsers', () => {
  it('should parse JSON successfully', () => {
    const input = '{"key":"value"}';
    const result = parseJson(input);
    expect(result).toStrictEqual([
      `{
  "key": "value"
}`,
      '',
    ]);
  });

  it('should parse JSON with error', () => {
    const input = '{"key":value}';
    const result = parseJson(input);
    expect(result).toStrictEqual([
      input,
      `Unexpected token 'v', "{"key":value}" is not valid JSON`,
    ]);
  });

  it('should parse JSON with exception', () => {
    vi.spyOn(JSON, 'parse').mockImplementation(() => {
      throw { message: 'test' };
    });

    const input = '{"key":value}';
    expect(() => parseJson(input)).toThrowError('test');
  });
});
