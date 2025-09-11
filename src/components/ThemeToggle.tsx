"use client";

import { useThemeStore } from "@/store/themeStore";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle transition-colors duration-500"
    >
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6 text-primary transition-transform duration-500 rotate-0" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-400 transition-transform duration-500 rotate-180" />
      )}
    </button>
  );
}
