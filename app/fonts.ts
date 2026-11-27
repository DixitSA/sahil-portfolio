import localFont from "next/font/local";

/*
 * Self-hosted from npm (@fontsource). No request to Google at build time or
 * at runtime, so the build works offline and the first paint never waits on
 * a third-party origin.
 */

export const hubot = localFont({
  src: "../node_modules/@fontsource-variable/hubot-sans/files/hubot-sans-latin-standard-normal.woff2",
  weight: "200 900",
  style: "normal",
  variable: "--font-hubot",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});

export const mona = localFont({
  src: "../node_modules/@fontsource-variable/mona-sans/files/mona-sans-latin-standard-normal.woff2",
  weight: "200 900",
  style: "normal",
  variable: "--font-mona",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});

export const jetbrains = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jetbrains",
  display: "swap",
});

/* Kaal's own faces. The live demo renders in the product's identity. */
export const playfair = localFont({
  src: [
    {
      path: "../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2",
      style: "normal",
      weight: "400 900",
    },
    {
      path: "../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2",
      style: "italic",
      weight: "400 900",
    },
  ],
  variable: "--font-kaal-serif",
  display: "swap",
});

export const quattrocento = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/quattrocento-sans/files/quattrocento-sans-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../node_modules/@fontsource/quattrocento-sans/files/quattrocento-sans-latin-700-normal.woff2",
      weight: "700",
    },
  ],
  variable: "--font-kaal-sans",
  display: "swap",
});
