import { render, screen, waitFor } from '@testing-library/react';
import RestClient from './rest-client';
import { Field } from '../fields/fields';
import userEvent from '@testing-library/user-event';

const pushMock = vi.fn();

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange?: (value: string) => void;
  }) => <textarea value={value} onChange={(e) => onChange?.(e.target.value)} />,
}));

const mockUrlData: {
  method: string;
  url: string;
  body: string;
  headers: Field[];
} = {
  method: 'GET',
  url: 'https://test.com',
  headers: [
    {
      id: 0,
      isActive: true,
      fieldKey: 'Content-Type',
      value: 'application/json',
    },
  ],
  body: '{"key":"value"}',
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock('@/hooks/use-url-data', () => ({
  default: () => mockUrlData,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(() => ({
    storedValue: [],
    setStoredValue: vi.fn(),
    initialized: true,
  })),
}));

vi.mock('@/store/userAuth/userAuth-store', () => ({
  userAuthStore: () => ({ userData: { email: 'test@example.com' } }),
}));

vi.mock('@/hooks/use-debounce', () => ({
  default: (fn: () => void) => fn(),
}));

describe('RestClient', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('Rendering a RestClient based on url data', () => {
    render(<RestClient />);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByLabelText('URL')).toHaveValue('https://test.com');
  });

  it('Restoring headers from urls', () => {
    render(<RestClient />);

    expect(screen.getByDisplayValue('Content-Type')).toBeInTheDocument();
    expect(screen.getByDisplayValue('application/json')).toBeInTheDocument();
  });

  it('Changing the request method', async () => {
    render(<RestClient />);

    expect(screen.getByText('GET')).toBeInTheDocument();

    const select = screen.getByLabelText(/Method/i);

    await userEvent.click(select);
    const option = await screen.findByRole('option', { name: 'POST' });
    await userEvent.click(option);

    expect(screen.getByText('POST')).toBeInTheDocument();
  });

  it('Changing the url', async () => {
    render(<RestClient />);

    const inputUrl = screen.getByRole('textbox', { name: /url/i });

    expect(inputUrl).toHaveValue('https://test.com');
    await userEvent.clear(inputUrl);
    expect(inputUrl).toHaveValue('');
  });

  it('Switching between tabs', async () => {
    render(<RestClient />);

    const tabGeneration = screen.getByRole('tab', {
      name: /generator/i,
    });
    const tabBody = screen.getByRole('tab', {
      name: /body/i,
    });

    await userEvent.click(tabGeneration);

    expect(
      screen.getByRole('button', {
        name: /buttonGenerate/i,
      })
    ).toBeInTheDocument();

    await userEvent.click(tabBody);

    expect(
      screen.getByRole('button', {
        name: /format/i,
      })
    ).toBeInTheDocument();
  });

  it('fetch', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          status: 200,
          data: { message: 'Success' },
        }),
    });

    render(<RestClient />);

    const sendButton = screen.getByRole('button', { name: /send/i });

    await userEvent.click(sendButton);
    await waitFor(() => {
      expect(screen.getByText(/Success/)).toBeInTheDocument();
    });
  });
});
