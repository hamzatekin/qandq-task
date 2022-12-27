import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { RoutePath } from './const';

const SearchPage = lazy(() => import('../pages/SearchPage'));
const MoviePage = lazy(() => import('../pages/MoviePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const SearchResultPage = lazy(() => import('../pages/SearchResultPage'));
const LoginPage = lazy(() => import('../pages/Login/LoginPage'));

export const privateRoutes: RouteObject[] = [
  {
    path: RoutePath.HOME,
    element: <SearchPage />,
  },
  {
    path: RoutePath.MOVIE,
    element: <MoviePage />,
  },
  {
    path: RoutePath.SEARCH_RESULTS,
    element: <SearchResultPage />,
  },
  {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to={RoutePath.NOT_FOUND} replace />,
  },
];

export const publicRoutes: RouteObject[] = [
  {
    path: RoutePath.HOME,
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to={RoutePath.HOME} replace />,
  },
];
