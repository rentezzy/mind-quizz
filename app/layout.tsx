import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@/lib/Providers";
import { dela, sans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Mind Quizz",
  description: "Mind Quizz app",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${sans.variable} ${dela.variable} ${sans.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
