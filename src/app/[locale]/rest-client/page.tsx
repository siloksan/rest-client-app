import { RestClient } from '@/components/rest-client/rest-client';
import { ROUTES } from '@/constants';
import { CheckAuth } from '@/utils/check-auth';
import { Container } from '@mui/material';

async function Page() {
  return (
    <Container sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <RestClient />
    </Container>
  );
}

export default CheckAuth(Page, ROUTES.SIGNIN);
