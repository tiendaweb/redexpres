/**
 * Validators - Funciones de validación
 */

const Validators = (() => {
  // Email válido
  const email = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? null : 'Email inválido';
  };

  // Teléfono válido (formato básico)
  const phone = (value) => {
    const regex = /^[\d\s\-\(\)]{7,}$/;
    return regex.test(value) ? null : 'Teléfono inválido';
  };

  // Número positivo
  const positiveNumber = (value) => {
    const num = parseFloat(value);
    return num > 0 ? null : 'Debe ser un número positivo';
  };

  // Longitud mínima
  const minLength = (min) => {
    return (value) => {
      return value && value.length >= min ? null : `Mínimo ${min} caracteres`;
    };
  };

  // Longitud máxima
  const maxLength = (max) => {
    return (value) => {
      return value && value.length <= max ? null : `Máximo ${max} caracteres`;
    };
  };

  // Requerido
  const required = (value) => {
    return value && value.toString().trim().length > 0 ? null : 'Este campo es requerido';
  };

  // Fecha válida
  const date = (value) => {
    const fecha = new Date(value);
    return !isNaN(fecha.getTime()) ? null : 'Fecha inválida';
  };

  // URL válida
  const url = (value) => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'URL inválida';
    }
  };

  // Número entero
  const integer = (value) => {
    return Number.isInteger(parseFloat(value)) ? null : 'Debe ser un número entero';
  };

  // Rango numérico
  const range = (min, max) => {
    return (value) => {
      const num = parseFloat(value);
      if (num >= min && num <= max) return null;
      return `Debe estar entre ${min} y ${max}`;
    };
  };

  // RUT válido (Argentina/Chile)
  const rut = (value) => {
    const cleaned = value.replace(/[\.\-]/g, '');
    if (!/^\d{7,9}[\dk]$/i.test(cleaned)) {
      return 'RUT inválido';
    }
    return null;
  };

  // Comparar dos valores
  const match = (fieldName) => {
    return (value, allValues) => {
      return value === allValues[fieldName] ? null : 'Los valores no coinciden';
    };
  };

  return {
    email,
    phone,
    positiveNumber,
    minLength,
    maxLength,
    required,
    date,
    url,
    integer,
    range,
    rut,
    match
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Validators;
}
