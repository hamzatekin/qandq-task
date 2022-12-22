import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { privateRoutes } from '../../router/router';
import { Loading } from '../Loading';

export const Layout = ({ children }: LayoutProps) => {
  return <Suspense fallback={<Loading />}>{useRoutes(privateRoutes)}</Suspense>;
};
