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
