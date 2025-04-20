import Box from '@mui/material/Box';
import { RestCard } from '../rest-card/rest-card';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/constants';

export function RestCards() {
  const translate = useTranslations('RestCards');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        mt: 4,
      }}
    >
      <RestCard
        title={translate('client.title')}
        description={translate('client.description')}
        href={ROUTES.REST_CLIENT}
      />
      <RestCard
        title={translate('history.title')}
        description={translate('history.description')}
        href={ROUTES.HISTORY}
      />
      <RestCard
        title={translate('variable.title')}
        description={translate('variable.description')}
        href={ROUTES.VARIABLE}
      />
    </Box>
  );
}
