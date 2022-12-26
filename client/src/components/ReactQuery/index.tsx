import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const ReactQuery = ({ children }: QueryClientProps) => {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: (data, variables, context, mutation) => {
        const meta = mutation.meta as MutationConfig;
        if (!meta) {
          return;
        }

        if (meta?.useSuccessMessage && meta?.successMessage) {
          toast(meta.successMessage, {
            type: 'success',
            autoClose: 3000,
          });
        } else if (meta?.useSuccessMessage && !meta?.successMessage) {
          toast('Success', {
            type: 'success',
            autoClose: 3000,
          });
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
        retryDelay: 0,
        refetchOnWindowFocus: false,
        staleTime: 0,
      },
      mutations: {
        retry: false,
        retryDelay: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
