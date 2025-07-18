import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {Providers} from '../shared/providers';

import {App} from './app';

import './reset.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
