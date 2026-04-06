/**
 * Existencias Module
 * Displays stock summary dashboard
 */

const ExistenciasModule = (() => {
  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            Resumen de <span class="text-cyan">Existencias</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Análisis integral de inventario</p>
        </div>

        <div id="existencias-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px">
        </div>

        <div class="col-12 glass fade-up delay-3" style="padding: 24px">
          <h3 style="margin-bottom: 16px; font-weight: 600">Alertas Activas</h3>
          <div id="existencias-alerts">
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderSummary();
    renderAlerts();
  };

  const renderSummary = () => {
    const stocks = MockData.stockData;
    const alerts = MockData.alertasData;
    const bobinas = MockData.bobinasData;
    const tecnicosCount = MockData.tecnicosData.filter(t => t.estado === 'activo').length;

    const stats = {
      totalItems: stocks.length,
      lowStock: stocks.filter(s => s.stock < s.min).length,
      criticalAlerts: alerts.filter(a => a.nivel === 'crit').length,
      totalAlerts: alerts.length,
      fiberAvailable: bobinas.reduce((sum, b) => sum + b.disponible, 0),
      activeTecnicos: tecnicosCount,
    };

    const summaryHTML = `
      <div class="glass fade-up delay-2" style="padding: 20px; border-left: 4px solid var(--cyan)">
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px">Ítems en Inventario</p>
        <p style="font-size: 24px; font-weight: 700; color: var(--cyan)">${stats.totalItems}</p>
      </div>

      <div class="glass fade-up delay-2" style="padding: 20px; border-left: 4px solid var(--amber)">
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px">Stock Bajo</p>
        <p style="font-size: 24px; font-weight: 700; color: var(--amber)">${stats.lowStock}</p>
      </div>

      <div class="glass fade-up delay-2" style="padding: 20px; border-left: 4px solid var(--red)">
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px">Alertas Críticas</p>
        <p style="font-size: 24px; font-weight: 700; color: var(--red)">${stats.criticalAlerts}</p>
      </div>

      <div class="glass fade-up delay-2" style="padding: 20px; border-left: 4px solid var(--emerald)">
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px">Fibra Disponible</p>
        <p style="font-size: 24px; font-weight: 700; color: var(--emerald)">${stats.fiberAvailable}m</p>
      </div>

      <div class="glass fade-up delay-2" style="padding: 20px; border-left: 4px solid var(--purple)">
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px">Técnicos Activos</p>
        <p style="font-size: 24px; font-weight: 700; color: var(--purple)">${stats.activeTecnicos}</p>
      </div>

      <div class="glass fade-up delay-2" style="padding: 20px; border-left: 4px solid var(--blue)">
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px">Total de Alertas</p>
        <p style="font-size: 24px; font-weight: 700; color: var(--blue)">${stats.totalAlerts}</p>
      </div>
    `;

    document.getElementById('existencias-summary').innerHTML = summaryHTML;
  };

  const renderAlerts = () => {
    const alerts = MockData.alertasData;

    if (alerts.length === 0) {
      document.getElementById('existencias-alerts').innerHTML = `
        <p style="color: var(--text-muted); text-align: center; padding: 20px">No hay alertas activas</p>
      `;
      return;
    }

    const alertsHTML = alerts.map(alert => {
      const badgeColor = alert.nivel === 'crit' ? 'var(--red)' : 'var(--amber)';
      const badgeLabel = alert.nivel === 'crit' ? 'CRÍTICO' : 'ADVERTENCIA';
      return `
        <div style="padding: 12px; border-radius: var(--radius-md); border-left: 3px solid ${badgeColor}; background: ${badgeColor}08; margin-bottom: 8px">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px">
            <p style="font-weight: 600; color: var(--text-primary); flex: 1">${alert.material}</p>
            <span style="padding: 2px 6px; border-radius: 3px; background: ${badgeColor}22; color: ${badgeColor}; font-size: 10px; font-weight: 600">${badgeLabel}</span>
          </div>
          <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px">Stock: ${alert.stock} / Mínimo: ${alert.min}</p>
          <p style="font-size: 11px; color: var(--text-dim)">${alert.accion}</p>
        </div>
      `;
    }).join('');

    document.getElementById('existencias-alerts').innerHTML = alertsHTML;
  };

  return { render };
})();
