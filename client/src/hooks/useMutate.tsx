import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export interface UseMetaMutateProps<TData, TError, TVariables, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  config?: MutationConfig;
}

export const useMutate = <TData, TError, TVariables, TContext>({
  config,
  ...rest
}: UseMetaMutateProps<TData, TError, TVariables, TContext>) =>
  useMutation({
    meta: {
      useSuccessMessage: config?.useSuccessMessage || true,
      useErrorMessage: config?.useErrorMessage || true,
      errorMessage: config?.errorMessage || undefined,
      successMessage: config?.successMessage || undefined,
    },
    ...rest,
  });
