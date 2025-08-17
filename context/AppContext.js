import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [location, setLocation] = useState("Toronto");
  const [unit, setUnit] = useState("metric"); // "metric" (°C) or "imperial" (°F)
  const [saved, setSaved] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
    if (prefs.location) setLocation(prefs.location);
    if (prefs.unit) setUnit(prefs.unit);
    if (prefs.saved) setSaved(prefs.saved);
  }, []);

  // Save prefs whenever location/unit/saved change
  useEffect(() => {
    localStorage.setItem(
      "prefs",
      JSON.stringify({ location, unit, saved })
    );
  }, [location, unit, saved]);

  // Reset all prefs to defaults
  function resetToDefaults() {
    setLocation("Toronto");
    setUnit("metric");
    setSaved([]);
    localStorage.removeItem("prefs"); // wipe storage
  }

  return (
    <AppContext.Provider
      value={{
        location,
        setLocation,
        unit,
        setUnit,
        saved,
        setSaved,
        resetToDefaults, // expose to Settings page
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
