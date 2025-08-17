import { useRouter } from "next/router";
import Link from "next/link";

export default function NewsDetail() {
  const router = useRouter();
  if (!router.isReady) return <div className="wrap">Loading…</div>;
  const { title, url, description, sourceName } = router.query;
  if (!title) {
    return (
      <div className="wrap">
        <h1>Article</h1>
        <p>Open this page from the News list to see details.</p>
        <Link href="/news">← Back to News</Link>
      </div>
    );
  }

  return (
    <div className="wrap">
      <Link href="/news">← Back to News</Link>
      <h1 style={{ marginTop: 8 }}>{title}</h1>
      {sourceName && <p style={{ color: "#666" }}>{sourceName}</p>}
      {description && <p style={{ marginTop: 12 }}>{description}</p>}
      {url && (
        <p style={{ marginTop: 12 }}>
          <a href={url} target="_blank" rel="noreferrer">Read original →</a>
        </p>
      )}
    </div>
  );
}
