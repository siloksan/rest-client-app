import { render, screen } from '@testing-library/react';
import Signin from './page';
import Signup from '../signup/page';

vi.mock('@/components/login/login', () => ({
  Login: () => <div data-testid="mock-login">Mock Login Component</div>,
}));

describe('Signin Page', () => {
  it('renders the Login component', () => {
    render(<Signin />);
    const loginComponent = screen.getByTestId('mock-login');
    expect(loginComponent).toBeInTheDocument();
  });

  vi.mock('@/components/login/login', () => ({
    Login: () => <div data-testid="mock-login">Mock Login Component</div>,
  }));

  vi.mock('@/components/registration/registration', () => ({
    Registration: () => (
      <div data-testid="mock-registration">Mock Registration Component</div>
    ),
  }));

  describe('Signin Page', () => {
    it('renders the Login component', () => {
      render(<Signin />);
      const loginComponent = screen.getByTestId('mock-login');
      expect(loginComponent).toBeInTheDocument();
    });
  });

  describe('Signup Page', () => {
    it('renders the Registration component', () => {
      render(<Signup />);
      const registrationComponent = screen.getByTestId('mock-registration');
      expect(registrationComponent).toBeInTheDocument();
    });
  });
});
