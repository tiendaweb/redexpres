/**
 * Materiales Module
 * Displays full inventory with filtering by category
 */

const MaterialesModule = (() => {
  let currentFilter = 'todos';

  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            Inventario de <span class="text-cyan">Materiales</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Gestión completa de inventario</p>
        </div>

        <div class="col-12 glass fade-up delay-2" style="padding: 24px">
          <div class="tabs" style="margin-bottom: 24px; display: flex; gap: 8px; border-bottom: 2px solid var(--border-glass); padding-bottom: 12px;">
            <button class="tab-btn active" onclick="MaterialesModule.filterTable('todos', this)">Todos</button>
            <button class="tab-btn" onclick="MaterialesModule.filterTable('nodo', this)">Nodo</button>
            <button class="tab-btn" onclick="MaterialesModule.filterTable('inst', this)">Instalación</button>
          </div>
          <div id="materiales-table" style="overflow-x: auto">
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderTable();
  };

  const renderTable = () => {
    let materials = MockData.stockData;
    if (currentFilter !== 'todos') {
      materials = materials.filter(item => item.cat === currentFilter);
    }

    const stats = {
      total: materials.length,
      lowStock: materials.filter(m => m.stock < m.min && m.stock >= m.min * 0.5).length,
      critical: materials.filter(m => m.stock < m.min * 0.5).length,
    };

    const html = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <div style="background: var(--bg-panel); padding: 12px; border-radius: var(--radius-md); border-left: 3px solid var(--cyan);">
          <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px">Total Ítems</p>
          <p style="font-size: 18px; font-weight: 700; color: var(--cyan)">${stats.total}</p>
        </div>
        <div style="background: var(--bg-panel); padding: 12px; border-radius: var(--radius-md); border-left: 3px solid var(--amber);">
          <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px">Stock Bajo</p>
          <p style="font-size: 18px; font-weight: 700; color: var(--amber)">${stats.lowStock}</p>
        </div>
        <div style="background: var(--bg-panel); padding: 12px; border-radius: var(--radius-md); border-left: 3px solid var(--red);">
          <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px">Crítico</p>
          <p style="font-size: 18px; font-weight: 700; color: var(--red)">${stats.critical}</p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <thead style="background: var(--bg-secondary); border-bottom: 2px solid var(--cyan-dim);">
          <tr>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--cyan)">Código</th>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--cyan)">Material</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--cyan)">Categoría</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--cyan)">Stock</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--cyan)">Mínimo</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--cyan)">Estado</th>
          </tr>
        </thead>
        <tbody>
          ${materials.map((item, idx) => {
            const estado = item.stock < item.min ? (item.stock < item.min * 0.5 ? 'CRÍTICO' : 'BAJO') : 'OK';
            const badgeColor = item.stock < item.min ? (item.stock < item.min * 0.5 ? 'var(--red)' : 'var(--amber)') : 'var(--emerald)';
            const catLabel = item.cat === 'nodo' ? 'Nodo' : 'Instalación';
            return `
              <tr style="border-bottom: 1px solid var(--border-glass); transition: background 0.15s ease;"
                  onmouseenter="this.style.backgroundColor='var(--bg-hover)'"
                  onmouseleave="this.style.backgroundColor='transparent'">
                <td style="padding: 12px; font-family: var(--font-mono); color: var(--cyan); font-size: 12px">${item.codigo}</td>
                <td style="padding: 12px; color: var(--text-primary)">${item.material}</td>
                <td style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 12px">${catLabel}</td>
                <td style="padding: 12px; text-align: center; font-weight: 600; color: var(--text-primary)">${item.stock}</td>
                <td style="padding: 12px; text-align: center; color: var(--text-muted)">${item.min}</td>
                <td style="padding: 12px; text-align: center;">
                  <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; background: ${badgeColor}22; color: ${badgeColor}">
                    ${estado}
                  </span>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    document.getElementById('materiales-table').innerHTML = html;
  };

  const filterTable = (category, button) => {
    currentFilter = category;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderTable();
  };

  return { render, filterTable };
})();
