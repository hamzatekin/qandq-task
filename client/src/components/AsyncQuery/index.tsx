import { Typography } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { Loading } from '../Loading';

interface IQueryWrapper<T, R> {
  reactQueryResult: UseQueryResult<T, R>;
  children: (data: T) => React.ReactNode | React.ReactNode[];
  errorComponent?: (error: string) => JSX.Element;
  loadingComponent?: JSX.Element;
}

export const AsyncQuery = <T, R>({
  reactQueryResult,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent,
  children,
}: IQueryWrapper<T, R>) => {
  const { isInitialLoading, isError, isFetching, isSuccess, data, error } = reactQueryResult;

  if (isInitialLoading && isFetching) {
    if (LoadingComponent) {
      return <>{LoadingComponent}</>;
    }

    return <Loading />;
  }

  if (isError) {
    if (ErrorComponent) {
      return <>{ErrorComponent(error as string)}</>;
    }

    return <Typography variant="h5">{String(error)}</Typography>;
  }

  if (isSuccess) {
    return <>{children(data! as T)}</>;
  }

  return null;
};

export default AsyncQuery;
