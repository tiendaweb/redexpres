/**
 * Router - Sistema de enrutamiento SPA
 * Maneja navegación entre páginas sin recargar
 */

const Router = (() => {
  const routes = {};
  let currentRoute = 'dashboard';
  const CONTAINER_ID = 'app-content';

  // Registrar ruta
  const register = (ruta, modulo) => {
    routes[ruta] = modulo;
  };

  // Navegar a ruta
  const navigate = (ruta) => {
    if (!routes[ruta]) {
      console.error(`Ruta no encontrada: ${ruta}`);
      return;
    }

    currentRoute = ruta;

    // Actualizar URL
    window.history.pushState({ ruta }, '', `#${ruta}`);

    // Actualizar sidebar activo
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.route === ruta) {
        item.classList.add('active');
      }
    });

    // Cargar módulo
    const modulo = routes[ruta];
    const container = document.getElementById(CONTAINER_ID);

    if (container && modulo) {
      // Clear old content
      container.innerHTML = '';

      // Mostrar loading
      container.innerHTML = '<div class="flex-center" style="height: 400px;"><div class="spinner-lg"></div></div>';

      // Cargar módulo
      setTimeout(() => {
        if (modulo.render && typeof modulo.render === 'function') {
          container.innerHTML = '';
          modulo.render(container);
        } else if (typeof modulo === 'function') {
          container.innerHTML = '';
          modulo(container);
        }

        // Trigger evento
        window.dispatchEvent(new CustomEvent('route-changed', { detail: { ruta } }));

        // Scroll to top
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  // Obtener ruta actual
  const getCurrent = () => currentRoute;

  // Manejar botones del navegador
  const handlePopState = (event) => {
    const ruta = event.state?.ruta || 'dashboard';
    navigate(ruta);
  };

  // Inicializar
  const init = () => {
    window.addEventListener('popstate', handlePopState);

    // Cargar ruta inicial
    const hash = window.location.hash.slice(1) || 'dashboard';
    if (routes[hash]) {
      navigate(hash);
    } else {
      navigate('dashboard');
    }

    // Vincular clicks en sidebar
    document.addEventListener('click', (e) => {
      const item = e.target.closest('[data-route]');
      if (item) {
        e.preventDefault();
        navigate(item.dataset.route);
      }
    });
  };

  return {
    register,
    navigate,
    getCurrent,
    init
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
