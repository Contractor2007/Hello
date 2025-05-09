// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Providers from './Providers';


export const metadata: Metadata = {
  title: 'Hello-Chat',
  description: 'Roy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}