'use client';

import { ROUTES } from '@/constants';
import { createBrowserSupabase } from '@/db/create-client';
import { redirect } from '@/i18n/navigation';
import { showSnackbar } from '@/store/snackbar/snackbar-store';
import { userAuthStore } from '@/store/userAuth/userAuth-store';
import { RegistrationFormData, registrationSchema } from '@/utils/form-schema';
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

export function Registration() {
  const translate = useTranslations('RegistrationPage');
  const translateBtn = useTranslations('Buttons');
  const setUser = userAuthStore((state) => state.setUser);

  const locale = useLocale();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });

  const [submit, setSubmit] = useState(false);
  const supabase = createBrowserSupabase();

  const onSubmit = async (formData: RegistrationFormData) => {
    const { email, username, password } = formData;
    setSubmit(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    setSubmit(false);

    if (error) {
      showSnackbar(<Alert severity="error">{error.message}</Alert>);
      return;
    }

    const userName = data?.user?.user_metadata?.username;
    setUser(data?.user);

    showSnackbar(
      <Alert severity="success">{`Registration successfully ${userName}!`}</Alert>
    );

    return redirect({ href: ROUTES.MAIN, locale });
  };

  const { email, username, password } = errors;
  const emailError = email?.message ?? ' ';
  const usernameError = username?.message ?? ' ';
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
            autoComplete="email"
          />
          <TextFieldElement
            name="username"
            label="Username"
            required
            control={control}
            helperText={usernameError}
            autoComplete="username"
          />
          <PasswordElement
            label="Password"
            name="password"
            control={control}
            slotProps={{
              htmlInput: {
                'data-testid': 'password',
              },
            }}
            helperText={passwordError}
            autoComplete="new-password"
            required
          />
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            disabled={!isValid}
            loading={submit}
            type="submit"
          >
            {translateBtn('signup')}
          </Button>
        </Box>
      </form>
    </Container>
  );
}
