import Link from "next/link";
import { useEffect, useState } from "react";

const USE_API = process.env.NEXT_PUBLIC_ENABLE_API === "true";

export default function Home() {
  const [headline, setHeadline] = useState("");
  const [temp, setTemp] = useState(null);
  const [units] = useState("metric");

  useEffect(() => {
    // Headline
    (async () => {
      if (!USE_API) { setHeadline("Sample Headline: New Tech Breakthrough"); return; }
      try {
        const r = await fetch(`/api/top?pageSize=1`); 
        const j = await r.json();
        setHeadline(j.items?.[0]?.title || "Top headlines");
      } catch {
        setHeadline("Top headlines");
      }
    })();

    (async () => {
      if (!USE_API) { setTemp(22); return; }
      try {
        const r = await fetch(`/api/now?city=Toronto&units=${units}`); 
        const j = await r.json();
        setTemp(typeof j.temp === "number" ? Math.round(j.temp) : null);
      } catch {
        setTemp(null);
      }
    })();
  }, [units]);

  return (
    <div className="wrap">
      <h1>Daily Dashboard</h1>
      <div className="grid">
        <div className="card">
          <h2>Top Headline</h2>
          <p>{headline || "Loading…"}</p>
          <Link href="/news">See all news →</Link>
        </div>
        <div className="card">
          <h2>Current Weather</h2>
          <p>{temp === null ? "Loading…" : `${temp}°C`}</p>
          <Link href="/weather">Weather details →</Link>
        </div>
      </div>
    </div>
  );
}
