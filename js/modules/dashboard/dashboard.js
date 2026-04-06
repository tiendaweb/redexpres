/**
 * Dashboard Module - Panel principal con KPIs y estadísticas
 */

const DashboardModule = (() => {
  const render = (container) => {
    const stats = StateManager.getState('estadisticas');
    const alertas = StateManager.getState('alertas');
    const ordenes = StateManager.getState('ordenes');

    // HTML
    const html = `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-xl);">
        <!-- Títulogeo -->
        <div>
          <h1 style="font-size: 2.5rem; margin-bottom: var(--spacing-md);">Dashboard</h1>
          <p style="color: var(--text-muted);">Bienvenido al sistema de gestión Express</p>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-4">
          <!-- KPI: Órdenes -->
          <div class="card glass glow-cyan">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <small style="color: var(--text-muted);">ÓRDENES TOTALES</small>
                <div style="font-size: 2.5rem; font-weight: 700; color: var(--cyan); margin-top: 0.5rem;">${stats.ordenesTotales}</div>
              </div>
              <div style="font-size: 3rem;">📋</div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: var(--spacing-lg); font-size: 0.85rem;">
              <span class="badge badge-emerald">${stats.ordenesCompletadas} completadas</span>
              <span class="badge badge-amber">${stats.ordenesPendientes} pendientes</span>
            </div>
          </div>

          <!-- KPI: Inventario -->
          <div class="card glass glow-emerald">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <small style="color: var(--text-muted);">ÍTEMS DE INVENTARIO</small>
                <div style="font-size: 2.5rem; font-weight: 700; color: var(--emerald); margin-top: 0.5rem;">${stats.inventarioItems}</div>
              </div>
              <div style="font-size: 3rem;">📦</div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: var(--spacing-lg); font-size: 0.85rem;">
              <span class="badge badge-red">${stats.itemsBajoStock} bajo stock</span>
            </div>
          </div>

          <!-- KPI: Técnicos -->
          <div class="card glass glow-blue">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <small style="color: var(--text-muted);">TÉCNICOS DISPONIBLES</small>
                <div style="font-size: 2.5rem; font-weight: 700; color: var(--blue); margin-top: 0.5rem;">${stats.tecnicosDisponibles}</div>
              </div>
              <div style="font-size: 3rem;">👨‍💼</div>
            </div>
            <div style="margin-top: var(--spacing-lg); font-size: 0.85rem;">
              <span class="badge badge-cyan">En servicio</span>
            </div>
          </div>

          <!-- KPI: Clientes -->
          <div class="card glass glow-purple">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <small style="color: var(--text-muted);">CLIENTES ACTIVOS</small>
                <div style="font-size: 2.5rem; font-weight: 700; color: var(--purple); margin-top: 0.5rem;">${stats.clientesActivos}</div>
              </div>
              <div style="font-size: 3rem;">👥</div>
            </div>
          </div>
        </div>

        <!-- Alertas -->
        ${alertas.length > 0 ? `
          <div class="card glass">
            <h3 style="margin-bottom: var(--spacing-lg);">⚠️ Alertas Críticas</h3>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              ${alertas.slice(0, 3).map(alerta => `
                <div style="padding: var(--spacing-md); background: ${alerta.nivel === 'critico' ? 'var(--red-dim)' : 'var(--amber-dim)'}; border-radius: var(--radius-md); border-left: 3px solid ${alerta.nivel === 'critico' ? 'var(--red)' : 'var(--amber)'};">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <strong style="color: ${alerta.nivel === 'critico' ? 'var(--red)' : 'var(--amber)'};">${alerta.material}</strong>
                      <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--text-secondary);">${alerta.accion}</p>
                    </div>
                    <span class="badge ${alerta.nivel === 'critico' ? 'badge-red' : 'badge-amber'}">Stock: ${alerta.stockActual}</span>
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Órdenes Recientes -->
        <div class="card glass">
          <h3 style="margin-bottom: var(--spacing-lg);">Órdenes Recientes</h3>
          <div style="overflow-x: auto;">
            <table style="width: 100%; font-size: 0.9rem;">
              <thead style="background: var(--bg-secondary);">
                <tr>
                  <th style="padding: var(--spacing-md); text-align: left;">Orden</th>
                  <th style="padding: var(--spacing-md); text-align: left;">Cliente</th>
                  <th style="padding: var(--spacing-md); text-align: left;">Técnico</th>
                  <th style="padding: var(--spacing-md); text-align: center;">Estado</th>
                  <th style="padding: var(--spacing-md); text-align: center;">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                ${ordenes.slice(0, 5).map(orden => `
                  <tr style="border-bottom: 1px solid var(--border-secondary);">
                    <td style="padding: var(--spacing-md);"><strong>${orden.id}</strong></td>
                    <td style="padding: var(--spacing-md);">${orden.cliente.nombre}</td>
                    <td style="padding: var(--spacing-md);">${orden.tecnico.nombre}</td>
                    <td style="padding: var(--spacing-md); text-align: center;">${Formatters.status(orden.estado)}</td>
                    <td style="padding: var(--spacing-md); text-align: center;">
                      <span class="badge badge-${orden.prioridad === 'alta' ? 'red' : orden.prioridad === 'normal' ? 'amber' : 'cyan'}">${orden.prioridad}</span>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Actualizar título de página
    document.getElementById('page-title').textContent = 'Dashboard';
  };

  return {
    render
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DashboardModule;
}
