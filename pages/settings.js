import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export default function Settings() {
  const {
    location,
    setLocation,
    unit,
    setUnit,
    saved = [],
    resetToDefaults,
  } = useApp();

  const [draftCity, setDraftCity] = useState(location || "Toronto");
  const [draftUnit, setDraftUnit] = useState(unit || "metric");
  const [status, setStatus] = useState("");

  // Keep drafts in sync if prefs change elsewhere
  useEffect(() => setDraftCity(location || "Toronto"), [location]);
  useEffect(() => setDraftUnit(unit || "metric"), [unit]);

  // Save to context + localStorage
  function handleSave() {
    setLocation((draftCity || "Toronto").trim());
    setUnit(draftUnit === "imperial" ? "imperial" : "metric");
    setStatus("Saved!");
    setTimeout(() => setStatus(""), 1500);
  }

  // Reset everything to defaults 
  function handleResetDefaults() {
    resetToDefaults();            
    setDraftCity("Toronto");      
    setDraftUnit("metric");
    setStatus("Reset to defaults");
    setTimeout(() => setStatus(""), 1500);
  }

  return (
    <div className="wrap">
      <h1>Settings</h1>

      <label style={{ display: "block", marginBottom: 6 }}>Preferred City</label>
      <input
        className="input"
        value={draftCity}
        onChange={(e) => setDraftCity(e.target.value)}
        placeholder="City…"
      />

      <div style={{ marginTop: 12 }}>
        <label style={{ marginRight: 16 }}>
          <input
            type="radio"
            name="units"
            checked={draftUnit === "metric"}
            onChange={() => setDraftUnit("metric")}
          />{" "}
          Metric (°C)
        </label>
        <label>
          <input
            type="radio"
            name="units"
            checked={draftUnit === "imperial"}
            onChange={() => setDraftUnit("imperial")}
          />{" "}
          Imperial (°F)
        </label>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button onClick={handleSave}>Save Settings</button>
        <button type="button" onClick={handleResetDefaults}>Reset to Defaults</button>
        {status && <span style={{ color: "green" }}>{status}</span>}
      </div>

      <p style={{ marginTop: 16 }}>Saved articles: {saved.length || 0}</p>
    </div>
  );
}
