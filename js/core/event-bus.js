/**
 * Event Bus - Bus de eventos global
 * Permite comunicación desacoplada entre módulos
 */

const EventBus = (() => {
  const listeners = {};

  // Escuchar evento
  const on = (evento, callback) => {
    if (!listeners[evento]) {
      listeners[evento] = [];
    }
    listeners[evento].push(callback);

    // Retornar función para desuscribirse
    return () => {
      const index = listeners[evento].indexOf(callback);
      if (index > -1) {
        listeners[evento].splice(index, 1);
      }
    };
  };

  // Escuchar evento una sola vez
  const once = (evento, callback) => {
    const wrapper = (data) => {
      callback(data);
      unsubscribe();
    };

    const unsubscribe = on(evento, wrapper);
    return unsubscribe;
  };

  // Emitir evento
  const emit = (evento, datos = null) => {
    if (listeners[evento]) {
      listeners[evento].forEach(callback => {
        try {
          callback(datos);
        } catch (error) {
          console.error(`Error en evento ${evento}:`, error);
        }
      });
    }
  };

  // Desuscribirse
  const off = (evento, callback) => {
    if (listeners[evento]) {
      listeners[evento] = listeners[evento].filter(cb => cb !== callback);
    }
  };

  // Limpiar todos los listeners
  const clear = (evento) => {
    if (evento) {
      delete listeners[evento];
    } else {
      Object.keys(listeners).forEach(e => delete listeners[e]);
    }
  };

  return {
    on,
    once,
    emit,
    off,
    clear
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EventBus;
}
