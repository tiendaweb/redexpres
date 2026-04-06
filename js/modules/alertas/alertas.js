/**
 * Alertas Module
 * Alert management and critical warnings display
 */

const AlertasModule = (() => {
  let currentFilter = 'todos';

  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            Panel de <span class="text-red">Alertas</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Materiales bajo mínimo y críticos</p>
        </div>

        <!-- Filter buttons -->
        <div class="col-12 fade-up delay-2">
          <div class="tabs">
            <button class="tab-btn active" onclick="AlertasModule.filterAlertas('todos', this)">Todas</button>
            <button class="tab-btn" onclick="AlertasModule.filterAlertas('crit', this)">Críticas</button>
            <button class="tab-btn" onclick="AlertasModule.filterAlertas('warn', this)">Advertencias</button>
          </div>
        </div>

        <!-- Alertas list -->
        <div class="col-12 glass fade-up delay-3" style="padding: 24px">
          <div id="alertas-full" style="display: flex; flex-direction: column; gap: 12px">
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderAlertas('todos');
  };

  const renderAlertas = (filter) => {
    const data = filter === 'todos' ? MockData.alertasData : MockData.alertasData.filter(a => a.nivel === filter);
    const html = data.map(a => `
      <div class="glass alert-item" style="padding: 16px; border-left: 3px solid ${a.nivel === 'crit' ? 'var(--red)' : 'var(--amber)'}">
        <span class="dot ${a.nivel === 'crit' ? 'dot-red' : 'dot-amber'}" style="flex-shrink: 0"></span>
        <div style="flex: 1">
          <p style="font-size: 12px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary)">${a.material}</p>
          <p style="font-size: 11px; color: var(--text-muted)">
            Stock: <strong style="color: ${a.nivel === 'crit' ? 'var(--red)' : 'var(--amber)'}">${a.stock}</strong> ·
            Mín: <strong>${a.min}</strong>
          </p>
          <p style="font-size: 10px; color: var(--text-dim); margin-top: 4px">${a.accion}</p>
        </div>
        <span class="badge ${a.nivel === 'crit' ? 'badge-red' : 'badge-amber'}">${a.nivel === 'crit' ? 'CRÍTICO' : 'BAJO'}</span>
      </div>
    `).join('');

    document.getElementById('alertas-full').innerHTML = html;
  };

  const filterAlertas = (filter, btn) => {
    currentFilter = filter;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAlertas(filter);
  };

  return {
    render,
    filterAlertas,
  };
})();
