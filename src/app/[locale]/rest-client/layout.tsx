import { RestClient } from '@/components/rest-client/rest-client';
import { Container } from '@mui/material';

async function Page() {
  return (
    <Container sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <RestClient />
    </Container>
  );
}

export default Page;
