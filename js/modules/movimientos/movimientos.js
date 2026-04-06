/**
 * Movimientos Module
 * Displays movement history (ingresos, egresos, etc.)
 */

const MovimientosModule = (() => {
  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            Últimos <span class="text-cyan">Movimientos</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Historial de cambios en el inventario</p>
        </div>

        <div class="col-12 glass fade-up delay-2" style="padding: 24px">
          <div id="movimientos-log" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px">
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderMovimientos();
  };

  const renderMovimientos = () => {
    const colors = {
      ingreso: 'var(--cyan)',
      certif: 'var(--red)',
      consumo: 'var(--red)',
      logistica: 'var(--amber)'
    };
    const icons = {
      ingreso: '↑',
      certif: '↓',
      consumo: '↓',
      logistica: '↑'
    };

    const html = MockData.movimientos.map(m => `
      <div class="glass" style="padding: 16px">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px">
          <span style="width: 28px; height: 28px; border-radius: 8px; background: rgba(0, 0, 0, 0.2); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: ${colors[m.badge]}">
            ${icons[m.badge]}
          </span>
          <span style="font-size: 11px; font-family: 'Space Mono', monospace; color: ${colors[m.badge]}">
            ${m.tipo === '+' ? 'SUMA' : 'RESTA'}
          </span>
        </div>
        <p style="font-size: 13px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary)">${m.desc}</p>
        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px">${m.detalle}</p>
        <p style="font-size: 10px; color: var(--text-dim); font-family: 'Space Mono', monospace">${m.cuando}</p>
      </div>
    `).join('');

    document.getElementById('movimientos-log').innerHTML = html;
  };

  return {
    render,
  };
})();
