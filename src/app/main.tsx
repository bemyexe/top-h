import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {QueryClientProvider} from '@tanstack/react-query';

import {QUERY_CLIENT} from '../shared/api/query-client';

import {App} from './app';

import './reset.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
