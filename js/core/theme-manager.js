/**
 * Theme Manager
 * Handles light/dark mode theme switching with persistence
 */
const ThemeManager = (() => {
  const THEME_STORAGE_KEY = 'omnistocktheme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  let currentTheme = DARK_THEME;
  let listeners = [];

  /**
   * Initialize theme from user preference or system preference
   */
  const init = () => {
    // Check localStorage first
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme) {
      currentTheme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      currentTheme = prefersDark ? DARK_THEME : LIGHT_THEME;
    }

    apply();

    // Listen to system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        currentTheme = e.matches ? DARK_THEME : LIGHT_THEME;
        apply();
        notify();
      }
    });
  };

  /**
   * Apply theme to document
   */
  const apply = () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', currentTheme);

    // Add smooth transition
    html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      html.style.transition = '';
    }, 300);
  };

  /**
   * Toggle between themes
   */
  const toggle = () => {
    currentTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    apply();
    notify();
  };

  /**
   * Set specific theme
   */
  const set = (theme) => {
    if (theme === DARK_THEME || theme === LIGHT_THEME) {
      currentTheme = theme;
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
      apply();
      notify();
    }
  };

  /**
   * Get current theme
   */
  const get = () => currentTheme;

  /**
   * Check if dark mode is active
   */
  const isDark = () => currentTheme === DARK_THEME;

  /**
   * Subscribe to theme changes
   */
  const subscribe = (callback) => {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter(l => l !== callback);
    };
  };

  /**
   * Notify all listeners of theme change
   */
  const notify = () => {
    listeners.forEach(listener => listener(currentTheme));
  };

  /**
   * Reset to system preference
   */
  const reset = () => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? DARK_THEME : LIGHT_THEME;
    apply();
    notify();
  };

  return {
    init,
    toggle,
    set,
    get,
    isDark,
    subscribe,
    reset,
  };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ThemeManager.init);
} else {
  ThemeManager.init();
}
