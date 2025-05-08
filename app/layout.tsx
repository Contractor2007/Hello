import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/Providers"

export const metadata: Metadata = {
  title: "Chat Application",
  description: "A modern chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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