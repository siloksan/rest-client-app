import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { DeveloperCard } from '../developer-card/developer-card';
import { AUTHORS } from '@/constants/authors';

export function DeveloperCards() {
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
      <Typography variant="h3" sx={{ mb: 3 }}>
        Behind the Code
      </Typography>
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
        {AUTHORS.map((author) => (
          <DeveloperCard key={author.name} author={author} />
        ))}
      </Box>
    </Box>
  );
}
