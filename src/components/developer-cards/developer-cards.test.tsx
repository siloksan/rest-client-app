import { render, screen } from '@testing-library/react';
import { DeveloperCards } from './developer-cards';

describe('DeveloperCards', () => {
  it('renders the section title', () => {
    render(<DeveloperCards />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'MainPage.section_authors',
      })
    ).toBeInTheDocument();
  });
});
