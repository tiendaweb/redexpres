/**
 * Table Component - Tabla genérica con paginación y filtros
 */

const Table = (() => {
  const render = (container, config) => {
    const {
      data = [],
      columns = [],
      onRowClick = null,
      filtros = [],
      paginacion = 10,
      acciones = null
    } = config;

    // Crear elemento
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper glass p-lg';
    wrapper.style.cssText = 'border-radius: var(--radius-lg); overflow: hidden;';

    // Crear tabla
    const table = document.createElement('table');
    table.style.cssText = 'width: 100%; border-collapse: collapse;';

    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.style.cssText = 'background: var(--bg-secondary); border-bottom: 2px solid var(--border-primary);';

    columns.forEach(col => {
      const th = document.createElement('th');
      th.style.cssText = `
        padding: var(--spacing-md);
        text-align: left;
        font-weight: 600;
        color: var(--text-primary);
        font-family: var(--font-display);
      `;
      th.textContent = col.label;
      headerRow.appendChild(th);
    });

    // Agregar header de acciones si existen
    if (acciones) {
      const th = document.createElement('th');
      th.style.cssText = 'padding: var(--spacing-md); text-align: center; font-weight: 600;';
      th.textContent = 'Acciones';
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');

    data.slice(0, paginacion).forEach((row, index) => {
      const tr = document.createElement('tr');
      tr.style.cssText = `
        border-bottom: 1px solid var(--border-secondary);
        transition: background-color var(--transition-fast);
        cursor: ${onRowClick ? 'pointer' : 'default'};
      `;
      tr.addEventListener('mouseenter', () => tr.style.backgroundColor = 'var(--bg-hover)');
      tr.addEventListener('mouseleave', () => tr.style.backgroundColor = 'transparent');

      if (onRowClick) {
        tr.addEventListener('click', () => onRowClick(row, index));
      }

      // Celdas
      columns.forEach(col => {
        const td = document.createElement('td');
        td.style.cssText = 'padding: var(--spacing-md); color: var(--text-secondary);';

        let valor = row[col.key];

        // Aplicar formatter si existe
        if (col.formatter && typeof col.formatter === 'function') {
          td.innerHTML = col.formatter(valor, row);
        } else {
          td.textContent = valor;
        }

        tr.appendChild(td);
      });

      // Acciones
      if (acciones) {
        const td = document.createElement('td');
        td.style.cssText = `
          padding: var(--spacing-md);
          text-align: center;
          display: flex;
          gap: var(--spacing-sm);
          justify-content: center;
        `;

        acciones.forEach(accion => {
          const btn = document.createElement('button');
          btn.className = `btn btn-sm btn-${accion.clase || 'secondary'}`;
          btn.textContent = accion.texto;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            accion.onClick(row);
          });
          td.appendChild(btn);
        });

        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrapper.appendChild(table);

    // Información de paginación
    const footer = document.createElement('div');
    footer.style.cssText = `
      padding: var(--spacing-md) var(--spacing-lg);
      background: var(--bg-secondary);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--text-sm);
      color: var(--text-muted);
      border-top: 1px solid var(--border-primary);
    `;
    footer.innerHTML = `
      <span>Mostrando ${Math.min(paginacion, data.length)} de ${data.length} registros</span>
      <div>
        <button class="btn btn-sm btn-ghost" ${paginacion <= 10 ? 'disabled' : ''}>← Anterior</button>
        <span style="margin: 0 1rem;">Página 1</span>
        <button class="btn btn-sm btn-ghost" ${data.length <= paginacion ? 'disabled' : ''}>Siguiente →</button>
      </div>
    `;

    wrapper.appendChild(footer);
    container.appendChild(wrapper);
  };

  return {
    render
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Table;
}
