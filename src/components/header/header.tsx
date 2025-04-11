'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import { Alert, AppBar } from '@mui/material';
import { ROUTES } from '@/constants';
import { redirect, Link } from '@/i18n/navigation';
import { createBrowserSupabase } from '@/db/create-client';
import { useEffect } from 'react';
import { useScrollState } from '@/hooks';
import { useLocale, useTranslations } from 'next-intl';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { userAuthStore } from '@/store/userAuth/userAuth-store';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';

interface Props {
  initialUser: User | null;
}

export function Header({ initialUser }: Props) {
  const locale = useLocale();
  const { scrolled } = useScrollState();
  const setUser = userAuthStore(state => state.setUser);
  const username = userAuthStore(state => state.userData?.user_metadata.username);
  const supabase = createBrowserSupabase();
  const translateBtn = useTranslations('Buttons');

  const signOutAction = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      showSnackbar(<Alert severity="error">{error.message}</Alert>);

      return redirect({ href: ROUTES.ERROR, locale });
    }

    showSnackbar(<Alert severity="success">Goodbye {username}!</Alert>);
    setUser(null);
    return redirect({ href: ROUTES.MAIN, locale });
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, setUser]);

  return (
    <AppBar
      position="sticky"
      color="info"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${scrolled ? '5px' : '26px'} 20px`,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(3px)',
        transition: 'all 0.3s ease-in-out',
        top: 0,
      }}
    >
      <Button>
        <Link href={ROUTES.MAIN}>
          <Image src="/logo.svg" height={40} width={150} alt="logo" />
        </Link>
      </Button>
      <LanguageSwitcher />
      <Box sx={{ display: 'flex', gap: 2 }}>
        {username ? (
          <Button onClick={signOutAction} title={translateBtn('signout')}>
            <LogoutIcon />
          </Button>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </AppBar>
  );
}
