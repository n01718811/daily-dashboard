import { useApp } from "../context/AppContext";
export default function WeatherCard({ data }) {
  const { unit } = useApp();
  if (!data) return null;
  return (
    <div style={{border:"1px solid #e5e5e5",padding:12,borderRadius:12,background:"#fff"}}>
      <h3 style={{margin:"0 0 6px"}}>{data.city || data.name}</h3>
      <div style={{fontSize:"1.25rem"}}>
        {Math.round(data.temp ?? data.main?.temp)}°{unit === "metric" ? "C" : "F"}
      </div>
      <div style={{textTransform:"capitalize",color:"#555"}}>
        {(data.desc ?? data.weather?.[0]?.description) || ""}
      </div>
    </div>
  );
}
