import React from 'react';
import './ThemePicker.css';

interface ThemePickerProps {
    theme: 'light' | 'dark' | 'cat';
    setTheme: (theme: 'light' | 'dark' | 'cat') => void;
}

const ThemePicker: React.FC<ThemePickerProps> = ({ theme, setTheme }) => {
    return (
        <div className="theme-picker">
            <select
                id="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'cat')}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="cat">Cat</option>
            </select>
        </div>
    );
}

export default ThemePicker;