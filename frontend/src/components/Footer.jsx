import { Link } from "react-router-dom";
import { company, mapHref, telHref } from "../config.js";
import { useCategories } from "./useCatalog.js";

function Place({ place }) {
  return (
    <address className="place">
      <strong>{place.label}{place.place ? ` – ${place.place}` : ""}</strong>
      {place.lines.map((l) => <span key={l}>{l}</span>)}
      {place.phones && <span>{place.phones.map((p, i) => <span key={p}>{i > 0 && " / "}<a href={telHref(p)}>{p}</a></span>)}</span>}
      <a className="maplink" href={mapHref(place.mapQuery)} target="_blank" rel="noopener noreferrer">View on map<span className="sr-only"> ({place.label})</span></a>
    </address>
  );
}

export default function Footer() {
  const { data: cats } = useCategories();
  const productCats = cats.filter((c) => c.kind === "product");
  return (
    <footer className="site-footer">
      <div className="container foot">
        <div className="foot-brand">
          <img src="/images/logo.png" alt={company.name} width="200" height="52" loading="lazy" />
          <p>{company.tagline}</p>
          <p><a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">{company.website}</a></p>
        </div>
        <nav aria-label="Footer">
          <h2>Quick links</h2>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/request-quote">Request Quote</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        <nav aria-label="Product categories">
          <h2>Products</h2>
          <ul>
            {productCats.length === 0 && <li><Link to="/products">All products</Link></li>}
            {productCats.map((c) => <li key={c.slug}><Link to={`/products?category=${c.slug}`}>{c.name}</Link></li>)}
          </ul>
        </nav>
        <div>
          <h2>Contact</h2>
          <ul>
            {company.phones.map((p) => <li key={p}><a href={telHref(p)}>{p}</a></li>)}
            <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="container places" aria-label="Our addresses">
        {company.offices.map((o) => <Place key={o.id} place={o} />)}
        <Place place={company.factory} />
      </div>

      <p className="container copy">&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
    </footer>
  );
}
