import { BrowserFrame } from "./Frames";

/** Vazaar's landing page as a taped-in printout on the pad. */
export default function VazaarVisual() {
  return (
    <div className="stage aspect-[16/11] lg:aspect-[4/3]">
      <BrowserFrame
        src="/previews/vazaar.jpg"
        w={1920}
        h={1080}
        alt="Vazaar landing page: The underwriting AI market, in one place."
        url="vazaar-site.vercel.app"
        sizes="(min-width: 1024px) 50vw, 92vw"
        className="absolute inset-x-[6%] top-[12%]"
      />
    </div>
  );
}
