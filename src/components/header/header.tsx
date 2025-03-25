'use client';

import { useScrollState } from '@/hooks/use-scrolle-state';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export function Header() {
  const { scrolled } = useScrollState();

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
      <Box>logo</Box>
      <Box>Language toggle</Box>
      <Box>
        <Button>Sign in</Button>
        <Button>Sign up</Button>
        <Button>
          <LogoutIcon />
        </Button>
      </Box>
    </AppBar>
  );
}
