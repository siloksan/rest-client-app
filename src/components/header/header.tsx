'use client';

import { useScrollState } from '@/hooks/use-scrolle-state';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import { Alert } from '@mui/material';
import { ROUTES } from '@/constants';
import Link from 'next/link';
import { createBrowserSupabase } from '@/db/create-client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  initialUserName: string | null;
}

export function Header({ initialUserName }: Props) {
  const { scrolled } = useScrollState();
  const [username, setUsername] = useState(initialUserName);
  const supabase = createBrowserSupabase();

  const signOutAction = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      showSnackbar(<Alert severity="error">{error.message}</Alert>);

      return redirect(ROUTES.ERROR);
    }

    showSnackbar(<Alert severity="success">Goodbye {username}!</Alert>);
    setUsername(null);

    return redirect(ROUTES.MAIN);
  };

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser();
      const userName = data?.user?.user_metadata.username ?? null;

      setUsername(userName);
    };

    getUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      getUserData();
    });

    return () => authListener.subscription.unsubscribe();
  }, [supabase]);

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
        <Link href={ROUTES.MAIN}>logo</Link>
      </Button>
      <Button>Language toggle</Button>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {username ? (
          <Button onClick={signOutAction}>
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
                Sign in
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
                Sign up
              </Link>
            </Button>
          </>
        )}
      </Box>
    </AppBar>
  );
}
