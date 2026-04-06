/**
 * Dashboard Module
 * Main dashboard with KPIs, inventory table, and alerts panel
 */

const DashboardModule = (() => {
  let currentFilter = 'todos';

  const render = (container) => {
    const html = `
      <div class="bento">
        <!-- Main inventory section -->
        <div class="glass col-8 fade-up delay-2" style="padding: 24px">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
            <div>
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 4px">Inventario de Materiales</h2>
              <p class="text-muted" style="font-size: 12px">Valores en tiempo real · Actualizado ahora</p>
            </div>
            <div class="tabs" style="margin-bottom: 0">
              <button class="tab-btn active" onclick="DashboardModule.filterTable('todos', this)">Todos</button>
              <button class="tab-btn" onclick="DashboardModule.filterTable('nodo', this)">Nodo</button>
              <button class="tab-btn" onclick="DashboardModule.filterTable('inst', this)">Instalación</button>
            </div>
          </div>
          <table class="data-table" id="main-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Material</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody id="table-body">
            </tbody>
          </table>
        </div>

        <!-- Sidebar panel: Alerts -->
        <div class="col-4 fade-up delay-3" style="display: flex; flex-direction: column; gap: 16px">
          <!-- Critical alerts -->
          <div class="glass" style="padding: 22px; flex: 1">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px">
              <h3 class="font-display" style="font-size: 14px; font-weight: 700">Alertas Críticas</h3>
              <span class="badge badge-red" id="alertas-count">5 activas</span>
            </div>
            <div id="alertas-panel" style="display: flex; flex-direction: column; gap: 8px">
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderTable('todos');
    renderAlertas();
    attachEventListeners();
  };

  const getEstadoClass = (stock, min) => {
    const ratio = stock / min;
    if (ratio < 0.5) return 'status-crit';
    if (ratio < 1) return 'status-warn';
    return 'status-ok';
  };

  const getEstadoLabel = (stock, min) => {
    const ratio = stock / min;
    if (ratio < 0.5) return 'CRÍTICO';
    if (ratio < 1) return 'BAJO';
    return 'OK';
  };

  const renderTable = (filter) => {
    const data = filter === 'todos' ? MockData.stockData : MockData.stockData.filter(d => d.cat === filter);
    const tbody = document.getElementById('table-body');
    
    tbody.innerHTML = data.map(d => `
      <tr>
        <td><span class="font-mono" style="font-size: 12px; color: var(--text-muted)">${d.codigo}</span></td>
        <td style="font-weight: 500; color: var(--text-primary)">${d.material}</td>
        <td><span class="badge ${d.cat === 'nodo' ? 'badge-cyan' : 'badge-emerald'}" style="font-size: 10px">${d.cat.toUpperCase()}</span></td>
        <td><span class="font-mono" style="font-size: 15px; font-weight: 700; color: ${d.stock < d.min ? 'var(--red)' : 'var(--text-primary)'}">${d.stock}</span> <span style="font-size: 11px; color: var(--text-muted)">${d.unidad}</span></td>
        <td><span class="font-mono" style="font-size: 12px; color: var(--text-muted)">${d.min} ${d.unidad}</span></td>
        <td><span class="chip ${getEstadoClass(d.stock, d.min)}" style="font-size: 10px; padding: 4px 10px; border-radius: 5px">${getEstadoLabel(d.stock, d.min)}</span></td>
      </tr>
    `).join('');
  };

  const renderAlertas = () => {
    const alertasPanel = document.getElementById('alertas-panel');
    const alertasHTML = MockData.alertasData.map(a => `
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

    if (alertasPanel) alertasPanel.innerHTML = alertasHTML;
  };

  const filterTable = (filter, btn) => {
    currentFilter = filter;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTable(filter);
  };

  const attachEventListeners = () => {
    // Event listeners if needed
  };

  return {
    render,
    filterTable,
  };
})();
