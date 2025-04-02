import { render, screen } from '@testing-library/react';
import { Footer } from "./footer";

describe('footer', () => {
  it('should render Footer component without crash', () => {
    render(
      <Footer/>
    )

    expect(screen.getByText('©2025')).toBeDefined();
  });

});
