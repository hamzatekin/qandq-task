import { ILoginPayload } from '../pages/Login/LoginPage';
import localClient from './client/local-client';

export const LocalEndpoints = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
} as const;

export const login = async (loginPayload: ILoginPayload) => {
  return localClient.post<{ access_token: string }>(LocalEndpoints.LOGIN, loginPayload);
};

export const getMovies = async (pageNumber: number) => {
  return localClient.get<PaginatedResponse<Movie>>(`/movies?page=${pageNumber}`);
};
