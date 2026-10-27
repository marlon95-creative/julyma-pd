const BASE = import.meta.env.VITE_API_URL || "";
const cache = {};

// Image paths from the API ("/media/...") need the API address when it lives on another domain
export const mediaUrl = (p) => (p ? (p.startsWith("http") ? p : BASE + p) : null);

function cached(key, url) {
  if (!cache[key]) {
    cache[key] = fetch(`${BASE}${url}`)
      .then((r) => { if (!r.ok) throw new Error("bad status"); return r.json(); })
      .catch((e) => { delete cache[key]; throw e; });
  }
  return cache[key];
}

export const getCategories = () => cached("categories", "/api/categories/");
export const getProducts = () => cached("products", "/api/products/");

/** Returns { reference } or throws { fieldErrors, message }. */
export async function submitQuote(formData) {
  let res;
  try {
    res = await fetch(`${BASE}/api/quotes/`, { method: "POST", body: formData });
  } catch {
    throw { message: "We could not reach the server. Check your internet connection and try again." };
  }
  if (res.ok) return res.json();
  if (res.status === 429) throw { message: "Too many requests from this device. Please wait a while, or call us." };
  if (res.status === 400) {
    const data = await res.json().catch(() => ({}));
    throw { fieldErrors: data, message: "Some details need fixing. Check the highlighted fields." };
  }
  throw { message: "Something went wrong on our side. Your details are still here: try again in a moment." };
}
