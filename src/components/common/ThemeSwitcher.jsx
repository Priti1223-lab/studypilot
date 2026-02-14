import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "dark", label: "Dark" },
    { id: "light", label: "Light" },
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-3 py-1 rounded-lg border ${
            theme === t.id ? "bg-primary text-textc" : "bg-dark-card"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
