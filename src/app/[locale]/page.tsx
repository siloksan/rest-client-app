import { WelcomeSection } from '@/components/welcome-section/welcome-section';
import { createServerSupabase } from '@/db/create-server';

export default async function Home() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();

  const userName = data?.user?.user_metadata?.username;

  return <WelcomeSection username={userName} />;
}
