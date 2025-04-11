'use client';

import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

const HistoryPage = dynamic(
  () => import('../../../components/pages/history-page'),
  {
    loading: () => <CircularProgress size="3rem" sx={{ margin: 'auto' }} />,
  }
);

export default function Page() {
  return <HistoryPage />;
}
