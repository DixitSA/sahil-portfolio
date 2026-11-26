import { BrowserFrame } from "./Frames";

const FRAME = {
  src: "/previews/vazaar.jpg",
  w: 1920,
  h: 1080,
  alt: "Vazaar landing page: The underwriting AI market, in one place.",
  url: "vazaar-site.vercel.app",
  sizes: "(min-width: 1024px) 52vw, 100vw",
};

/**
 * Vazaar's landing page. fill: sits in a layer of the pinned stage (the parent is the stage);
 * otherwise a self-contained inline stage.
 */
export default function VazaarVisual({ fill = false, className = "" }: { fill?: boolean; className?: string }) {
  if (fill) {
    return (
      <div className={`flex h-full w-full items-center justify-center p-[7%] ${className}`}>
        <BrowserFrame {...FRAME} className="w-full" />
      </div>
    );
  }
  return (
    <div className={`stage h-[260px] sm:h-[380px] ${className}`}>
      <BrowserFrame {...FRAME} className="absolute inset-x-[7%] top-[10%]" />
    </div>
  );
}
