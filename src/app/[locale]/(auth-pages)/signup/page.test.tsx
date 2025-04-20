import { render, screen } from '@testing-library/react';
import Signup from '../signup/page';

vi.mock('@/components/registration/registration', () => ({
  Registration: () => (
    <div data-testid="mock-registration">Mock Registration Component</div>
  ),
}));

describe('Signup Page', () => {
  it('renders the Registration component', () => {
    render(<Signup />);
    const registrationComponent = screen.getByTestId('mock-registration');
    expect(registrationComponent).toBeInTheDocument();
  });
});
