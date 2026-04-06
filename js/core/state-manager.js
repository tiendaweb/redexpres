/**
 * State Manager
 * Centralized state management for the application
 */
const StateManager = (() => {
  const STATE_STORAGE_KEY = 'omnistockstate';

  let state = {
    currentPage: 'dashboard',
    dashboard: {
      kpis: [],
      inventory: [],
      alerts: [],
    },
    instalacion: {
      filter: 'todos',
    },
    materiales: {
      filter: 'todos',
    },
    certificacion: {
      filter: 'todos',
    },
    existencias: {
      activeTab: 'stock',
    },
    movimientos: {
      history: [],
      filter: 'todos',
    },
    fibra: {
      bobinas: [],
      consumoHistory: [],
    },
    tecnicos: {
      tecnicos: [],
      equipos: [],
    },
    alertas: {
      items: [],
      filter: 'todos',
    },
    auditLog: [],
    user: {
      id: null,
      name: 'Usuario',
      role: 'supervisor',
    },
  };

  let listeners = {};

  /**
   * Initialize state from localStorage or defaults
   */
  const init = () => {
    try {
      const saved = localStorage.getItem(STATE_STORAGE_KEY);
      if (saved) {
        state = { ...state, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load saved state:', e);
    }
  };

  /**
   * Get state value by path
   * @param {string} path - Dot notation path (e.g., 'dashboard.kpis')
   */
  const get = (path) => {
    if (!path) return state;

    return path.split('.').reduce((obj, key) => obj?.[key], state);
  };

  /**
   * Set state value by path
   * @param {string} path - Dot notation path
   * @param {*} value - New value
   */
  const set = (path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let obj = state;

    // Navigate to parent object
    for (const key of keys) {
      obj[key] = obj[key] || {};
      obj = obj[key];
    }

    obj[lastKey] = value;
    save();
    notify(path, value);
  };

  /**
   * Update state object (shallow merge)
   * @param {string} path - Dot notation path
   * @param {object} updates - Object with properties to update
   */
  const update = (path, updates) => {
    const current = get(path) || {};
    set(path, { ...current, ...updates });
  };

  /**
   * Save state to localStorage
   */
  const save = () => {
    try {
      localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  };

  /**
   * Subscribe to state changes
   * @param {string} path - Path to subscribe to (e.g., 'dashboard.kpis')
   * @param {function} callback - Called with new value when changed
   */
  const subscribe = (path, callback) => {
    if (!listeners[path]) {
      listeners[path] = [];
    }
    listeners[path].push(callback);

    // Return unsubscribe function
    return () => {
      listeners[path] = listeners[path].filter(l => l !== callback);
    };
  };

  /**
   * Notify all listeners of state change
   */
  const notify = (path, value) => {
    if (listeners[path]) {
      listeners[path].forEach(callback => callback(value));
    }
  };

  /**
   * Add audit log entry
   */
  const addAuditLog = (action, details = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user: state.user.name,
      action,
      details,
    };

    state.auditLog.push(logEntry);

    // Keep only last 1000 entries
    if (state.auditLog.length > 1000) {
      state.auditLog = state.auditLog.slice(-1000);
    }

    save();
  };

  /**
   * Clear all state
   */
  const clear = () => {
    localStorage.removeItem(STATE_STORAGE_KEY);
    location.reload();
  };

  return {
    init,
    get,
    set,
    update,
    subscribe,
    addAuditLog,
    clear,
  };
})();

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', StateManager.init);
} else {
  StateManager.init();
}
