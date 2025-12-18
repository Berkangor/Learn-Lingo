/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primary: localStorage.getItem("primaryColor") || "#f4c550",
    accent: localStorage.getItem("accentColor") || "#fbe9ba",
    image: localStorage.getItem("image") || "/iMac/iMac-yellow.svg",
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", theme.primary);
    document.documentElement.style.setProperty("--accent-color", theme.accent);
    localStorage.setItem("primaryColor", theme.primary);
    localStorage.setItem("accentColor", theme.accent);
    localStorage.setItem("image", theme.image);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
