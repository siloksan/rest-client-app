import { Registration } from '@/components/registration/registration';
import { CheckUserLoggedIn } from '@/utils/check-auth';

async function Signup() {
  return <Registration />;
}

export default CheckUserLoggedIn(Signup);
