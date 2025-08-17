import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext"; 

export default function WeatherPage() {
  // read/write the shared settings
  const { location, setLocation, unit, setUnit } = useApp();
  const [draft, setDraft] = useState(location || "Toronto");

  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => setDraft(location || "Toronto"), [location]);

  async function load(city = location, units = unit) {
    setLoading(true); setErr("");
    try {
      const r = await fetch(`/api/now?city=${encodeURIComponent(city)}&units=${units}`);
      const j = await r.json();
      if (j.error) { setErr(j.error); setData(null); }
      else { setData(j); }
    } catch (e) {
      setErr(String(e)); setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (location) load(location, unit); }, [location, unit]);

  return (
    <div className="wrap">
      <h1>Weather</h1>

      <div className="controls">
        <input
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="City…"
        />
        <button onClick={() => setLocation(draft.trim() || "Toronto")}>Set City</button>
        <button onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}>
          Toggle Units ({unit === "metric" ? "°C" : "°F"})
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {data && (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>{data.city}</h2>
          <div style={{ fontSize: "1.5rem" }}>
            {typeof data.temp === "number" ? Math.round(data.temp) : "—"}°
            {unit === "metric" ? "C" : "F"}
          </div>
        </div>
      )}
    </div>
  );
}
