import { BrowserFrame } from "./Frames";

const HOME = {
  src: "/previews/vazaar-home.jpg",
  w: 1920,
  h: 1200,
  alt: "Vazaar home: search for underwriting software across 100+ companies.",
  url: "vazaar-site.vercel.app",
  sizes: "(min-width: 1024px) 44vw, 90vw",
};

const PRODUCT = {
  src: "/previews/vazaar-product.jpg",
  w: 1920,
  h: 1200,
  alt: "Vazaar product page with use case, product type and the Intelligence section.",
  url: "vazaar-site.vercel.app/catalog/abbyy-vantage-insurance-idp",
  sizes: "(min-width: 1024px) 26vw, 50vw",
};

/** Two layered frames: home (main) and a product page (about 58% of its width) overlapping the lower-right corner. */
function Composition() {
  return (
    <div className="relative sm:pb-[8%]">
      <BrowserFrame {...HOME} className="w-full sm:w-[84%]" />
      <BrowserFrame {...PRODUCT} className="absolute bottom-0 right-0 hidden w-[48.7%] sm:block" />
    </div>
  );
}

/**
 * Vazaar's home and product pages. fill: sits in a layer of the pinned stage (the parent is the stage);
 * otherwise a self-contained inline stage.
 */
export default function VazaarVisual({ fill = false, className = "" }: { fill?: boolean; className?: string }) {
  if (fill) {
    return (
      <div className={`flex h-full w-full items-center justify-center p-[7%] ${className}`}>
        <div className="w-full">
          <Composition />
        </div>
      </div>
    );
  }
  return (
    <div className={`stage px-[7%] py-[6%] ${className}`}>
      <Composition />
    </div>
  );
}
