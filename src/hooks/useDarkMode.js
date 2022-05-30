import { useEffect, useState } from "react";

const useDarkMode = () => {
  if (localStorage.theme === undefined) {
    return localStorage.setItem("theme", "light");
  }
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "light" ? "dark" : "light";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(theme);
    root.classList.remove(colorTheme);
    localStorage.setItem("theme", theme);
  }, [colorTheme, theme]);
  return [colorTheme, setTheme];
};

export default useDarkMode;
