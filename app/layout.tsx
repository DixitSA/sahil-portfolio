import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import MotionProvider from "@/components/MotionProvider";

/* Self-hosted via next/font. No runtime request to Google. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jetbrains",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sahildixit.dev"),
  title: "Sahil Dixit — Strategist. Builder.",
  description:
    "Strategy & Management Consultant at Bank of America. I coordinate AI compliance initiatives, analyze consumer strategy, and ship indie products at night.",
  openGraph: {
    title: "Sahil Dixit — Strategist. Builder.",
    description:
      "Strategy & Management Consultant at Bank of America. AI tools by day. Indie SaaS by night.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${jetbrainsMono.variable} ${geist.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full antialiased">
        <a href="#hero" className="skip-to-content">SKIP_TO_CONTENT</a>
        <CustomCursor />
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
