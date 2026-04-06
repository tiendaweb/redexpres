/**
 * Instalación Module
 * Displays installation materials inventory
 */

const InstalacionModule = (() => {
  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            Materiales de <span class="text-cyan">Instalación</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Inventario de materiales para instalaciones</p>
        </div>

        <div class="col-12 glass fade-up delay-2" style="padding: 24px">
          <div id="instalacion-table" style="overflow-x: auto">
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderTable();
  };

  const renderTable = () => {
    const materials = MockData.stockData.filter(item => item.cat === 'inst');

    const html = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead style="background: var(--bg-secondary); border-bottom: 2px solid var(--cyan-dim);">
          <tr>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--cyan)">Código</th>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--cyan)">Material</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--cyan)">Stock</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--cyan)">Mínimo</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--cyan)">Estado</th>
          </tr>
        </thead>
        <tbody>
          ${materials.map((item, idx) => {
            const estado = item.stock < item.min ? (item.stock < item.min * 0.5 ? 'CRÍTICO' : 'BAJO') : 'OK';
            const badgeColor = item.stock < item.min ? (item.stock < item.min * 0.5 ? 'var(--red)' : 'var(--amber)') : 'var(--emerald)';
            return `
              <tr style="border-bottom: 1px solid var(--border-glass); transition: background 0.15s ease;"
                  onmouseenter="this.style.backgroundColor='var(--bg-hover)'"
                  onmouseleave="this.style.backgroundColor='transparent'">
                <td style="padding: 12px; font-family: var(--font-mono); color: var(--cyan); font-size: 12px">${item.codigo}</td>
                <td style="padding: 12px; color: var(--text-primary)">${item.material}</td>
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

    document.getElementById('instalacion-table').innerHTML = html;
  };

  return { render };
})();
