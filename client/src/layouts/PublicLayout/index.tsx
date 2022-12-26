import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from '../../router/router';
import { Loading } from '../../components/Loading';
import { Container, CssBaseline } from '@mui/material';

export const PublicLayout = () => {
  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Suspense fallback={<Loading />}>{useRoutes(publicRoutes)}</Suspense>
      </Container>
    </>
  );
};
