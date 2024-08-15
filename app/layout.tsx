import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List dApp",
  description: "Created by Ronaldo Pangarego",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
