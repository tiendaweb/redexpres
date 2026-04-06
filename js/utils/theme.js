/**
 * Theme Manager - Gestión de temas Light/Dark Mode
 * Maneja cambios de tema, persistencia y sincronización
 */

const ThemeManager = (() => {
  const STORAGE_KEY = 'express-theme';
  const THEME_ATTRIBUTE = 'data-theme';
  const DEFAULT_THEME = 'dark';

  // Detectar preferencia del sistema
  const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  // Obtener tema actual
  const getCurrent = () => {
    return document.documentElement.getAttribute(THEME_ATTRIBUTE) || DEFAULT_THEME;
  };

  // Establecer tema
  const set = (theme) => {
    if (!['light', 'dark'].includes(theme)) return;

    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Emit evento para actualizar componentes
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
  };

  // Toggle entre temas
  const toggle = () => {
    const current = getCurrent();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    set(newTheme);
  };

  // Inicializar tema
  const init = () => {
    // 1. Buscar en localStorage
    let theme = localStorage.getItem(STORAGE_KEY);

    // 2. Si no existe, usar preferencia del sistema
    if (!theme) {
      theme = getSystemTheme();
    }

    // 3. Establecer tema
    set(theme);

    // 4. Escuchar cambios de preferencia del sistema
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeQuery.addListener((e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          set(e.matches ? 'dark' : 'light');
        }
      });
    }
  };

  return {
    getCurrent,
    set,
    toggle,
    init,
    getSystemTheme
  };
})();

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
