import Box from '@mui/material/Box';
import { useState } from 'react';
import { RestCard } from '../rest-card/rest-card';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/constants';

export function RestCards() {
  const [selectedCard, setSelectedCard] = useState(0);
  const translate = useTranslations('RestCards');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
        mt: 4,
        mb: 4,
      }}
    >
      <RestCard
        title={translate('client.title')}
        description={translate('client.description')}
        index={0}
        selectedCard={selectedCard}
        href={ROUTES.REST_CLIENT}
        setSelectedCard={setSelectedCard}
      />
      <RestCard
        title={translate('history.title')}
        description={translate('history.description')}
        index={1}
        selectedCard={selectedCard}
        href={ROUTES.HISTORY}
        setSelectedCard={setSelectedCard}
      />
      <RestCard
        title={translate('variable.title')}
        description={translate('variable.description')}
        index={2}
        selectedCard={selectedCard}
        href={ROUTES.VARIABLE}
        setSelectedCard={setSelectedCard}
      />
    </Box>
  );
}
