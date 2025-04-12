import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { DeveloperCard } from '../developer-card/developer-card';
import { AUTHORS } from '@/constants/authors';
import { useTranslations } from 'next-intl';

export function DeveloperCards() {
  const translate = useTranslations('MainPage');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        mt: 6,
      }}
    >
      <Typography variant="h3">{translate('section_authors')}</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          mt: 3,
        }}
      >
        {AUTHORS.map((author) => (
          <DeveloperCard key={author.name} author={author} />
        ))}
      </Box>
    </Box>
  );
}
