import { Link } from "react-router-dom";
import { company, mapHref, telHref } from "../config.js";
import { usePageTitle } from "../components/usePageTitle.js";

function Place({ place }) {
  return (
    <address className="card place-card">
      <strong>{place.label} – {place.place}</strong>
      {place.lines.map((l) => <span key={l}>{l}</span>)}
      {place.phones && <span>Phone: {place.phones.map((p, i) => <span key={p}>{i > 0 && " / "}<a href={telHref(p)}>{p}</a></span>)}</span>}
      <a className="btn btn-outline btn-sm" href={mapHref(place.mapQuery)} target="_blank" rel="noopener noreferrer">Open map<span className="sr-only"> ({place.label})</span></a>
    </address>
  );
}

export default function Contact() {
  usePageTitle("Contact Us");
  return (
    <section className="container section">
      <h1>Contact us</h1>
      <p className="measure">Call or email us, or visit one of our offices. To ask for a price, use Request Quote.</p>

      <p className="actions">
        <a className="btn" href={telHref(company.phones[0])}>Call {company.phones[0]}</a>
        <a className="btn btn-outline" href={`mailto:${company.email}`}>Email us</a>
        <Link className="btn btn-outline" to="/request-quote">Request Quote</Link>
      </p>

      <dl className="contact-list">
        <div><dt>Phone</dt><dd>{company.phones.map((p, i) => <span key={p}>{i > 0 && " / "}<a href={telHref(p)}>{p}</a></span>)}</dd></div>
        <div><dt>Email</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
        <div><dt>Website</dt><dd><a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">{company.website}</a></dd></div>
      </dl>

      <h2>Our addresses</h2>
      <div className="grid">
        {company.offices.map((o) => <Place key={o.id} place={o} />)}
        <Place place={company.factory} />
      </div>
    </section>
  );
}
