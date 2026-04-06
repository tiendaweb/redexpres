/**
 * Dashboard Module
 * Main dashboard with KPIs, inventory table, and alerts panel
 */

const DashboardModule = (() => {
  let currentFilter = 'todos';
  let currentTab = 'inventario';

  const render = (container) => {
    const html = `
      <div style="padding: 0 24px">
        <!-- Main tabs for different management sections -->
        <div class="glass fade-up delay-2" style="padding: 16px; margin-bottom: 24px">
          <div class="tabs" style="margin-bottom: 0; display: flex; gap: 8px; flex-wrap: wrap">
            <button class="tab-btn active" onclick="DashboardModule.switchTab('inventario', this)" style="padding: 8px 16px">📦 Inventario</button>
            <button class="tab-btn" onclick="DashboardModule.switchTab('tecnicos', this)" style="padding: 8px 16px">👨‍🔧 Técnicos</button>
            <button class="tab-btn" onclick="DashboardModule.switchTab('ordenes', this)" style="padding: 8px 16px">📋 Órdenes</button>
            <button class="tab-btn" onclick="DashboardModule.switchTab('clientes', this)" style="padding: 8px 16px">👥 Clientes</button>
            <button class="tab-btn" onclick="DashboardModule.switchTab('empleados', this)" style="padding: 8px 16px">👔 Empleados</button>
            <button class="tab-btn" onclick="DashboardModule.switchTab('fibra', this)" style="padding: 8px 16px">🌐 Fibra Óptica</button>
            <button class="tab-btn" onclick="DashboardModule.switchTab('movimientos', this)" style="padding: 8px 16px">↔️ Movimientos</button>
            <button class="tab-btn" onclick="DashboardModule.switchTab('reportes', this)" style="padding: 8px 16px">📊 Reportes</button>
          </div>
        </div>

        <div class="bento">
          <!-- Main content section -->
          <div class="glass col-8 fade-up delay-2" style="padding: 24px">
            <!-- Inventario Tab -->
            <div id="tab-inventario" class="tab-content">
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

            <!-- Técnicos Tab -->
            <div id="tab-tecnicos" class="tab-content" style="display: none">
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 20px">Gestión de Técnicos</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px" id="tecnicos-grid"></div>
            </div>

            <!-- Órdenes Tab -->
            <div id="tab-ordenes" class="tab-content" style="display: none">
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 20px">Gestión de Órdenes</h2>
              <table class="data-table" id="ordenes-table">
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Técnico Asignado</th>
                  </tr>
                </thead>
                <tbody id="ordenes-body"></tbody>
              </table>
            </div>

            <!-- Clientes Tab -->
            <div id="tab-clientes" class="tab-content" style="display: none">
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 20px">Gestión de Clientes</h2>
              <table class="data-table" id="clientes-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Dirección</th>
                    <th>Órdenes</th>
                  </tr>
                </thead>
                <tbody id="clientes-body"></tbody>
              </table>
            </div>

            <!-- Empleados Tab -->
            <div id="tab-empleados" class="tab-content" style="display: none">
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 20px">Gestión de Empleados</h2>
              <table class="data-table" id="empleados-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cargo</th>
                    <th>Departamento</th>
                    <th>Email</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody id="empleados-body"></tbody>
              </table>
            </div>

            <!-- Fibra Óptica Tab -->
            <div id="tab-fibra" class="tab-content" style="display: none">
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 20px">Gestión de Fibra Óptica</h2>
              <table class="data-table" id="fibra-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Tipo de Conexión</th>
                    <th>Velocidad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody id="fibra-body"></tbody>
              </table>
            </div>

            <!-- Movimientos Tab -->
            <div id="tab-movimientos" class="tab-content" style="display: none">
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 20px">Movimientos de Inventario</h2>
              <table class="data-table" id="movimientos-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Material</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Usuario</th>
                  </tr>
                </thead>
                <tbody id="movimientos-body"></tbody>
              </table>
            </div>

            <!-- Reportes Tab -->
            <div id="tab-reportes" class="tab-content" style="display: none">
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 20px">Reportes y Análisis</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px" id="reportes-grid"></div>
            </div>
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
      </div>
    `;

    container.innerHTML = html;
    renderTable('todos');
    renderAlertas();
    renderTecnicos();
    renderOrdenes();
    renderClientes();
    renderEmpleados();
    renderFibra();
    renderMovimientos();
    renderReportes();
    attachEventListeners();
  };

  const switchTab = (tabName, btn) => {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.style.display = 'none';
    });

    // Show selected tab
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) {
      selectedTab.style.display = 'block';
    }

    // Update active button
    document.querySelectorAll('.tabs .tab-btn').forEach(b => {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    currentTab = tabName;
  };

  const renderTecnicos = () => {
    const tecnicos = [
      { id: 'R', nombre: 'Rodriguez J.', telefono: '+54 9 387 123-4567', estado: 'ACTIVO', equipos: 3 },
      { id: 'G', nombre: 'González M.', telefono: '+54 9 387 234-5678', estado: 'ACTIVO', equipos: 2 },
      { id: 'L', nombre: 'López R.', telefono: '+54 9 387 345-6789', estado: 'ACTIVO', equipos: 4 },
      { id: 'M', nombre: 'Martínez A.', telefono: '+54 9 387 456-7890', estado: 'INACTIVO', equipos: 2 }
    ];

    const grid = document.getElementById('tecnicos-grid');
    if (grid) {
      grid.innerHTML = tecnicos.map(t => `
        <div class="glass" style="padding: 16px; border-radius: 12px">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--cyan-dim); display: flex; align-items: center; justify-content: center; font-weight: bold">${t.id}</div>
            <div>
              <p style="font-weight: 600; margin-bottom: 2px">${t.nombre}</p>
              <p style="font-size: 12px; color: var(--text-muted)">${t.telefono}</p>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span class="badge ${t.estado === 'ACTIVO' ? 'badge-emerald' : 'badge-red'}" style="font-size: 10px">${t.estado}</span>
            <span style="font-size: 12px; color: var(--text-muted)">${t.equipos} equipos</span>
          </div>
        </div>
      `).join('');
    }
  };

  const renderOrdenes = () => {
    const ordenes = [
      { numero: 'ORD-2024-001', cliente: 'Cliente A', estado: 'EN PROGRESO', fecha: '2024-01-15', tecnico: 'Rodriguez J.' },
      { numero: 'ORD-2024-002', cliente: 'Cliente B', estado: 'COMPLETADA', fecha: '2024-01-14', tecnico: 'González M.' }
    ];

    const tbody = document.getElementById('ordenes-body');
    if (tbody) {
      tbody.innerHTML = ordenes.map(o => `
        <tr>
          <td><span class="font-mono" style="font-size: 12px; color: var(--cyan)">${o.numero}</span></td>
          <td>${o.cliente}</td>
          <td><span class="badge ${o.estado === 'COMPLETADA' ? 'badge-emerald' : 'badge-amber'}" style="font-size: 10px">${o.estado}</span></td>
          <td><span class="font-mono" style="font-size: 12px; color: var(--text-muted)">${o.fecha}</span></td>
          <td>${o.tecnico}</td>
        </tr>
      `).join('');
    }
  };

  const renderClientes = () => {
    const clientes = [
      { nombre: 'Cliente A', telefono: '123-4567', email: 'clientea@mail.com', direccion: 'Dirección 1', ordenes: 3 },
      { nombre: 'Cliente B', telefono: '234-5678', email: 'clienteb@mail.com', direccion: 'Dirección 2', ordenes: 2 }
    ];

    const tbody = document.getElementById('clientes-body');
    if (tbody) {
      tbody.innerHTML = clientes.map(c => `
        <tr>
          <td style="font-weight: 500">${c.nombre}</td>
          <td><span class="font-mono" style="font-size: 12px">${c.telefono}</span></td>
          <td>${c.email}</td>
          <td style="font-size: 12px; color: var(--text-muted)">${c.direccion}</td>
          <td><span style="background: var(--cyan-dim); padding: 4px 8px; border-radius: 4px; font-size: 12px">${c.ordenes}</span></td>
        </tr>
      `).join('');
    }
  };

  const renderEmpleados = () => {
    const empleados = [
      { nombre: 'Juan Pérez', cargo: 'Técnico', depto: 'Operaciones', email: 'juan@mail.com', estado: 'ACTIVO' },
      { nombre: 'María García', cargo: 'Admin', depto: 'TI', email: 'maria@mail.com', estado: 'ACTIVO' }
    ];

    const tbody = document.getElementById('empleados-body');
    if (tbody) {
      tbody.innerHTML = empleados.map(e => `
        <tr>
          <td style="font-weight: 500">${e.nombre}</td>
          <td>${e.cargo}</td>
          <td>${e.depto}</td>
          <td>${e.email}</td>
          <td><span class="badge badge-emerald" style="font-size: 10px">${e.estado}</span></td>
        </tr>
      `).join('');
    }
  };

  const renderFibra = () => {
    const fibra = [
      { id: 'FO-001', cliente: 'Cliente A', tipo: 'FTTH', velocidad: '100 Mbps', estado: 'ACTIVO' },
      { id: 'FO-002', cliente: 'Cliente B', tipo: 'FTTH', velocidad: '300 Mbps', estado: 'ACTIVO' }
    ];

    const tbody = document.getElementById('fibra-body');
    if (tbody) {
      tbody.innerHTML = fibra.map(f => `
        <tr>
          <td><span class="font-mono" style="font-size: 12px; color: var(--cyan)">${f.id}</span></td>
          <td>${f.cliente}</td>
          <td><span class="badge badge-cyan" style="font-size: 10px">${f.tipo}</span></td>
          <td><strong>${f.velocidad}</strong></td>
          <td><span class="badge badge-emerald" style="font-size: 10px">${f.estado}</span></td>
        </tr>
      `).join('');
    }
  };

  const renderMovimientos = () => {
    const movimientos = [
      { fecha: '2024-01-15', material: 'ONU HG8310', tipo: 'ENTRADA', cantidad: 10, usuario: 'Admin' },
      { fecha: '2024-01-14', material: 'Modem GPON', tipo: 'SALIDA', cantidad: 5, usuario: 'Rodriguez J.' }
    ];

    const tbody = document.getElementById('movimientos-body');
    if (tbody) {
      tbody.innerHTML = movimientos.map(m => `
        <tr>
          <td><span class="font-mono" style="font-size: 12px; color: var(--text-muted)">${m.fecha}</span></td>
          <td style="font-weight: 500">${m.material}</td>
          <td><span class="badge ${m.tipo === 'ENTRADA' ? 'badge-emerald' : 'badge-red'}" style="font-size: 10px">${m.tipo}</span></td>
          <td><strong>${m.cantidad}</strong></td>
          <td>${m.usuario}</td>
        </tr>
      `).join('');
    }
  };

  const renderReportes = () => {
    const reportes = [
      { titulo: '📊 Stock por Categoría', valor: '12 categorías activas' },
      { titulo: '📈 Movimientos Hoy', valor: '15 transacciones' },
      { titulo: '⚠️ Alertas Pendientes', valor: '5 críticas' },
      { titulo: '✅ Órdenes Completadas', valor: '42 este mes' }
    ];

    const grid = document.getElementById('reportes-grid');
    if (grid) {
      grid.innerHTML = reportes.map(r => `
        <div class="glass" style="padding: 16px; border-radius: 12px">
          <p style="font-size: 14px; margin-bottom: 8px">${r.titulo}</p>
          <p style="font-size: 18px; font-weight: 700; color: var(--cyan)">${r.valor}</p>
        </div>
      `).join('');
    }
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
    document.querySelectorAll('#main-table ~ .tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTable(filter);
  };

  const attachEventListeners = () => {
    // Event listeners if needed
  };

  return {
    render,
    filterTable,
    switchTab,
  };
})();
