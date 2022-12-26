import { login } from '../service/local-service';
import { useMutate } from './useMutate';

export const useLogin = (props?: MutationConfig) => {
  return useMutate({
    ...props,
    mutationFn: login,
    config: {
      useSuccessMessage: props?.useSuccessMessage,
      useErrorMessage: props?.useErrorMessage,
      errorMessage: props?.errorMessage,
      successMessage: props?.successMessage,
    },
  });
};
