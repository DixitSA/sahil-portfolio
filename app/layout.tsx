import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import { hubot, mona, jetbrains } from "./fonts";

import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/site/SmoothScroll";
import Nav from "@/components/site/Nav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#E7EDE1",
};

const description =
  "Startup growth from the SQL query to the shipped app. A/B tests and SQL analysis at Capital One, AI and fraud analytics at Bank of America, and two products built and run in production: Vazaar and Kaal.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sahil Dixit · Startup growth, from SQL to shipped app",
    template: "%s · Sahil Dixit",
  },
  description,
  openGraph: {
    title: "Sahil Dixit · Startup growth, from SQL to shipped app",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Dixit · Startup growth, from SQL to shipped app",
    description,
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
      className={`${hubot.variable} ${mona.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <JsonLd />
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
          <Nav />
          <main id="main">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
