import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../service/local-service';

export const useGetMovies = () => {
  return useInfiniteQuery({
    queryKey: ['getMovies'],
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam),
    getPreviousPageParam: (firstPage) => {
      return firstPage.data.meta.hasPreviousPage ? firstPage.data.meta.page - 1 : undefined;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.meta.hasNextPage ? lastPage.data.meta.page + 1 : undefined;
    },
  });
};
