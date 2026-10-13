import { useTheme } from "../api/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-pressed={theme === "dark"}
      className="rounded-md border px-3 py-2 text-sm font-medium"
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}