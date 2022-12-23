import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const ReactQuery = ({ children }: QueryClientProps) => {
  const queryClient = new QueryClient({
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
