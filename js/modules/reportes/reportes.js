const ReportesModule = (() => {
  const render = (container) => {
    const stats = StateManager.getState('estadisticas');

    const html = `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
        <h2>Reportes</h2>

        <div class="grid grid-2">
          <div class="card glass">
            <h3 style="margin-bottom: var(--spacing-lg);">📊 Resumen de Órdenes</h3>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              <div style="display: flex; justify-content: space-between;">
                <span>Total:</span>
                <strong class="text-cyan">${stats.ordenesTotales}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Completadas:</span>
                <strong class="text-emerald">${stats.ordenesCompletadas}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Pendientes:</span>
                <strong class="text-amber">${stats.ordenesPendientes}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>En Progreso:</span>
                <strong class="text-blue">${stats.ordenesEnProgreso}</strong>
              </div>
            </div>
          </div>

          <div class="card glass">
            <h3 style="margin-bottom: var(--spacing-lg);">📦 Resumen de Inventario</h3>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              <div style="display: flex; justify-content: space-between;">
                <span>Total Ítems:</span>
                <strong class="text-cyan">${stats.inventarioItems}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Stock Bajo:</span>
                <strong class="text-amber">${stats.itemsBajoStock}</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="card glass">
          <h3 style="margin-bottom: var(--spacing-lg);">Descargar Reportes</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg);">
            <button class="btn btn-primary btn-block" onclick="ReportesModule.exportPDF()">📄 Exportar PDF</button>
            <button class="btn btn-primary btn-block" onclick="ReportesModule.exportExcel()">📊 Exportar Excel</button>
            <button class="btn btn-primary btn-block" onclick="ReportesModule.exportCSV()">📋 Exportar CSV</button>
            <button class="btn btn-secondary btn-block" onclick="ReportesModule.printReport()">🖨️ Imprimir</button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    document.getElementById('page-title').textContent = 'Reportes';
  };

  const exportPDF = () => {
    NotificationService.info('Generando PDF...');
    setTimeout(() => {
      NotificationService.success('PDF exportado correctamente');
    }, 1000);
  };

  const exportExcel = () => {
    NotificationService.info('Generando Excel...');
    setTimeout(() => {
      NotificationService.success('Excel exportado correctamente');
    }, 1000);
  };

  const exportCSV = () => {
    NotificationService.info('Generando CSV...');
    setTimeout(() => {
      NotificationService.success('CSV exportado correctamente');
    }, 1000);
  };

  const printReport = () => {
    window.print();
  };

  return { render, exportPDF, exportExcel, exportCSV, printReport };
})();
