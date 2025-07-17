import {QueryClient, type QueryClientConfig} from '@tanstack/react-query';

const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
    },
  },
};

export const QUERY_CLIENT = new QueryClient(QUERY_CLIENT_CONFIG);
