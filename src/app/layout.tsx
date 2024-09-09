import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "at browser",
  description: "at browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`text-sm antialiased`}>{children}</body>
    </html>
  );
}
