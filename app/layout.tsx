import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CookiesProvider>

        <AuthProvider>
          <body className={inter.className}>{children}</body>
        </AuthProvider>
      </CookiesProvider>
    </html>
  );
}