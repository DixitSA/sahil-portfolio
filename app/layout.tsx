import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import MotionProvider from "@/components/MotionProvider";

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
    images: [{ url: "/og.png", width: 1200, height: 630 }], /* TODO: create /public/og.png */
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400;500&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&display=swap"
          rel="stylesheet"
        />
      </head>
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
