import { Login } from '@/components/login/login';
import { CheckUserLoggedIn } from '@/utils/check-auth';

async function Signin() {
  return <Login />;
}

export default CheckUserLoggedIn(Signin);
