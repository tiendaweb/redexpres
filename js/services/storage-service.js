/**
 * Storage Service - Gestión de localStorage
 * Proporciona métodos para guardar/cargar datos del navegador
 */

const StorageService = (() => {
  const PREFIX = 'express_';

  // Guardar
  const save = (key, data) => {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(PREFIX + key, serialized);
      return true;
    } catch (error) {
      console.error('Storage save error:', error);
      return false;
    }
  };

  // Cargar
  const load = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage load error:', error);
      return defaultValue;
    }
  };

  // Verificar existencia
  const has = (key) => {
    return localStorage.getItem(PREFIX + key) !== null;
  };

  // Eliminar
  const remove = (key) => {
    localStorage.removeItem(PREFIX + key);
  };

  // Limpiar todo
  const clear = () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  };

  // Obtener todas las claves
  const keys = () => {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .map(key => key.substring(PREFIX.length));
  };

  // Obtener tamaño aproximado
  const getSize = () => {
    let size = 0;
    for (let key in localStorage) {
      if (key.startsWith(PREFIX)) {
        size += localStorage[key].length + key.length;
      }
    }
    return (size / 1024).toFixed(2) + ' KB';
  };

  return {
    save,
    load,
    has,
    remove,
    clear,
    keys,
    getSize
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageService;
}
