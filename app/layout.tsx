import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Playfair_Display, Quattrocento_Sans } from "next/font/google";
import "./globals.css";

import { projects, roles } from "@/content";
import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import BootScreen from "@/components/BootScreen";

import MenuBar from "@/components/os/MenuBar";
import Desktop from "@/components/os/Desktop";
import Dock from "@/components/os/Dock";
import Spotlight from "@/components/os/Spotlight";
import Screensaver from "@/components/os/Screensaver";
import Hints from "@/components/os/Hints";
import DraggableWidget from "@/components/os/widgets/DraggableWidget";
import NowWidget from "@/components/os/widgets/NowWidget";
import WatchingWidget from "@/components/os/widgets/WatchingWidget";
import WindowManager from "@/components/os/WindowManager";

import AboutBody from "./about/page";
import WorkBody from "./work/page";
import ExperienceBody from "./experience/page";
import ContactBody from "./contact/page";
import KaalBody from "./kaal/page";

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

/* Kaal's own faces. The app window renders in the product's identity, not
   the portfolio's, the way two apps on a Mac look nothing alike. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-kaal-serif",
  display: "swap",
});

const quattrocento = Quattrocento_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kaal-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sahildixit.dev"),
  title: {
    default: "Sahil Dixit — Strategist. Builder.",
    template: "%s",
  },
  description:
    "Strategy & Management Consultant at Bank of America. I coordinate AI compliance initiatives, analyze consumer strategy, and ship indie products at night.",
  openGraph: {
    title: "Sahil Dixit — Strategist. Builder.",
    description:
      "Strategy & Management Consultant at Bank of America. AI tools by day. Indie products by night.",
    type: "website",
  },
};

/**
 * Title bar text for routes that are not statically registered. Plain object
 * so it can cross the server/client boundary into WindowManager.
 */
const dynamicTitles: Record<string, string> = {
  ...Object.fromEntries(projects.map((p) => [`/work/${p.slug}`, p.name])),
  ...Object.fromEntries(roles.map((r) => [`/experience/${r.id}`, r.company])),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${jetbrainsMono.variable} ${geist.variable} ${playfair.variable} ${quattrocento.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full antialiased">
        <JsonLd />
        <a href="#main" className="skip-to-content">
          SKIP_TO_CONTENT
        </a>

        <MotionProvider>
          {/*
            Chrome order matters. The window layer is z 100, dock 900, menu
            bar 1000, spotlight 1100, so these must be root-level siblings
            rather than nested inside the window layer.
          */}
          <Desktop
            widgets={
              <>
                <DraggableWidget id="now">
                  <NowWidget />
                </DraggableWidget>
                <DraggableWidget id="watching">
                  <WatchingWidget />
                </DraggableWidget>
              </>
            }
          />

          <main id="main">
            <WindowManager
              currentContent={children}
              titles={dynamicTitles}
              windows={[
                { route: "/about", title: "About.md", content: <AboutBody />, w: 720, h: 520 },
                { route: "/work", title: "Work", content: <WorkBody />, w: 840, h: 560 },
                {
                  route: "/experience",
                  title: "Experience",
                  content: <ExperienceBody />,
                  w: 760,
                  h: 560,
                },
                {
                  route: "/contact",
                  title: "Contact.app",
                  content: <ContactBody />,
                  w: 560,
                  h: 440,
                },
                { route: "/kaal", title: "Kaal", content: <KaalBody />, w: 620, h: 660 },
              ]}
            />
          </main>

          <Dock />
          <MenuBar />
          <Spotlight />
          <BootScreen />
          <Hints />
          <Screensaver />
        </MotionProvider>
      </body>
    </html>
  );
}
