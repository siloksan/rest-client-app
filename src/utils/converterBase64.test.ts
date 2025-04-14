import { base64ToBytes, bytesToBase64 } from "./converterBase64";

describe('base64ToBytes', () => {
  it('if the base64 value is correct', () => {
    const str = 'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz';
    const expected = 'https://jsonplaceholder.typicode.com/posts';

    const result = base64ToBytes(str);
    const textDecode = new TextDecoder().decode(result);

    expect(textDecode).toBe(expected);
  })

  it('if the base64 value is incorrect', () => {
    const str = 'test-01';
    const expected = '';

    const result = base64ToBytes(str);
    const textDecode = new TextDecoder().decode(result);

    expect(textDecode).toBe(expected);
  })
})

describe('bytesToBase64', () => {
  it('Converting a Uint8Array to a string', () => {
    const str = 'https://jsonplaceholder.typicode.com/posts';
    const expected = 'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz';

    const strBytes = new TextEncoder().encode(str);

    expect(bytesToBase64(strBytes)).toBe(expected);
  })
})
