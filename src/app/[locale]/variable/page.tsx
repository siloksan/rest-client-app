'use client';

import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

const VariablePage = dynamic(
  () => import('../../../components/pages/variables'),
  {
    loading: () => <CircularProgress size="3rem" sx={{ margin: 'auto' }} />,
  }
);

export default function Page() {
  return <VariablePage />;
}
