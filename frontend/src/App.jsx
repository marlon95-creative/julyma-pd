import { useEffect, useRef } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { usePageTitle } from "./components/usePageTitle.js";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Products from "./pages/Products.jsx";
import RequestQuote from "./pages/RequestQuote.jsx";
import Contact from "./pages/Contact.jsx";

function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className="container section">
      <h1>Page not found</h1>
      <p>The page you opened does not exist. Go back to the home page or request a quote.</p>
      <p className="actions"><Link className="btn" to="/">Go to Home</Link><Link className="btn btn-outline" to="/request-quote">Request Quote</Link></p>
    </section>
  );
}

export default function App() {
  const { pathname, hash } = useLocation();
  const main = useRef(null);

  // On page change: scroll to the top (or to #section) and move focus to the content
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" ref={main} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
