// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Tracker",
  description: "Track time per project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Force dark theme, black/grey aesthetic
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-gray-200`}>{children}</body>
    </html>
  );
}
