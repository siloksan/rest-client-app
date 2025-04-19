import { GET } from './route';
import { base64ToBytes } from '@/utils/converterBase64';
import { Mock } from 'vitest';

vi.mock('@/utils/converterBase64', () => ({
  base64ToBytes: vi.fn(),
}));

global.fetch = vi.fn();

describe('Api route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    {
      method: 'GET',
      expected: {
        status: 200,
        data: { success: true },
      },
    },
    {
      method: 'DELETE',
      expected: {
        status: 200,
        data: { success: true },
      },
    },
  ])('Route: s%', async ({ method, expected }) => {
    const testUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const fakeData = {
      json: async () => expected.data,
      status: expected.status,
    };

    (base64ToBytes as Mock).mockReturnValueOnce(
      new TextEncoder().encode(testUrl)
    );

    (fetch as Mock).mockReturnValueOnce(fakeData);

    const params = Promise.resolve({
      slug: [
        method,
        'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE=',
      ],
    });
    const response = await GET(new Request('https://test.com'), { params });
    const data = await response.json();

    expect(data).toEqual({
      status: expected.status,
      data: expected.data,
    });
  });

  it('Route: POST', async () => {
    const testUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const testBody = JSON.stringify({
      title: 'fakeTitle',
      userId: 1,
      body: 'fakeMessage',
    });

    const fakeData = {
      json: async () => ({ success: true }),
      status: 201,
    };

    (fetch as Mock).mockReturnValueOnce(fakeData);

    (base64ToBytes as Mock)
      .mockReturnValueOnce(new TextEncoder().encode(testUrl))
      .mockReturnValueOnce(new TextEncoder().encode(testBody));

    const params = Promise.resolve({
      slug: [
        'POST',
        'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE=',
        'eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=',
      ],
    });

    const response = await GET(new Request('https://test.com'), { params });
    const data = await response.json();

    expect(data).toEqual({
      data: { success: true },
      status: 201,
    });
  });

  it('Route: Error', async () => {
    const testUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    (base64ToBytes as Mock).mockReturnValueOnce(
      new TextEncoder().encode(testUrl)
    );

    (fetch as Mock).mockRejectedValueOnce(new Error('Test error'));

    const params = Promise.resolve({
      slug: [
        'GET',
        'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzE=',
      ],
    });
    const response = await GET(new Request('https://test.com'), { params });
    const data = await response.json();

    expect(data).toEqual({
      status: 'Error',
      data: { message: `Couldn't resolve the hostname to an IP address` },
    });
  });
});
