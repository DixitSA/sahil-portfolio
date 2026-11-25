import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import { geist, instrument, jetbrains, playfair, quattrocento } from "./fonts";

import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/site/SmoothScroll";
import Nav from "@/components/site/Nav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08080a",
};

const description =
  "Strategy & AI governance at Bank of America. Ships production software at night. Where finance, regulation and working code have to agree.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sahil Dixit — Strategy, AI governance, shipped software",
    template: "%s · Sahil Dixit",
  },
  description,
  openGraph: {
    title: "Sahil Dixit — Strategy, AI governance, shipped software",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Dixit — Strategy, AI governance, shipped software",
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
      className={`${geist.variable} ${instrument.variable} ${jetbrains.variable} ${playfair.variable} ${quattrocento.variable}`}
    >
      <body className="grain min-h-dvh antialiased">
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
