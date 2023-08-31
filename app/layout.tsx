import "./globals.css";
import type { Metadata } from "next";
import { Dela_Gothic_One, Instrument_Sans } from "next/font/google";
const dela = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela",
  display: "swap",
});
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

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
      <body className={`${sans.variable} ${dela.variable} ${sans.className}`}>
        {children}
      </body>
    </html>
  );
}
