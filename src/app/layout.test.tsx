import { render, screen } from '@testing-library/react';
import RootLayout, { generateMetadata } from './layout';
import { getTranslations } from 'next-intl/server';

vi.mock('next/font/google', () => ({
  Roboto: vi.fn().mockReturnValue(() => ({ variable: 'mock-font-variable' })),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => {
    const mockTranslations = {
      title: 'Test Title',
      description: 'Test Description',
    };
    return mockTranslations[key as keyof typeof mockTranslations];
  }),
}));

describe('RootLayout', () => {
  const childTestId = 'child';
  const ChildComponent = () => <div data-testid={childTestId} />;
  it('should render layout with children and user data', async () => {
    const element = await RootLayout({
      params: Promise.resolve({ locale: 'en' }),
      children: <ChildComponent />,
    });

    render(element);

    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
  });
});

describe('generateMetadata', () => {
  it('should return metadata with title and description', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    });

    expect(metadata).toEqual({
      title: 'Test Title',
      description: 'Test Description',
    });
    expect(getTranslations).toHaveBeenCalledWith({
      locale: 'en',
      namespace: 'Metadata',
    });
  });
});
