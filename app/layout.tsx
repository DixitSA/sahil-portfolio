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
  themeColor: "#F4F3EF",
};

const description =
  "Applied AI strategy, hands-on: a governed Copilot workflow adopted teamwide at Bank of America, AI model calibration and risk review, and Vazaar, where AI drafts the research, a second model judges it and a deterministic gate decides what ships.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sahil Dixit · Applied AI that holds up",
    template: "%s · Sahil Dixit",
  },
  description,
  openGraph: {
    title: "Sahil Dixit · Applied AI that holds up",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Dixit · Applied AI that holds up",
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
      suppressHydrationWarning
      className={`${hubot.variable} ${mona.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');var m=null;try{m=localStorage.getItem('motion')}catch(e){}d.dataset.motion=m||(matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on');setTimeout(function(){d.classList.add('cf-safe')},4000)})(document.documentElement)",
          }}
        />
      </head>
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
