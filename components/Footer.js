export default function Footer() {
  return (
    <footer style={{borderTop:"1px solid #eee",marginTop:24,padding:12,textAlign:"center",color:"#777"}}>
      <small>© {new Date().getFullYear()} Daily Dashboard</small>
    </footer>
  );
}
