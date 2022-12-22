import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { RoutePath } from "./const";

const SearchPage = lazy(() => import("../pages/SearchPage"));
const MoviePage = lazy(() => import("../pages/MoviePage"));
const MovieListPage = lazy(() => import("../pages/MovieListPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const privateRoutes: RouteObject[] = [
  {
    path: RoutePath.HOME,
    element: <SearchPage />,
  },
  {
    path: RoutePath.MOVIES,
    element: <MovieListPage />,
  },
  {
    path: RoutePath.MOVIE,
    element: <MoviePage />,
  },
  {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to={RoutePath.NOT_FOUND} replace />,
  },
];
