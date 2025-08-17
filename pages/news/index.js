import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewsPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(query = "") {
    setLoading(true);
    setErr("");
    try {
      const r = await fetch(`/api/top?q=${encodeURIComponent(query)}`);
      const j = await r.json();
      if (j.error) { setErr(j.error); setItems([]); }
      else { setItems(j.items || []); }
    } catch (e) {
      setErr(String(e));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(""); }, []);

  return (
    <div className="wrap">
      <h1>News</h1>
      <input
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        placeholder="Search headlines…"
        className="input"
      />
      <button onClick={()=>load(q)} disabled={loading} style={{ marginLeft:8 }}>Search</button>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color:"crimson" }}>Error: {err}</p>}
      {!loading && !err && items.length === 0 && <p>No results.</p>}

      <ul>
        {items.map((a, i) => (
          <li key={i} style={{ margin:"8px 0" }}>
            
            <Link
              href={{
                pathname: `/news/${i}`,
                query: {
                  title: a.title,
                  url: a.url,
                  description: a.description || "",
                  sourceName: a.source?.name || ""
                }
              }}
            >
              {a.title} {a.source?.name ? `— ${a.source.name}` : ""}
            </Link>
          
            {" "}·{" "}
            <a href={a.url} target="_blank" rel="noreferrer">open source</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
