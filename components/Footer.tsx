export default function Footer() {
  return (
    <footer
      className="py-6 px-6"
      style={{
        borderTop:  "1px solid rgba(255,255,255,0.05)",
        background: "#0a0a0a",
      }}
    >
      <p
        className="text-center text-[10px] tracking-widest"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#555" }}
      >
        © 2026 SAHIL_DIXIT · BUILT_WITH=NEXT.JS · DEPLOYED_ON=VERCEL
      </p>
    </footer>
  );
}
