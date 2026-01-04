import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <MantineProvider>
        <Notifications position="top-right" containerWidth={360} />
        <App />
      </MantineProvider>
    </StrictMode>
  </QueryClientProvider>
);
