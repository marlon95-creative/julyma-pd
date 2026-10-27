import { Link, useSearchParams } from "react-router-dom";
import { useCategories, useProducts } from "../components/useCatalog.js";
import ProductCard from "../components/ProductCard.jsx";
import State from "../components/State.jsx";
import { usePageTitle } from "../components/usePageTitle.js";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const cats = useCategories();
  const prods = useProducts();
  const productCats = cats.data.filter((c) => c.kind === "product");
  const slug = params.get("category") || "all";
  const current = productCats.find((c) => c.slug === slug);
  usePageTitle(current ? current.name : "Products");

  const choose = (s) => setParams(s === "all" ? {} : { category: s });
  const loading = cats.loading || prods.loading;
  const error = cats.error || prods.error;

  return (
    <section className="container section">
      <h1>{current ? current.name : "Products"}</h1>
      <p className="measure">{current ? current.description : "Browse our PPEs and uniforms, then request a quote for the items you need."}</p>

      <div className="chips" role="group" aria-label="Filter by category">
        {[{ slug: "all", name: "All" }, ...productCats].map((c) => (
          <button key={c.slug} type="button" className="chip" aria-pressed={slug === c.slug || (!current && c.slug === "all")} onClick={() => choose(c.slug)}>{c.name}</button>
        ))}
      </div>

      <State loading={loading} error={error} empty={!loading && !productCats.length} emptyText="No products are listed yet.">
        {(current ? [current] : productCats).map((c) => {
          const items = prods.data.filter((p) => p.category === c.slug);
          return (
            <div key={c.slug} className="cat-block">
              {!current && <h2>{c.name}</h2>}
              {items.length ? (
                <div className="grid pgrid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
              ) : (
                <p className="state">No products are listed in this category yet. <Link to={`/request-quote?category=${c.slug}`}>Request a quote</Link> and tell us what you need.</p>
              )}
            </div>
          );
        })}
      </State>
    </section>
  );
}
