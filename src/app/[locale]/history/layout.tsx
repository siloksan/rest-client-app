import HistoryPage from './page';
import { createServerSupabase } from '@/db/create-server';

async function HistoryLayout() {
  const supabase = await createServerSupabase();

  const { data } = await supabase.auth.getUser();
  const user = data?.user?.email ?? 'default user';

  return <HistoryPage user={user} />;
}

export default HistoryLayout;
