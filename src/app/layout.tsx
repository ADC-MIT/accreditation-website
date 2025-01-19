import { RootProvider } from 'fumadocs-ui/provider';

import type { Metadata, Viewport } from 'next';

import { siteConfig } from '@/config/site';

import { fontHeading, fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/sonner';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.description}`,
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-contain" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'relative flex min-h-screen flex-col font-sans antialiased',
          fontHeading.variable,
          fontSans.variable,
          fontMono.variable
        )}
      >
        <RootProvider
          theme={{
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
          }}
        >
          {children}
          <TailwindIndicator />
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
