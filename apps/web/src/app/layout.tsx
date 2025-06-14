import type { ReactElement, ReactNode } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang={'en'}>
      <body>{children}</body>
    </html>
  );
}
