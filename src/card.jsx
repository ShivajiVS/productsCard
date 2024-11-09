import { useState } from "react";
import { useProducts } from "./useProducts";

const productsUrl = "https://fakestoreapi.com/products";
const categoriesUrl = "https://fakestoreapi.com/products/categories";

export const Card = () => {
  const { filteredProducts, categories, loading, error, filterByCategory } =
    useProducts(productsUrl, categoriesUrl);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterByCategory(category);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="category-filter">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-description">
              {product.description.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
