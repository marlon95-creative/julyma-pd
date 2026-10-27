import { Link } from "react-router-dom";

/** Loading / error / empty states shared by every data-driven section. */
export default function State({ loading, error, empty, emptyText, children }) {
  if (loading) return <p className="state" role="status">Loading…</p>;
  if (error) return <p className="state" role="alert"><strong>This could not be loaded.</strong> Refresh the page, or <Link to="/contact">contact us</Link>.</p>;
  if (empty) return <p className="state">{emptyText || "Nothing to show yet."} <Link to="/request-quote">Request a quote</Link> and tell us what you need.</p>;
  return children;
}
