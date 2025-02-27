import {
  ReactQueryClientProvider,
  SessionProviderComponent,
} from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Expense Tracker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <ReactQueryClientProvider>
      <SessionProviderComponent session={session}>
        <html lang="en">
          <body className={`${inter} antialiased font-inter`}>
            <Toaster />
            {children}
          </body>
        </html>
      </SessionProviderComponent>
    </ReactQueryClientProvider>
  );
}
