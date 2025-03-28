import { WelcomeSection } from '@/components/welcome-section/welcome-section';
import { createServerSupabase } from '@/db/create-server';
import Container from '@mui/material/Container';

export default async function Home() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();

  const userName = data?.user?.user_metadata?.username;

  return (
    <Container>
      <WelcomeSection username={userName} />
    </Container>
  );
}
