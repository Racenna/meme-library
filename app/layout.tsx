import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meme Handbook",
  description: "A simple app to view and edit memes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
