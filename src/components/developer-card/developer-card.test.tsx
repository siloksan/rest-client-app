import { render, screen } from '@testing-library/react';
import { DeveloperCard } from './developer-card';
import { AUTHORS } from '@/constants/authors';

describe('DeveloperCard', () => {
  it('renders the developer card with author details', () => {
    const nameSpace = 'Authors';
    const author = AUTHORS[0];
    render(<DeveloperCard author={author} />);

    expect(screen.getByText(`${nameSpace}.${author.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${nameSpace}.${author.role}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${nameSpace}.${author.description}`)
    ).toBeInTheDocument();
  });
});
