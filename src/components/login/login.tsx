'use client';

import { ROUTES } from '@/constants';
import { createBrowserSupabase } from '@/db/create-client';
import { redirect } from '@/i18n/navigation';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import { LoginFormData, loginSchema } from '@/utils/form-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  PasswordElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';

export function Login() {
  const translate = useTranslations('LoginPage');
  const translateBtn = useTranslations('Buttons');
  const locale = useLocale();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'all',
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

    showSnackbar(
      <Alert severity="success">{`Authorization successfully! Hello ${userName}!`}</Alert>
    );

    return redirect({ href: ROUTES.MAIN, locale });
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
        {translate('title')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextFieldElement
            name="email"
            label="Email"
            required
            control={control}
            helperText={emailError}
            data-testid="email"
            autoComplete="email"
          />
          <PasswordElement
            label="Password"
            name="password"
            control={control}
            helperText={passwordError}
            required
            data-testid="password"
            autoComplete="current-password"
          />
          <Button
            variant="contained"
            aria-label="sign in"
            sx={{ width: '100%' }}
            disabled={!isValid}
            loading={submit}
            type="submit"
          >
            {translateBtn('signin')}
          </Button>
        </Box>
      </form>
    </Container>
  );
}
