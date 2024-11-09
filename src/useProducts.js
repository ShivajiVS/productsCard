import { useState, useEffect } from "react";

const useProducts = (productsUrl, categoriesUrl) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(productsUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(categoriesUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch the categories");
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const filterByCategory = (category) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  return { filteredProducts, categories, loading, error, filterByCategory };
};

export { useProducts };
