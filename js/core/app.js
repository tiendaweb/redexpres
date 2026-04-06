/**
 * OmniStock Application
 * Main application initializer
 */

const OmniStockApp = (() => {
  const modules = {
    dashboard: DashboardModule,
    instalacion: InstalacionModule,
    materiales: MaterialesModule,
    certificacion: CertificacionModule,
    existencias: ExistenciasModule,
    movimientos: MovimientosModule,
    fibra: FibraModule,
    tecnicos: TecnicosModule,
    alertas: AlertasModule,
  };

  const init = () => {
    console.log('🚀 Initializing OmniStock FTTH Application...');

    // Initialize core systems
    ThemeManager.init();
    StateManager.init();
    Router.init();

    // Setup theme toggle button
    setupThemeToggle();

    // Setup module rendering on route change
    setupModuleRouting();

    // Render initial page
    renderModule('dashboard');

    // Subscribe to route changes
    Router.subscribe((route) => {
      renderModule(route);
    });

    console.log('✅ OmniStock initialized successfully');
  };

  const setupThemeToggle = () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        ThemeManager.toggle();
      });
    }
  };

  const setupModuleRouting = () => {
    // Bind navigation buttons to modules
    const navButtons = document.querySelectorAll('.nav-btn');
    const moduleOrder = ['dashboard', 'instalacion', 'materiales', 'certificacion', 'existencias', 'movimientos', 'fibra', 'tecnicos', 'alertas'];

    navButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const moduleName = moduleOrder[index];
        Router.navigate(moduleName);
      });
    });
  };

  const renderModule = (moduleName) => {
    const module = modules[moduleName];
    if (!module) {
      console.warn(`Module ${moduleName} not found`);
      return;
    }

    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
      console.error('Main content container not found');
      return;
    }

    // Clear and render module
    mainContent.innerHTML = '';
    module.render(mainContent);

    // Log in state
    StateManager.set('currentPage', moduleName);
  };

  return {
    init,
  };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', OmniStockApp.init);
} else {
  OmniStockApp.init();
}
