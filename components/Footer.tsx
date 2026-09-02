export default function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{
        borderTop:  "1px solid var(--color-hairline)",
        background: "var(--color-canvas)",
      }}
    >
      {/* Was #555 at 2.66:1, which failed AA and AA-large outright. The footer
          component contract puts this text on ink-subtle, 5.7:1, AA. */}
      <p
        className="font-mono text-center text-[10px] uppercase"
        style={{ color: "var(--color-ink-subtle)", letterSpacing: "0.14em" }}
      >
        © 2026 SAHIL_DIXIT · BUILT_WITH=NEXT.JS · DEPLOYED_ON=VERCEL
      </p>
    </footer>
  );
}
