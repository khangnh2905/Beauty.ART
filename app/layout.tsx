import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { QueryProvider } from "@/provider/query-provider";
import StoreProvider from "@/components/providers/store-provider";

const inter = Inter({ subsets: ["latin"] });
//npx json-server -w data/data.json -p 3001

// puchasr test
// "userId": "user_2YOlq7jGyQw7axdgRg1NKBFUgUb",
// "courseId": "4256980c-3775-4504-b33a-248061b51a52"
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <StoreProvider/>
        <html lang="en">
          <body className={inter.className}>
            <ConfettiProvider />
            <ToastProvider />
            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
