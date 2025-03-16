'use client';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a new QueryClient instance for each client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Disable SSR for queries to prevent hydration mismatch
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light">
        {children}
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
