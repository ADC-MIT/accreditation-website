import React from 'react';

import AppHeader from '@/components/app-header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      <div className="relative">
        <div
          className="bg-gradient-to-b from-[#e8530f] to-[#f0981d]"
          style={{ minHeight: '33vh' }}
        ></div>
        <main className="relative -top-12 mx-auto max-w-screen-lg">
          {children}
        </main>
      </div>
    </>
  );
}
