import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Cosmos from "@/components/Cosmos";
import Footer from "@/components/Footer";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Dominic Ross — Anthropic Fellows Program",
  description:
    "An application in motion — coursework, projects, and the writing behind them.",
};

/**
 * Global shell. Cosmos backdrop and the dry footer line are mounted here so
 * they persist across every route. The relative-positioned wrapper keeps
 * page content above the fixed Cosmos canvas (zIndex 0).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body>
        <Cosmos />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
