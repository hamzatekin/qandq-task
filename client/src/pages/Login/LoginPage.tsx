import { ThemeProvider } from '@emotion/react';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import * as z from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../hooks/useLogin';
import { useUserActions } from '../../store/useUserStore';
import { Loading } from '../../components/Loading';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type ILoginPayload = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { setToken } = useUserActions();
  const { mutate, isLoading } = useLogin();

  const { handleSubmit, control } = useForm<ILoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginPayload> = (payload) => {
    mutate(payload, {
      onSuccess: ({ data: { access_token } }) => {
        setToken(access_token);
      },
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <>
                <TextField
                  margin="normal"
                  required
                  onChange={onChange}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(onSubmit)();
                    }
                  }}
                  autoFocus
                />
                <FormHelperText error>{errors.email?.message}</FormHelperText>
              </>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(onSubmit)();
                    }
                  }}
                  onChange={onChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormHelperText error>{errors.password?.message}</FormHelperText>
              </>
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
