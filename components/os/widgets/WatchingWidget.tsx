import { profile } from "@/content";
import Widget from "./Widget";

/**
 * "What I'm watching" tile. The latest from a curated set of AI and tech
 * channels. Titled as a sentence to match the tile above it, and because
 * "Watching" alone could as easily be a stock ticker as a video feed.
 *
 * A server component, so the feed is fetched and cached on the server rather
 * than from the visitor's browser: no API key, no CORS, no client waterfall,
 * and it prerenders into the HTML.
 *
 * YouTube publishes per-channel RSS with no key and no quota, which is why
 * this is live rather than a list someone has to remember to update. The
 * channels are curated on purpose though: a feed of arbitrary trending video
 * would eventually put something in front of a recruiter that nobody chose.
 *
 * Channel names come from the feed, never from local labels. Four of five
 * channel IDs originally gathered by hand turned out to point at a different
 * channel than expected, so the feed is the only trustworthy source for what
 * a channel is actually called.
 */

export const revalidate = 3600;

interface Video {
  title: string;
  url: string;
  channel: string;
  published: string;
}

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchChannel(channelId: string): Promise<Video[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate }, signal: AbortSignal.timeout(6000) },
    );
    if (!res.ok) return [];
    const xml = await res.text();

    const channel = decode(
      xml.match(/<author>\s*<name>([^<]+)<\/name>/)?.[1] ?? "YouTube",
    );

    const entries = xml.split("<entry>").slice(1, 4);
    return entries.flatMap((entry) => {
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const url = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!title || !url) return [];
      return [{ title: decode(title), url, channel, published: published ?? "" }];
    });
  } catch {
    // A dead feed must never take the desktop down with it.
    return [];
  }
}

function ago(iso: string) {
  if (!iso) return "";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (Number.isNaN(days)) return "";
  if (days <= 0) return "today";
  if (days === 1) return "1d";
  if (days < 30) return `${days}d`;
  return `${Math.floor(days / 30)}mo`;
}

export default async function WatchingWidget() {
  const sources = profile.watching ?? [];
  if (!sources.length) return null;

  const batches = await Promise.all(sources.map((s) => fetchChannel(s.channelId)));

  // One per channel. Without this a channel that posts daily fills every slot,
  // which both loses the breadth that makes the tile interesting and raises
  // the odds of a single off-topic upload dominating it.
  const seen = new Set<string>();
  const videos = batches
    .flat()
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .filter((v) => {
      if (seen.has(v.channel)) return false;
      seen.add(v.channel);
      return true;
    })
    .slice(0, 4);

  // Every feed failed. Show nothing rather than an empty box.
  if (!videos.length) return null;

  return (
    <Widget title="What I'm watching" subtitle="AI · tech · markets">
      <ul className="space-y-2.5">
        {videos.map((v) => (
          <li key={v.url}>
            <a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block underline-offset-2 hover:underline"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.4,
                color: "var(--color-ink)",
              }}
              title={v.title}
            >
              <span className="line-clamp-2">{v.title}</span>
            </a>
            <p
              className="mt-0.5 truncate"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "var(--color-ink-faint)",
              }}
            >
              {v.channel}
              {ago(v.published) && ` · ${ago(v.published)}`}
            </p>
          </li>
        ))}
      </ul>
    </Widget>
  );
}
