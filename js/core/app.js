/**
 * App - Inicializador principal de la aplicación
 */

const App = (() => {
  const init = () => {
    // 1. Inicializar tema
    ThemeManager.init();

    // 2. Cargar datos de ejemplo
    MockData.loadToState();

    // 3. Registrar módulos en router
    Router.register('dashboard', DashboardModule);
    Router.register('ordenes', OrdenesModule);
    Router.register('inventario', InventarioModule);
    Router.register('clientes', ClientesModule);
    Router.register('empleados', EmpleadosModule);
    Router.register('reportes', ReportesModule);
    Router.register('admin', AdminModule);

    // 4. Inicializar router
    Router.init();

    // 5. Vincular botón de tema
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    themeToggle.addEventListener('click', () => {
      ThemeManager.toggle();
      updateThemeIcon();
    });

    // 6. Escuchar cambios de tema
    window.addEventListener('theme-changed', (e) => {
      updateThemeIcon();
    });

    // 7. Escuchar cambios de ruta
    window.addEventListener('route-changed', (e) => {
      console.log('Ruta cambiada a:', e.detail.ruta);
    });

    // 8. Suscribirse a cambios de estado
    StateManager.subscribe('alertas', (alertas) => {
      actualizarContadorAlertas(alertas.length);
    });

    // 9. Mostrar notificación de bienvenida
    NotificationService.success('¡Bienvenido a Express!', 3000);

    // Log de inicialización
    console.log('✅ Express iniciado correctamente');
  };

  const updateThemeIcon = () => {
    const theme = ThemeManager.getCurrent();
    const icon = document.getElementById('theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  const actualizarContadorAlertas = (cantidad) => {
    // TODO: Implementar actualización de contador de alertas
  };

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    init
  };
})();

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
