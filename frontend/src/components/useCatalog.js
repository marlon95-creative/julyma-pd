import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../api.js";

function useLoad(loader) {
  const [state, setState] = useState({ loading: true, error: false, data: [] });
  useEffect(() => {
    let live = true;
    loader()
      .then((data) => live && setState({ loading: false, error: false, data }))
      .catch(() => live && setState({ loading: false, error: true, data: [] }));
    return () => { live = false; };
  }, [loader]);
  return state;
}

export const useCategories = () => useLoad(getCategories);
export const useProducts = () => useLoad(getProducts);
