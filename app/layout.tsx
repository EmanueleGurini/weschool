import type { Metadata } from "next";
import { nunito, montserrat } from "./fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "weSchool",
  description: "School management web site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={`${montserrat.variable} ${nunito.variable}`}>
        <body>{children}</body>
      </html>
    </>
  );
}
