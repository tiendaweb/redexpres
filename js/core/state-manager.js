/**
 * State Manager - Gestión centralizada de estado
 * Proporciona un único punto de verdad para todos los datos
 */

const StateManager = (() => {
  let state = {
    // Módulo: Órdenes
    ordenes: [],
    ordenesFilter: {
      estado: 'todas',
      tecnico: null,
      cliente: null,
      fechaDesde: null,
      fechaHasta: null
    },

    // Módulo: Inventario
    inventario: [],
    inventarioFilter: {
      categoria: 'todas',
      stock: 'todas', // todas, bajo, critico
      busqueda: ''
    },
    alertas: [],

    // Módulo: Clientes
    clientes: [],
    clientesFilter: {
      estado: 'activos',
      tipo: 'todos'
    },

    // Módulo: Empleados/Técnicos
    empleados: [],
    empleadosFilter: {
      estado: 'activos',
      rol: 'todos',
      disponible: null
    },

    // Módulo: Fibra Óptica
    fibra: [],

    // UI State
    ui: {
      paginaActual: 'dashboard',
      sidebarAbierto: true,
      modalAbierto: false,
      modalContent: null,
      loading: false,
      error: null,
      notificaciones: []
    },

    // Usuario
    usuario: {
      id: null,
      nombre: 'Usuario Demo',
      rol: 'admin',
      email: 'demo@express.com'
    },

    // Estadísticas (generadas)
    estadisticas: {
      ordenesTotales: 0,
      ordenesPendientes: 0,
      ordenesEnProgreso: 0,
      ordenesCompletadas: 0,
      inventarioItems: 0,
      itemsBajoStock: 0,
      tecnicosDisponibles: 0,
      clientesActivos: 0
    }
  };

  // Observadores
  const observadores = {};

  // Suscribirse a cambios de estado
  const subscribe = (clave, callback) => {
    if (!observadores[clave]) {
      observadores[clave] = [];
    }
    observadores[clave].push(callback);

    // Retornar función para desuscribirse
    return () => {
      const index = observadores[clave].indexOf(callback);
      if (index > -1) {
        observadores[clave].splice(index, 1);
      }
    };
  };

  // Notificar a observadores
  const notificar = (clave, valor) => {
    if (observadores[clave]) {
      observadores[clave].forEach(callback => callback(valor));
    }
  };

  // Obtener estado
  const getState = (clave) => {
    if (!clave) return state;
    return state[clave];
  };

  // Actualizar estado (shallow merge)
  const setState = (clave, valor) => {
    if (typeof clave === 'object') {
      // Si paso un objeto, hacer merge
      state = { ...state, ...clave };
      notificar(null, state);
    } else {
      state[clave] = valor;
      notificar(clave, valor);
    }
  };

  // Actualizar array (agregar/actualizar item)
  const updateArray = (clave, item, idField = 'id') => {
    const array = state[clave];
    const index = array.findIndex(x => x[idField] === item[idField]);

    if (index > -1) {
      array[index] = { ...array[index], ...item };
    } else {
      array.push(item);
    }

    notificar(clave, [...array]);
  };

  // Eliminar item de array
  const removeFromArray = (clave, id, idField = 'id') => {
    const array = state[clave];
    const filtered = array.filter(x => x[idField] !== id);
    state[clave] = filtered;
    notificar(clave, [...filtered]);
  };

  // Actualizar estadísticas
  const updateEstadisticas = () => {
    const stats = {
      ordenesTotales: state.ordenes.length,
      ordenesPendientes: state.ordenes.filter(o => o.estado === 'pendiente').length,
      ordenesEnProgreso: state.ordenes.filter(o => o.estado === 'en-progreso').length,
      ordenesCompletadas: state.ordenes.filter(o => o.estado === 'completada').length,
      inventarioItems: state.inventario.length,
      itemsBajoStock: state.inventario.filter(i => i.stock < i.stockMinimo).length,
      tecnicosDisponibles: state.empleados.filter(e => e.disponible && e.estado === 'activo').length,
      clientesActivos: state.clientes.filter(c => c.estado === 'activo').length
    };

    state.estadisticas = stats;
    notificar('estadisticas', stats);
  };

  // Agregar notificación
  const addNotification = (mensaje, tipo = 'info', duracion = 3000) => {
    const id = Date.now();
    const notif = { id, mensaje, tipo, duracion };

    state.ui.notificaciones.push(notif);
    notificar('notificaciones', state.ui.notificaciones);

    // Auto-remover después de duracion
    if (duracion) {
      setTimeout(() => {
        removeNotification(id);
      }, duracion);
    }

    return id;
  };

  // Remover notificación
  const removeNotification = (id) => {
    state.ui.notificaciones = state.ui.notificaciones.filter(n => n.id !== id);
    notificar('notificaciones', state.ui.notificaciones);
  };

  // Limpiar estado
  const reset = () => {
    state = { ...state };
    notificar(null, state);
  };

  return {
    getState,
    setState,
    updateArray,
    removeFromArray,
    subscribe,
    updateEstadisticas,
    addNotification,
    removeNotification,
    reset
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StateManager;
}
