import Link from "next/link";
import { useApp } from "../context/AppContext";

export default function ArticleCard({ article }) {
  const { saved, toggleSave } = useApp();
  const isSaved = saved.some((s) => s.url === article.url);

  return (
    <div style={{border:"1px solid #e5e5e5",padding:12,borderRadius:12,background:"#fff"}}>
      <h3 style={{marginTop:0}}>{article.title}</h3>
      <p style={{color:"#666",marginTop:0}}>{article.source?.name || "Unknown"}</p>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Link
          href={{ pathname: `/news/${encodeURIComponent(article.url)}`, query: { ...article } }}
        >
          Open
        </Link>
        <button onClick={() => toggleSave(article)}>{isSaved ? "Unsave" : "Save"}</button>
      </div>
    </div>
  );
}
