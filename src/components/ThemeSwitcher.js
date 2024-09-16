import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import sun and moon icons
import './styles/ThemeSwitcher.css'; // Assuming you have a CSS file for styles

const ThemeSwitcher = () => {
    // Initialize theme state with value from localStorage, default to 'light' if not set
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        // Apply the theme to the body and save to localStorage
        document.body.className = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // Toggle theme state
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <button onClick={toggleTheme} className="theme-switcher">
            <span className="icon-wrapper">
                {isDarkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
            </span>
        </button>
    );
};

export default ThemeSwitcher;
