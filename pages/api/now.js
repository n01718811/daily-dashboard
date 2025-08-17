export default async function handler(req, res) {
  try {
    const city = (req.query.city || "Toronto").trim();
    const units = (req.query.units || "metric") === "imperial" ? "imperial" : "metric";
    const tempUnit = units === "imperial" ? "fahrenheit" : "celsius";

    const gUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`;

    const gRes = await fetch(gUrl, { cache: "no-store" });
    if (!gRes.ok) return res.status(500).json({ error: "Geocoding failed" });
    const g = await gRes.json();

    if (!g?.results?.length) {
      return res.status(404).json({ error: `City "${city}" not found` });
    }

    const loc = g.results[0];
    const lat = loc.latitude;
    const lon = loc.longitude;
    const display = [loc.name, loc.admin1, loc.country].filter(Boolean).join(", ");

  
    const wUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&temperature_unit=${tempUnit}`;
    const wRes = await fetch(wUrl, { cache: "no-store" });
    if (!wRes.ok) return res.status(500).json({ error: "Weather fetch failed" });
    const w = await wRes.json();

    const temp = w?.current?.temperature_2m;
    const safeTemp = typeof temp === "number" ? temp : null;

    return res.status(200).json({
      city: display || city,
      temp: safeTemp,
      units
    });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}
