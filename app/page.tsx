/**
 * "/" is the bare desktop. Nothing renders on the wallpaper.
 *
 * macOS does not show a document on login, and the profile panel that used to
 * sit here was the single thing keeping this from reading as an operating
 * system. The content it carried lives on /about, which is one click away in
 * the dock, the menu bar, and the desktop icons.
 *
 * Crawlability is handled by the hidden navigation in Desktop.tsx plus
 * sitemap.ts and the JSON-LD graph, since this route now emits no prose.
 */
export default function Page() {
  return null;
}
