import "../styles/globals.css";
import { AppProvider } from "../context/AppContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </AppProvider>
  );
}
