// app/layout.tsx
"use client";

import { ReactNode } from 'react';
import { UserContextProvider } from './context/UserContext'; // Adjust the path as needed
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
