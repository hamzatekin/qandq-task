import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovieByTitle } from '../service/omdb-service';

export const useSearchMovieInfinite = ({
  searchParam,
  pageParam = 1,
}: {
  searchParam: string;
  pageParam?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ['searchMovie', searchParam],
    queryFn: () => getMovieByTitle(searchParam, pageParam),
    enabled: !!searchParam,
    getPreviousPageParam: (firstPage) => {
      const firstPageNumber = 1;
      const prev = firstPageNumber < pageParam ? pageParam - 1 : undefined;
      return prev;
    },
    getNextPageParam: (lastPage) => {
      const lastPageNumber = lastPage?.totalResults / 10 + 1;
      const next = lastPageNumber > pageParam ? pageParam + 1 : undefined;
      return next;
    },
  });
};
