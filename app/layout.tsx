import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beer Wiki",
  description: "Information about your favorite beers",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <body className={inter.className} style={{ height: "100%", display: "flex", flexDirection: "column"}}>
        {children}
      </body>
    </html>
  );
}
