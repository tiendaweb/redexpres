/**
 * Fibra Óptica Module
 * Fiber optic management and consumption calculator
 */

const FibraModule = (() => {
  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            Gestión de <span class="text-emerald">Fibra Óptica</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Calculadora de consumo y estado de bobinas</p>
        </div>

        <!-- Bobinas status -->
        <div class="col-6 glass fade-up delay-2" style="padding: 24px">
          <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 16px">Estado de Bobinas</h3>
          <div id="bobinas-list" style="display: flex; flex-direction: column; gap: 16px">
          </div>
        </div>

        <!-- Calculator -->
        <div class="col-6 glass fade-up delay-2" style="padding: 24px">
          <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 16px">Calculadora de Consumo</h3>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Tipo de Fibra</label>
              <select id="tipo-fibra" style="width: 100%; padding: 8px 12px; background: var(--bg-panel); border: 1px solid var(--border-glass); border-radius: 8px; color: var(--text-primary); font-family: var(--font-body)">
                <option value="12">F.O. 12 hilos</option>
                <option value="24">F.O. 24 hilos</option>
              </select>
            </div>
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Desde (metros)</label>
              <input id="desde" type="number" placeholder="Ej: 100" style="width: 100%; padding: 8px 12px; background: var(--bg-panel); border: 1px solid var(--border-glass); border-radius: 8px; color: var(--text-primary); font-family: var(--font-body)">
            </div>
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Hasta (metros)</label>
              <input id="hasta" type="number" placeholder="Ej: 150" style="width: 100%; padding: 8px 12px; background: var(--bg-panel); border: 1px solid var(--border-glass); border-radius: 8px; color: var(--text-primary); font-family: var(--font-body)">
            </div>
            <button onclick="FibraModule.calcularConsumo()" class="btn btn-primary" style="margin-top: 8px">Calcular Consumo</button>
            <div id="resultado-calculo" style="display: none; margin-top: 12px; padding: 12px; background: var(--emerald-dim); border-radius: 8px; border-left: 3px solid var(--emerald)">
              <p style="font-size: 12px; color: var(--emerald); font-weight: 600">Consumo: <span id="consumo-valor">-- m</span></p>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px">Stock residual proyectado</p>
            </div>
          </div>
        </div>

        <!-- Historial de consumo -->
        <div class="col-12 glass fade-up delay-3" style="padding: 24px; margin-top: 16px">
          <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 16px">Historial de Consumo</h3>
          <table class="data-table" id="consumo-table">
            <thead>
              <tr>
                <th>Técnico</th>
                <th>Nodo</th>
                <th>Fecha</th>
                <th>Rango</th>
                <th>Consumo</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody id="consumo-body">
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderBobinas();
    renderHistorial();
    attachEventListeners();
  };

  const renderBobinas = () => {
    const html = MockData.bobinasData.map(b => `
      <div class="glass" style="padding: 16px">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px">
          <div>
            <p style="font-size: 13px; font-weight: 600; color: var(--text-primary)">${b.tipo}</p>
            <p style="font-size: 11px; color: var(--text-muted)">${b.metros}m total</p>
          </div>
          <span class="badge ${b.estado === 'Activa' ? 'badge-emerald' : 'badge-cyan'}" style="font-size: 10px">${b.estado}</span>
        </div>
        <div class="progress-track" style="margin-bottom: 8px">
          <div class="progress-fill fill-cyan" style="width: ${b.porcentaje}%"></div>
        </div>
        <p style="font-size: 10px; color: var(--text-dim)">Disponible: ${b.disponible}m (${100 - b.porcentaje}%)</p>
      </div>
    `).join('');

    document.getElementById('bobinas-list').innerHTML = html;
  };

  const renderHistorial = () => {
    const html = MockData.consumoFibraHistory.map(c => `
      <tr>
        <td style="font-weight: 500">${c.tecnico}</td>
        <td>${c.nodo}</td>
        <td><span class="font-mono" style="font-size: 11px">${c.fecha}</span></td>
        <td style="font-size: 12px">${c.desde} → ${c.hasta}</td>
        <td><strong style="color: var(--cyan)">${c.consumo}</strong></td>
        <td><span class="badge badge-amber" style="font-size: 10px">${c.tipo}</span></td>
      </tr>
    `).join('');

    document.getElementById('consumo-body').innerHTML = html;
  };

  const calcularConsumo = () => {
    const desde = parseInt(document.getElementById('desde').value);
    const hasta = parseInt(document.getElementById('hasta').value);
    
    if (!desde || !hasta || desde >= hasta) {
      alert('Ingrese valores válidos (desde < hasta)');
      return;
    }

    const consumo = hasta - desde;
    const resultDiv = document.getElementById('resultado-calculo');
    document.getElementById('consumo-valor').textContent = consumo + ' m';
    resultDiv.style.display = 'block';

    StateManager.addAuditLog('fibra_calculator_used', { consumo });
  };

  const attachEventListeners = () => {
    // Event listeners
  };

  return {
    render,
    calcularConsumo,
  };
})();
