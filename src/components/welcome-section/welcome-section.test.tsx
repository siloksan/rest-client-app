import { render, screen } from '@testing-library/react';
import { WelcomeSection } from './welcome-section';

vi.mock('../rest-cards/rest-cards', () => ({
  RestCards: () => <div data-testid="rest-cards" />,
}));

vi.mock('../developer-cards/developer-cards', () => ({
  DeveloperCards: () => <div data-testid="developer-cards" />,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: () => <div data-testid="test-link" />,
}));

describe('WelcomeSection', () => {
  it('should render welcome message for a logged in user', () => {
    render(<WelcomeSection username="testName" />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'MainPage.welcome_user' })
    ).toBeInTheDocument();
  });

  it('should render welcome message for a logged out user', () => {
    render(<WelcomeSection username={null} />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'MainPage.welcome_message',
      })
    ).toBeInTheDocument();
  });
});
