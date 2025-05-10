'use client'
import { SessionProvider } from "next-auth/react";
import Providers from "@/app/Providers";
import Header from "@/components/auth/Header";
import Footer from "@/components/auth/Footer";


export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider >
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}