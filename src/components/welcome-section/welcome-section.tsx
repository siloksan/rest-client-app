'use client';

import { ROUTES } from '@/constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { RestCards } from '../rest-cards/rest-cards';
import { DeveloperCards } from '../developer-cards/developer-cards';

interface Props {
  username: string | null;
}

export function WelcomeSection({ username }: Props) {
  const translate = useTranslations('MainPage');

  const translateBtn = useTranslations('Buttons');

  return (
    <>
      {username ? (
        <Typography variant="h2" sx={{ textAlign: 'center', mt: 10 }}>
          {translate('welcome_user', { username })}
        </Typography>
      ) : (
        <Typography variant="h2" sx={{ textAlign: 'center', mt: 10 }}>
          {translate('welcome_message')}
        </Typography>
      )}
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 5 }}>
        {translate('about_app')}
      </Typography>
      {!username && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, gap: 2 }}>
          <Button variant="outlined">
            <Link
              href={ROUTES.SIGNIN}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {translateBtn('signin')}
            </Link>
          </Button>
          <Button variant="outlined">
            <Link
              href={ROUTES.SIGNUP}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {translateBtn('signup')}
            </Link>
          </Button>
        </Box>
      )}

      <RestCards />
      <DeveloperCards />
    </>
  );
}
