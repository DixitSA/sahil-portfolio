import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://sahilk.dev"), /* TODO: update with your actual domain */
  title: "Sahil K. — Strategist. Builder. Creator.",
  description:
    "Strategy consultant at Bank of America, indie product builder, and music producer. I build AI tools by day, ship products by night, and make music in between.",
  openGraph: {
    title: "Sahil K. — Strategist. Builder. Creator.",
    description:
      "Strategy consultant at Bank of America, indie product builder, and music producer.",
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
      </head>
      <body className="min-h-full antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
