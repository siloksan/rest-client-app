export function base64ToBytes(base64: string): Uint8Array {
  let binString: string;

  try {
    binString = atob(base64);
  } catch {
    binString = '';
  }

  return Uint8Array.from(binString, (m) => m.codePointAt(0) ?? 0);
}

export function bytesToBase64(bytes: Uint8Array): string {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join('');
  return btoa(binString);
}
