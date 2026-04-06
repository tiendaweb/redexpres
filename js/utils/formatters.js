/**
 * Formatters - Funciones para formatear datos
 */

const Formatters = (() => {
  // Fecha
  const date = (value, formato = 'DD/MM/YYYY') => {
    if (!value) return '-';

    const fecha = new Date(value);
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = fecha.getFullYear();

    if (formato === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
    return `${day}/${month}/${year}`;
  };

  // Hora
  const time = (value, formato24 = true) => {
    if (!value) return '-';

    const fecha = new Date(value);
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  // Fecha y Hora
  const datetime = (value) => {
    if (!value) return '-';
    return `${date(value)} ${time(value)}`;
  };

  // Dinero/Moneda
  const currency = (value, moneda = 'ARS') => {
    if (value === null || value === undefined) return '-';

    const num = parseFloat(value);
    const simbolos = {
      'ARS': '$',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };

    const simbolo = simbolos[moneda] || moneda;
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: moneda
    }).format(num);
  };

  // Porcentaje
  const percentage = (value, decimales = 2) => {
    if (value === null || value === undefined) return '-';
    const num = parseFloat(value);
    return `${num.toFixed(decimales)}%`;
  };

  // Número con separador de miles
  const number = (value, decimales = 0) => {
    if (value === null || value === undefined) return '-';
    const num = parseFloat(value);
    return num.toLocaleString('es-AR', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales
    });
  };

  // Tamaño de archivo
  const fileSize = (bytes) => {
    if (!bytes) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = Math.abs(bytes);
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  // Duración (en segundos)
  const duration = (seconds) => {
    if (!seconds) return '0s';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0) parts.push(`${secs}s`);

    return parts.join(' ');
  };

  // Capitalizar
  const capitalize = (value) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  // Mayúsculas
  const uppercase = (value) => {
    return value ? value.toUpperCase() : '';
  };

  // Minúsculas
  const lowercase = (value) => {
    return value ? value.toLowerCase() : '';
  };

  // Truncar
  const truncate = (value, length = 20) => {
    if (!value || value.length <= length) return value;
    return value.substring(0, length) + '...';
  };

  // Slug
  const slug = (value) => {
    return value
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      || '';
  };

  // Teléfono
  const phone = (value) => {
    if (!value) return '-';
    return value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  // Status con color
  const status = (value) => {
    const statusMap = {
      'pendiente': '<span class="badge badge-amber">Pendiente</span>',
      'en-progreso': '<span class="badge badge-blue">En progreso</span>',
      'completada': '<span class="badge badge-emerald">Completada</span>',
      'cancelada': '<span class="badge badge-red">Cancelada</span>',
      'activo': '<span class="badge badge-emerald">Activo</span>',
      'inactivo': '<span class="badge badge-red">Inactivo</span>'
    };

    return statusMap[value] || `<span class="badge">${value}</span>`;
  };

  return {
    date,
    time,
    datetime,
    currency,
    percentage,
    number,
    fileSize,
    duration,
    capitalize,
    uppercase,
    lowercase,
    truncate,
    slug,
    phone,
    status
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Formatters;
}
