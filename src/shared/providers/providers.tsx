import {Provider} from 'react-redux';
import {QueryClientProvider} from '@tanstack/react-query';

import {QUERY_CLIENT} from '../api/query-client';
import {store} from '../store';

export const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};
