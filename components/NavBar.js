import Link from "next/link";
export default function NavBar() {
  return (
    <nav style={{display:"flex",gap:16,padding:"12px 16px",borderBottom:"1px solid #eee"}}>
      <Link href="/">Home</Link>
      <Link href="/news">News</Link>
      <Link href="/weather">Weather</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  );
}
