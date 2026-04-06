/**
 * Constants - Constantes de la aplicación
 */

const Constants = {
  // Estado de órdenes
  ORDEN_ESTADOS: {
    PENDIENTE: 'pendiente',
    EN_PROGRESO: 'en-progreso',
    COMPLETADA: 'completada',
    CANCELADA: 'cancelada'
  },

  // Prioridad de órdenes
  ORDEN_PRIORIDADES: {
    BAJA: 'baja',
    NORMAL: 'normal',
    ALTA: 'alta',
    CRITICA: 'critica'
  },

  // Estado de empleados
  EMPLEADO_ESTADOS: {
    ACTIVO: 'activo',
    INACTIVO: 'inactivo',
    LICENCIA: 'licencia'
  },

  // Roles
  ROLES: {
    ADMIN: 'admin',
    GERENTE: 'gerente',
    SUPERVISOR: 'supervisor',
    TECNICO: 'tecnico',
    OPERADOR: 'operador'
  },

  // Categorías de inventario
  INVENTARIO_CATEGORIAS: {
    NODO: 'nodo',
    INSTALACION: 'instalacion',
    EQUIPO: 'equipo',
    CONSUMIBLE: 'consumible',
    FIBRA: 'fibra'
  },

  // Tipo de cliente
  CLIENTE_TIPOS: {
    RESIDENCIAL: 'residencial',
    COMERCIAL: 'comercial',
    INDUSTRIAL: 'industrial',
    GOBIERNO: 'gobierno'
  },

  // Estado de cliente
  CLIENTE_ESTADOS: {
    ACTIVO: 'activo',
    INACTIVO: 'inactivo',
    SUSPENDIDO: 'suspendido'
  },

  // Tipos de alertas
  ALERTA_TIPOS: {
    STOCK_BAJO: 'stock_bajo',
    STOCK_CRITICO: 'stock_critico',
    VENCIMIENTO: 'vencimiento',
    MANTENIMIENTO: 'mantenimiento',
    ERROR: 'error'
  },

  // Nivel de alerta
  ALERTA_NIVELES: {
    BAJO: 'bajo',
    ADVERTENCIA: 'advertencia',
    CRITICO: 'critico'
  },

  // Tipos de notificación
  NOTIF_TIPOS: {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
  },

  // Monedas
  MONEDAS: {
    ARS: 'ARS',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP'
  },

  // Unidades de medida
  UNIDADES: {
    UNIDAD: 'u',
    METRO: 'm',
    KILOGRAMO: 'kg',
    LITRO: 'l',
    CAJA: 'caja',
    ROLLO: 'rollo'
  },

  // Permisos por rol
  PERMISOS: {
    admin: {
      ordenes: ['crear', 'leer', 'actualizar', 'eliminar'],
      inventario: ['crear', 'leer', 'actualizar', 'eliminar'],
      clientes: ['crear', 'leer', 'actualizar', 'eliminar'],
      empleados: ['crear', 'leer', 'actualizar', 'eliminar'],
      reportes: ['leer', 'exportar'],
      admin: ['acceso']
    },
    gerente: {
      ordenes: ['crear', 'leer', 'actualizar'],
      inventario: ['leer', 'actualizar'],
      clientes: ['leer'],
      empleados: ['leer'],
      reportes: ['leer', 'exportar']
    },
    supervisor: {
      ordenes: ['leer', 'actualizar'],
      inventario: ['leer'],
      empleados: ['leer'],
      reportes: ['leer']
    },
    tecnico: {
      ordenes: ['leer', 'actualizar'],
      inventario: ['leer']
    },
    operador: {
      ordenes: ['leer'],
      inventario: ['leer']
    }
  },

  // Colores para badges
  COLORES: {
    cyan: '#00e5ff',
    emerald: '#00ffa3',
    red: '#ff3b6b',
    amber: '#ffb020',
    blue: '#0ea5e9',
    purple: '#a78bfa',
    lime: '#84cc16'
  },

  // Límites de paginación
  PAGINACION: {
    DEFAULT: 10,
    SMALL: 5,
    LARGE: 25,
    XLARGE: 50
  },

  // Tiempos
  TIEMPOS: {
    NOTIF_DURACION: 3000,
    MODAL_DURACION: 300,
    DEBOUNCE: 300,
    THROTTLE: 500
  },

  // URLs
  URLs: {
    API_BASE: 'http://localhost:3000/api',
    WEB_BASE: window.location.origin
  },

  // Validaciones
  VALIDACIONES: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[\d\s\-\(\)]{7,}$/,
    URL_REGEX: /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Constants;
}
