'use client';

import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

const RestClient = dynamic(
  () => import('../../../components/pages/rest-client'),
  {
    loading: () => <CircularProgress size="3rem" sx={{ margin: 'auto' }} />,
  }
);

export default function Layout() {
  return <RestClient />;
}
