import { render, screen } from '@testing-library/react';
import { NavBar } from './navbar';
import { ROUTES } from '@/constants';

describe('NavBar', () => {
  it('should render the NavBar component', () => {
    render(<NavBar />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', ROUTES.REST_CLIENT);
    expect(links[1]).toHaveAttribute('href', ROUTES.HISTORY);
    expect(links[2]).toHaveAttribute('href', ROUTES.VARIABLE);
  });
});
