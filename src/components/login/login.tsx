'use client';

import { ROUTES } from '@/constants';
import { createBrowserSupabase } from '@/db/create-client';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import { setUserName } from '@/store/user/user-store';
import { LoginFormData, loginSchema } from '@/utils/form-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import {
  PasswordElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const [submit, setSubmit] = useState(false);
  const supabase = createBrowserSupabase();

  const onSubmit = async (formData: LoginFormData) => {
    const { email, password } = formData;
    setSubmit(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmit(false);

    if (error) {
      showSnackbar(<Alert severity="error">{error.message}</Alert>);
      return;
    }

    const userName = data?.user?.user_metadata?.username;
    setUserName(userName);

    showSnackbar(
      <Alert severity="success">{`Authorization successfully! Hello ${userName}!`}</Alert>
    );

    return redirect(ROUTES.MAIN);
  };

  const { email, password } = errors;
  const emailError = email?.message ?? ' ';
  const passwordError = password?.message ?? ' ';

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
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        Log in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextFieldElement
            name="email"
            label="Email"
            required
            control={control}
            helperText={emailError}
          />
          <PasswordElement
            label="Password"
            name="password"
            control={control}
            helperText={passwordError}
            required
          />
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            disabled={!isValid}
            loading={submit}
            type="submit"
          >
            Sign up
          </Button>
        </Box>
      </form>
    </Container>
  );
}
