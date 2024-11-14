import { useContext } from "react";
import { ThemeContext } from "./themeProvider";
import Counter from "./counter";

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
    </div>
  );
}
