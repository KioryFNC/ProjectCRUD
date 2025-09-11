import { create } from "zustand";

type Theme = "light" | "dark" | "dracula";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dracula" : "light",
    })),
}));
