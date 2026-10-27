import { Link } from "react-router-dom";
import { serviceGroups } from "../data.js";
import { usePageTitle } from "../components/usePageTitle.js";

function quoteLink(s) {
  const q = new URLSearchParams({ category: s.category });
  if (s.item) q.set("item", s.item);
  return `/request-quote?${q}`;
}

export default function Services() {
  usePageTitle("Services");
  return (
    <section className="container section">
      <h1>Our services</h1>
      <p className="measure">Choose a service, then send a quote request. We reply with a quotation.</p>
      {serviceGroups.map((g) => (
        <div key={g.id} className="svc-group">
          <h2>{g.title}</h2>
          <p className="measure">{g.intro}</p>
          <div className="grid">
            {g.items.map((s) => (
              <article key={s.slug} id={s.slug} className="card service">
                {s.image && <img className="svc-img" src={s.image} alt={s.imageAlt} loading="lazy" width="600" height="360" />}
                <div className="card-body">
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <ul>{s.scope.map((x) => <li key={x}>{x}</li>)}</ul>
                  <p className="actions">
                    <Link className="btn" to={quoteLink(s)}>Request Quote</Link>
                    {g.id === "uniforms" && <Link className="btn btn-outline" to={`/products?category=${s.category}`}>View Products</Link>}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
