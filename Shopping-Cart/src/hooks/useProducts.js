import { useEffect, useState } from "react";

const PRODUCTS_URL = "https://fakestoreapi.com/products?limit=12";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(PRODUCTS_URL, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load products right now.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load products right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    return () => abortController.abort();
  }, []);

  return { products, loading, error };
}

export default useProducts;
