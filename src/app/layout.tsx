import type { Metadata } from 'next';
import { ColorSchemeScript } from '@mantine/core';
import './globals.css';
import './theme.css';
import ClientProviders from '@/components/ClientProviders';

export const metadata: Metadata = {
  title: 'LinkedIn Search',
  description: 'Search LinkedIn profiles and companies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
