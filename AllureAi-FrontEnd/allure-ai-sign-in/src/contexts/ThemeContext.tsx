import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "luna" | "moon";

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const ThemeContext = createContext<Ctx | undefined>(undefined);

const STORAGE_KEY = "allure-theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "luna";
    return (localStorage.getItem(STORAGE_KEY) as Theme) || "luna";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("luna", "moon");
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggle = () => setThemeState((t) => (t === "luna" ? "moon" : "luna"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
