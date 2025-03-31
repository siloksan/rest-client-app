'use client';

import { useRouter } from '@/i18n/navigation';
import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Custom404() {
  const router = useRouter();
  const translate = useTranslations('NotFoundPage');

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '24px',
        width: 460,
      }}
    >
      <Typography
        variant="h1"
        sx={{ mb: 10, textAlign: 'center', fontWeight: 700 }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 10, textAlign: 'center' }}>
        {translate('message')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Button
          variant="outlined"
          sx={{ width: '100%' }}
          onClick={() => {
            router.back();
          }}
        >
          {translate('goBack')}
        </Button>
        <Button
          variant="outlined"
          sx={{ width: '100%' }}
          onClick={() => {
            router.push('/');
          }}
        >
          {translate('goHome')}
        </Button>
      </Box>
    </Container>
  );
}
