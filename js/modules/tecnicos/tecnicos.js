/**
 * Técnicos Module
 * Technician tracking and equipment management
 */

const TecnicosModule = (() => {
  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            Control de <span class="text-amber">Técnicos</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Trazabilidad y seguimiento de equipos en campo</p>
        </div>

        <!-- Técnicos activos -->
        <div class="col-12 glass fade-up delay-2" style="padding: 24px; margin-bottom: 16px">
          <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 16px">Técnicos Activos</h3>
          <div id="tecnicos-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px">
          </div>
        </div>

        <!-- Equipos en campo -->
        <div class="col-12 glass fade-up delay-3" style="padding: 24px">
          <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 16px">Equipos Asignados</h3>
          <table class="data-table" id="equipos-table">
            <thead>
              <tr>
                <th>Técnico</th>
                <th>N° Serie</th>
                <th>Modelo</th>
                <th>Cliente</th>
                <th>Orden</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody id="equipos-body">
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderTecnicos();
    renderEquipos();
  };

  const renderTecnicos = () => {
    const html = MockData.tecnicosData.map(t => `
      <div class="glass" style="padding: 16px">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px">
          <div class="tecnico-avatar">${t.nombre.charAt(0)}</div>
          <div style="flex: 1">
            <p style="font-size: 13px; font-weight: 600; color: var(--text-primary)">${t.nombre}</p>
            <p style="font-size: 10px; color: var(--text-dim); font-family: var(--font-mono)">${t.telefono}</p>
          </div>
          <span class="badge ${t.estado === 'activo' ? 'badge-emerald' : 'badge-amber'}" style="font-size: 10px">${t.estado.toUpperCase()}</span>
        </div>
        <div style="padding: 8px; background: rgba(255, 255, 255, 0.02); border-radius: 8px; margin-bottom: 8px">
          <p style="font-size: 10px; color: var(--text-dim)">Equipos asignados</p>
          <p style="font-size: 16px; font-weight: 700; color: var(--cyan)">${t.equipoAsignado}</p>
        </div>
      </div>
    `).join('');

    document.getElementById('tecnicos-list').innerHTML = html;
  };

  const renderEquipos = () => {
    const html = MockData.equiposData.map(e => `
      <tr>
        <td style="font-weight: 500">${e.tecnico}</td>
        <td><span class="font-mono" style="font-size: 11px; color: var(--text-muted)">${e.numeroSerie}</span></td>
        <td>${e.modelo}</td>
        <td>${e.cliente}</td>
        <td><span class="font-mono" style="font-size: 11px">${e.orden}</span></td>
        <td><span class="chip ${e.estado === 'activo' ? 'status-ok' : 'status-warn'}" style="font-size: 10px; padding: 4px 8px">${e.estado.toUpperCase()}</span></td>
      </tr>
    `).join('');

    document.getElementById('equipos-body').innerHTML = html;
  };

  return {
    render,
  };
})();
