/**
 * Router
 * Handles navigation between application pages/modules
 */
const Router = (() => {
  const routes = {
    dashboard: { name: 'Dashboard', index: 0 },
    instalacion: { name: 'Instalación', index: 1 },
    materiales: { name: 'Materiales', index: 2 },
    certificacion: { name: 'Certificación', index: 3 },
    existencias: { name: 'Existencias', index: 4 },
    movimientos: { name: 'Movimientos', index: 5 },
    fibra: { name: 'Fibra Óptica', index: 6 },
    tecnicos: { name: 'Técnicos', index: 7 },
    alertas: { name: 'Alertas', index: 8 },
    'editar-materiales': { name: 'Editar Materiales', index: 9 },
    'editar-tecnicos': { name: 'Editar Técnicos', index: 10 },
    'editar-equipos': { name: 'Editar Equipos', index: 11 },
    configuracion: { name: 'Configuración', index: 12 },
  };

  let currentRoute = 'dashboard';
  let listeners = [];

  /**
   * Navigate to a route
   * @param {string} routeName - Name of the route
   */
  const navigate = (routeName) => {
    if (!routes[routeName]) {
      console.warn(`Route ${routeName} not found`);
      return false;
    }

    currentRoute = routeName;
    StateManager.set('currentPage', routeName);

    // Update UI
    updateActiveNavButton();
    updateActivePage();

    // Notify listeners
    notify(routeName);

    // Log action
    StateManager.addAuditLog('page_navigation', { from: currentRoute, to: routeName });

    return true;
  };

  /**
   * Get current route
   */
  const getCurrentRoute = () => currentRoute;

  /**
   * Get all available routes
   */
  const getRoutes = () => Object.keys(routes);

  /**
   * Update active page display
   */
  const updateActivePage = () => {
    document.querySelectorAll('[data-page]').forEach(page => {
      page.classList.toggle('active', page.dataset.page === currentRoute);
    });

    // Fallback for old style pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    const activePage = document.getElementById(`page-${currentRoute}`);
    if (activePage) {
      activePage.classList.add('active');
    }
  };

  /**
   * Update active navigation button
   */
  const updateActiveNavButton = () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const route = routes[currentRoute];

    navButtons.forEach((btn, index) => {
      btn.classList.toggle('active', index === route.index);
    });
  };

  /**
   * Subscribe to route changes
   */
  const subscribe = (callback) => {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter(l => l !== callback);
    };
  };

  /**
   * Notify all listeners of route change
   */
  const notify = (newRoute) => {
    listeners.forEach(listener => listener(newRoute));
  };

  /**
   * Initialize router
   */
  const init = () => {
    // Bind navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const routeName = Object.keys(routes)[index];
        navigate(routeName);
      });
    });

    // Set initial route
    updateActivePage();
  };

  return {
    navigate,
    getCurrentRoute,
    getRoutes,
    subscribe,
    init,
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => Router.init(), 100);
  });
} else {
  Router.init();
}
