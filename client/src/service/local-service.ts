import { ILoginPayload } from '../pages/Login/LoginPage';
import localClient from './client/local-client';

export const LocalEndpoints = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  MOVIES: '/movies',
  MAIL: '/mail',
} as const;

export const login = async (loginPayload: ILoginPayload) => {
  return localClient.post<{ access_token: string }>(LocalEndpoints.LOGIN, loginPayload);
};

export const getMovies = async (pageNumber: number) => {
  return localClient.get<PaginatedResponse<Movie>>(`/movies?page=${pageNumber}`);
};

export const recommendMovie = async (payload: RecommendMoviePayload) => {
  return localClient.post(`${LocalEndpoints.MAIL}/recommend-movie`, payload);
};
