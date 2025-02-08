import {
  ReactQueryClientProvider,
  SessionProviderComponent,
} from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { DM_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmmono = DM_Mono({
  variable: "--font-dm-mono",
  weight: "400",
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
          <body className={`${inter} ${dmmono} antialiased font-inter`}>
            <Toaster />
            {children}
          </body>
        </html>
      </SessionProviderComponent>
    </ReactQueryClientProvider>
  );
}
