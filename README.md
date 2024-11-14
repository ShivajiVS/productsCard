# Problem Statement 1:

### Fetch and Display Data from an API and filter:

##### Description: Create a React component that fetches data from an API and displays it in a cards. Use the useEffect hook to perform the fetch operation using below api

https://fakestoreapi.com/products

### Example:

#### Fetch data from a sample API (e.g.).

##### Display the data in a list format.

##### Add filter options according to category of the products Category list can be fetch from

https://fakestoreapi.com/products/categories
api

## solution:

#### useProducts hook to fetch the data from API:

```
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

```

### Card UI Component:

```

import { useState } from "react";
import { useProducts } from "./useProducts";

const PRODUCTS_URL = "https://fakestoreapi.com/products";
const CATEGORIES_URL = "https://fakestoreapi.com/products/categories";

export const Card = () => {
  const { filteredProducts, categories, loading, error, filterByCategory } =
    useProducts(PRODUCTS_URL, CATEGORIES_URL);

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

```

# Problem Statement 2:

### Counter

You have a React application with a Counter component that accepts a handleClick
function as a prop. The Counter component renders a button to increment a counter
value. However, the parent component re-renders every time the counter is
incremented, causing unnecessary re-renders of the Counter component even if its
props have not changed.
Task:

1. Identify the performance issue in this scenario.
2. Optimize the application using React&#39;s useCallback hook to prevent the
   Counter component from re-rendering unnecessarily.
3. Explain why useCallback helps in this situation.

## Solution:

### Counter(Parent component)

```
import CounterButton from "./counterButton";
import { useCallback } from "react";
import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h2>counter value is : {counter}</h2>
      <CounterButton increment={increment}></CounterButton>
    </div>
  );
}
```

### Counter Button component:

```
export default function CounterButton({ increment }) {
  return <button onClick={increment}>Increment</button>;
}
```

# Problem Statement 3:

### Dark and Light mode using React Context API:

You are required to implement a simple theme switching functionality in a React
application using the Context API. The application should support two themes: light
and dark. The current theme should be accessible throughout the application, and
users should be able to toggle between light and dark themes using a button.
Task:

1. Create a ThemeContext using React&#39;s Context API to manage and provide the
   current theme state across the application.
2. Implement a ThemeProvider component that will wrap the entire app and
   provide theme state and a function to toggle the theme.
3. Create a consumer component called ThemedComponent that uses the theme
   context to dynamically apply styles based on the current theme and render a
   button to toggle between themes.
4. Demonstrate the usage of ThemeProvider and ThemedComponent in the
   main App component.
   Requirements:
    The application should have two themes:
    Light Theme: Background color should be white (#fff) and text color should be
   black (#000).
    Dark Theme: Background color should be dark gray (#333) and text color
   should be white (#fff).
    The theme should be toggled when the user clicks the &quot;Toggle Theme&quot; button.

## Solution:

### Theme Context Provider Component:

```
import { useState, createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    console.log("handler...");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### App component:

```
import { useContext } from "react";
import { ThemeContext } from "./themeProvider";
import Counter from "./counter";
import { Card } from "./card";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: theme === "light" ? "#fff" : "#000",
        color: theme === "light" ? "#333" : "#fff",
      }}
      // or
      className={`${theme === "light" ? "light" : "dark"}`}
    >
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
      <Counter />

      <Card />
    </div>
  );
}
```

## main.js or index.js file:

```
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./themeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

```

## Enhancement (using local storage to persistent the theme)

```
import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```
