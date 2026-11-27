import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[80svh] flex-col items-center justify-center py-24 text-center">
      <h1 className="t-h2 max-w-[18ch]">No page at this address</h1>
      <p className="mt-5 text-ink-2">The link may be old or mistyped.</p>
      <Link href="/#work" className="btn btn-primary mt-10">
        See the work
      </Link>
    </div>
  );
}
