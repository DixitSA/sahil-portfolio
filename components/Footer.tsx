export default function Footer() {
  return (
    <footer
      className="py-7 px-6 border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-4 text-center md:grid-cols-3 md:text-left md:gap-0 items-center">
        {/* Left — monogram */}
        <span
          className="text-sm text-indigo-500/50 tracking-[0.2em] md:text-left text-center"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
        >
          SK
        </span>

        {/* Center — copyright */}
        <span
          className="text-[11px] text-gray-500 tracking-widest uppercase text-center"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          © 2026 Sahil Dixit · Built with Next.js &amp; Vercel
        </span>

        {/* Right — socials */}
        <div className="flex justify-center md:justify-end gap-5">
          <a
            href="mailto:sahild1230@gmail.com"
            className="text-[11px] text-gray-500 hover:text-white transition-colors tracking-widest uppercase cursor-none"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/sahildixit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-gray-500 hover:text-white transition-colors tracking-widest uppercase cursor-none"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
