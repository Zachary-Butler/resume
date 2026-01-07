/**
 * Theme Toggle Functionality
 * Handles light/dark mode switching with localStorage persistence
 */

(function() {
    'use strict';

    const THEME_KEY = 'resume-theme';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';

    /**
     * Get the user's preferred theme from system settings
     */
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return THEME_DARK;
        }
        return THEME_LIGHT;
    }

    /**
     * Get the saved theme from localStorage, or use system preference
     */
    function getSavedTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }
        return getSystemTheme();
    }

    /**
     * Apply theme to the document
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);

        // Update aria-label for accessibility
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            const label = theme === THEME_DARK ? 'Switch to light mode' : 'Switch to dark mode';
            toggleButton.setAttribute('aria-label', label);
        }
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || THEME_LIGHT;
        const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        applyTheme(newTheme);
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        // Apply saved theme immediately to prevent flash
        const theme = getSavedTheme();
        applyTheme(theme);

        // Set up toggle button click handler
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);

            // Also allow keyboard Enter/Space to toggle
            toggleButton.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleTheme();
                }
            });
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

            // Modern browsers
            if (darkModeQuery.addEventListener) {
                darkModeQuery.addEventListener('change', function(e) {
                    // Only auto-switch if user hasn't manually set a preference
                    if (!localStorage.getItem(THEME_KEY)) {
                        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
                    }
                });
            }
            // Older browsers
            else if (darkModeQuery.addListener) {
                darkModeQuery.addListener(function(e) {
                    if (!localStorage.getItem(THEME_KEY)) {
                        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
                    }
                });
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
