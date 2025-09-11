"use client";

import { useThemeStore } from "@/store/themeStore";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
}
