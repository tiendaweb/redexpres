/**
 * API Service - Cliente HTTP para comunicación con backend
 * Maneja peticiones GET, POST, PUT, DELETE con configuración centralizada
 */

const APIService = (() => {
  const API_BASE_URL = 'http://localhost:3000/api'; // Cambiar a URL real en producción
  const TIMEOUT = 10000;

  // Opciones por defecto
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: TIMEOUT
  };

  // GET Request
  const get = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        ...defaultOptions,
        ...options
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  };

  // POST Request
  const post = async (endpoint, data = {}, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        ...defaultOptions,
        ...options,
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  };

  // PUT Request
  const put = async (endpoint, data = {}, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        ...defaultOptions,
        ...options,
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  };

  // DELETE Request
  const del = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        ...defaultOptions,
        ...options
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    delete: del,
    setBaseURL: (url) => { API_BASE_URL = url; }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = APIService;
}
