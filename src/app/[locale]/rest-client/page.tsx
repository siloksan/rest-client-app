import { ROUTES } from '@/constants';
import { CheckAuth } from '@/utils/check-auth';
import Typography from '@mui/material/Typography';

async function Page() {
  return <Typography>Rest Client - only for authorized users</Typography>;
}

export default CheckAuth(Page, ROUTES.SIGNIN);
