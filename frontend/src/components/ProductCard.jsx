import { Link } from "react-router-dom";
import { mediaUrl } from "../api.js";

export default function ProductCard({ product }) {
  const q = new URLSearchParams({ category: product.category, item: product.name });
  return (
    <article className="card product">
      {product.image ? (
        <div className="thumb"><img src={mediaUrl(product.image)} alt={product.image_alt || product.name} loading="lazy" width="400" height="300" /></div>
      ) : (
        <div className="thumb ph" role="img" aria-label="Photo coming soon">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z" /></svg>
        </div>
      )}
      <div className="card-body">
        <p className="meta">{product.category_name}</p>
        <h3>{product.name}</h3>
        {product.description && <p>{product.description}</p>}
        {product.specifications.length > 0 && (
          <ul className="specs">{product.specifications.map((s) => <li key={s}>{s}</li>)}</ul>
        )}
        <Link className="btn" to={`/request-quote?${q}`} aria-label={`Request quote for ${product.name}`}>Request Quote</Link>
      </div>
    </article>
  );
}
