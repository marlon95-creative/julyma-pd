import { Link } from "react-router-dom";
import { company, mapHref, telHref } from "../config.js";
import { mediaUrl } from "../api.js";
import { clients } from "../data.js";
import { useCategories, useProducts } from "../components/useCatalog.js";
import ProductCard from "../components/ProductCard.jsx";
import State from "../components/State.jsx";
import { usePageTitle } from "../components/usePageTitle.js";

const reasons = [
  ["Made in our own factory", "Our tailoring and printing departments work directly on fabrics and printing machines."],
  ["Branding in one place", "Screen printing, embroidery and large format printing for your logo."],
  ["PPE, uniforms and work wear", "Safety gear, hospital, executive, school and industrial uniforms from one supplier."],
  ["Personalised service", "Quality service tailored to your needs, from the first request to delivery."],
];

export default function Home() {
  usePageTitle("");
  const cats = useCategories();
  const prods = useProducts();
  const productCats = cats.data.filter((c) => c.kind === "product");
  const featured = prods.data.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Uniforms, work wear and PPE, made and supplied in Tanzania</h1>
            <p className="lead">{company.name} produces and supplies safety gear, uniforms and work wear, with screen printing, embroidery and printing services for your branding.</p>
            <p className="actions">
              <Link className="btn btn-light" to="/request-quote">Request Quote</Link>
              <Link className="btn btn-ghost" to="/products">View Products</Link>
              <Link className="btn btn-ghost" to="/services">View Services</Link>
            </p>
          </div>
          <ul className="hero-list" aria-label="Product categories">
            {productCats.map((c) => (
              <li key={c.slug}><Link to={`/products?category=${c.slug}`}><strong>{c.name}</strong></Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container section">
        <h2>Our products</h2>
        <State loading={cats.loading} error={cats.error} empty={!cats.loading && !productCats.length}>
          <ul className="cat-grid">
            {productCats.map((c) => (
              <li key={c.slug}>
                <Link className="cat-card" to={`/products?category=${c.slug}`}>
                  <span className="cat-img">{c.image ? <img src={mediaUrl(c.image)} alt="" loading="lazy" width="300" height="225" /> : null}</span>
                  <strong>{c.name}</strong>
                  <span className="cat-count">{c.product_count} {c.product_count === 1 ? "item" : "items"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </State>
      </section>

      <section className="band">
        <div className="container section">
          <h2>About us</h2>
          <p className="measure">{company.name} is a Tanzanian private company, incorporated in 2018. We specialise in the production and supply of PPEs (safety gear), uniforms and work wear, and in branding with screen printing, embroidery and printing services. Our factory is in Kunduchi RTD, Plot No. 513, along Salasala Road.</p>
          <p className="actions"><Link className="btn btn-outline" to="/about">About Us</Link><Link className="btn btn-outline" to="/services">Our Services</Link></p>
        </div>
      </section>

      {(prods.loading || prods.error || featured.length > 0) && (
        <section className="container section">
          <h2>Featured products</h2>
          <State loading={prods.loading} error={prods.error}>
            <div className="grid pgrid">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          </State>
          <p><Link className="btn btn-outline" to="/products">View all products</Link></p>
        </section>
      )}

      <section className="band">
        <div className="container section">
          <h2>Why choose us</h2>
          <div className="grid">
            {reasons.map(([t, d]) => (
              <div className="card" key={t}><div className="card-body"><h3>{t}</h3><p>{d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <h2>Some of our clients</h2>
        <ul className="client-list">{clients.slice(0, 18).map((c) => <li key={c}>{c}</li>)}</ul>
        <p><Link to="/about#clients">See more of our clients</Link></p>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Need a quotation?</h2>
          <p>Choose the products or services you need and send one short form.</p>
          <p className="actions"><Link className="btn btn-light" to="/request-quote">Request Quote</Link><Link className="btn btn-ghost" to="/contact">Contact Us</Link></p>
        </div>
      </section>

      <section className="container section">
        <h2>Contact us</h2>
        <div className="grid">
          {company.offices.map((o) => (
            <address className="card place-card" key={o.id}>
              <strong>{o.label} – {o.place}</strong>
              {o.lines.map((l) => <span key={l}>{l}</span>)}
              <span>{o.phones.map((p, i) => <span key={p}>{i > 0 && " / "}<a href={telHref(p)}>{p}</a></span>)}</span>
              <a href={mapHref(o.mapQuery)} target="_blank" rel="noopener noreferrer">View on map</a>
            </address>
          ))}
          <address className="card place-card">
            <strong>{company.factory.label} – {company.factory.place}</strong>
            {company.factory.lines.map((l) => <span key={l}>{l}</span>)}
            <a href={mapHref(company.factory.mapQuery)} target="_blank" rel="noopener noreferrer">View on map</a>
          </address>
        </div>
        <p className="actions"><a className="btn" href={telHref(company.phones[0])}>Call us</a><a className="btn btn-outline" href={`mailto:${company.email}`}>Email us</a></p>
      </section>
    </>
  );
}
