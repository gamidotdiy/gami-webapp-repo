"use client";

import { useEffect } from "react";

function updateTheme(matchesDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", matchesDark);
  root.dataset.theme = matchesDark ? "dark" : "light";
  root.style.setProperty("color-scheme", matchesDark ? "dark" : "light");
}

export function ThemeWatcher() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    updateTheme(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => updateTheme(event.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  return null;
}
