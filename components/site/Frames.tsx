import Image from "next/image";

interface BrowserFrameProps {
  src: string;
  w: number;
  h: number;
  alt: string;
  url: string;
  sizes: string;
  eager?: boolean;
  className?: string;
}

/** A taped-in browser printout: white ground, ink border, 28px bar. */
export function BrowserFrame({ src, w, h, alt, url, sizes, eager, className = "" }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden rounded-[4px] border border-ink bg-white frame-shadow ${className}`}>
      <div className="flex h-7 items-center border-b border-rule bg-white px-3">
        <span aria-hidden className="t-mono truncate text-[13px] text-ink-3">
          {url}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes={sizes}
        className="block h-auto w-full"
        {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      />
    </div>
  );
}

interface PhoneFrameProps {
  src: string;
  alt: string;
  sizes: string;
  eager?: boolean;
  className?: string;
}

/** Phone bezel around a portrait screenshot. */
export function PhoneFrame({ src, alt, sizes, eager, className = "" }: PhoneFrameProps) {
  return (
    <div className={`rounded-[28px] bg-ink p-[7px] frame-shadow ${className}`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[22px] bg-sheet">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
          {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
        />
        <span
          aria-hidden
          className="absolute left-1/2 top-1 h-[16px] w-[56px] max-w-[40%] -translate-x-1/2 rounded-full bg-ink"
        />
      </div>
    </div>
  );
}
