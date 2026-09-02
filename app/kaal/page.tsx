import type { Metadata } from "next";
import KaalApp from "@/components/kaal/KaalApp";

export const metadata: Metadata = {
  title: "Kaal — Sahil Dixit",
  description:
    "Kaal running live: compute a real Vedic birth chart against the production engine.",
};

export default function Page() {
  return <KaalApp />;
}
