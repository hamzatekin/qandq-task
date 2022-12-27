import { recommendMovie } from '../service/local-service';
import { useMutate } from './useMutate';

export const useRecommendMovie = () => {
  return useMutate({
    mutationKey: ['recommendMovie'],
    mutationFn: recommendMovie,
  });
};
