import React from "react";
import "./ThemePicker.css";

interface ThemePickerProps {
  theme: "light" | "dark" | "cat";
  themes: ("light" | "dark" | "cat")[];
  setTheme: (theme: "light" | "dark" | "cat") => void;
}

const ThemePicker: React.FC<ThemePickerProps> = ({ theme, setTheme }) => {
  const themes = ["light", "dark", "cat"] as const;

  let [isHovered, setIsHovered] = React.useState(false);
  const getThemeIcon = (themeName: typeof theme) => {
    switch (themeName) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "cat":
        return "🐱";
      default:
        return "☀️";
    }
  };

  const handleThemeClick = (newTheme: typeof theme) => {
    setTheme(newTheme);
  };

  return (
    <div
      className="oval-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="theme-icons">
        {isHovered
          ? themes.map((t) => (
            <span
              key={t}
              className={`theme-icon selected`}
              onClick={() => handleThemeClick(t)}
            >
              {getThemeIcon(t)}
            </span>
          ))
          : <span className="theme-icon selected">{getThemeIcon(theme)}</span>}
      </div>
    </div>
  );
};

export default ThemePicker;
