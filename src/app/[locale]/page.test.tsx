import { render, screen } from '@testing-library/react';
import Home from './page';
import { createServerSupabase } from '@/db/create-server';

vi.mock('@/db/create-server', () => ({
  createServerSupabase: vi.fn(),
}));

vi.mock('@/components/welcome-section/welcome-section', () => ({
  WelcomeSection: ({ username }: { username?: string }) => (
    <div data-testid="welcome">Welcome, {username}</div>
  ),
}));

describe('Home page', () => {
  it('should render WelcomeSection with username', async () => {
    const mockUsername = 'test_user';

    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            user: {
              user_metadata: {
                username: mockUsername,
              },
            },
          },
        }),
      },
    };

    (
      createServerSupabase as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockSupabase);

    render(await Home());

    expect(screen.getByTestId('welcome')).toHaveTextContent(
      `Welcome, ${mockUsername}`
    );
  });
});
