/**
 * Desconexiones Module - Motor 4
 * Gestión de desconexiones y logística inversa (recuperación de materiales)
 */

const DesconexionesModule = (() => {
  let modoActual = 'manual';
  let materialesRecuperados = [];

  const render = (container) => {
    const html = `
      <div style="padding: 24px">
        <!-- Selector de modo -->
        <div class="glass fade-up delay-2" style="padding: 20px; margin-bottom: 24px">
          <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Modo de Carga</h2>
          <div class="tabs" style="margin-bottom: 0">
            <button class="tab-btn active" onclick="DesconexionesModule.switchModo('manual', this)">✍️ Carga Manual</button>
            <button class="tab-btn" onclick="DesconexionesModule.switchModo('csv', this)">📊 Importar CSV</button>
          </div>
        </div>

        <!-- MODO MANUAL -->
        <div id="modo-manual" class="glass fade-up delay-2" style="padding: 24px">
          <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Nueva Orden de Desconexión</h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px">
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">N° Orden Desconexión</label>
              <input type="text" id="numero-desconexion" placeholder="278478" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Técnico</label>
              <select id="tecnico-desconexion" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
                <option value="">-- Seleccionar --</option>
                ${MockData.tecnicosData.map(t => `<option value="${t.nombre}">${t.nombre}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Cliente</label>
              <input type="text" id="cliente-desconexion" placeholder="EVELYN" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Motivo</label>
              <select id="motivo-desconexion" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
                <option value="BAJA ADMINISTRATIVA">BAJA ADMINISTRATIVA</option>
                <option value="BAJA COSTOS">BAJA COSTOS</option>
                <option value="TECNICA">TECNICA</option>
                <option value="CAMBIO SERVICIO">CAMBIO SERVICIO</option>
              </select>
            </div>
            <div style="grid-column: span 2">
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Fecha de Desconexión</label>
              <input type="date" id="fecha-desconexion" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
          </div>

          <!-- Tabla de materiales a recuperar -->
          <div style="margin-top: 20px">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px">
              <h3 class="font-display" style="font-size: 14px; font-weight: 700">Materiales a Recuperar</h3>
              <button onclick="DesconexionesModule.agregarMaterialManual()" class="btn btn-primary" style="font-size: 11px; padding: 6px 12px">+ Agregar</button>
            </div>

            <div style="overflow-x: auto">
              <table class="data-table" id="tabla-materiales-desconexion" style="width: 100%; font-size: 11px">
                <thead>
                  <tr>
                    <th style="width: 16%">Código</th>
                    <th style="width: 24%">Descripción</th>
                    <th style="width: 12%">Cantidad</th>
                    <th style="width: 18%">N° Serie</th>
                    <th style="width: 20%">Estado</th>
                    <th style="width: 10%">Acción</th>
                  </tr>
                </thead>
                <tbody id="tbody-materiales-desconexion">
                </tbody>
              </table>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px">
            <button onclick="DesconexionesModule.limpiarManual()" class="btn btn-secondary" style="padding: 10px 20px; font-size: 12px">Cancelar</button>
            <button onclick="DesconexionesModule.confirmarManual()" class="btn btn-primary" style="padding: 10px 20px; font-size: 12px; background: var(--emerald)">✓ Procesar Recuperación</button>
          </div>
        </div>

        <!-- MODO CSV -->
        <div id="modo-csv" style="display: none" class="glass fade-up delay-2" style="padding: 24px">
          <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Importar CSV de Desconexiones</h2>

          <div class="glass" style="padding: 20px; border: 2px dashed var(--border-primary); border-radius: 8px; text-align: center; cursor: pointer" onclick="document.getElementById('csv-input-desconexion').click()">
            <p style="font-size: 14px; color: var(--red); margin-bottom: 8px">📁 Arrastra un archivo CSV o haz clic aquí</p>
            <p style="font-size: 11px; color: var(--text-muted)">Formato: Orden, Técnico, Cliente, Motivo, Artículos (código, nombre, serie, cantidad, estado)</p>
            <input type="file" id="csv-input-desconexion" accept=".csv" style="display: none" onchange="DesconexionesModule.onCSVUploadDesconexion(event)">
          </div>

          <div id="csv-preview-desconexion" style="display: none; margin-top: 20px">
            <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 12px">Previsualización de Desconexiones</h3>
            <div style="overflow-x: auto">
              <table class="data-table" id="tabla-preview-desconexion" style="width: 100%; font-size: 11px">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Técnico</th>
                    <th>Cliente</th>
                    <th>Motivo</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody id="tbody-preview-desconexion">
                </tbody>
              </table>
            </div>

            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px">
              <button onclick="DesconexionesModule.limpiarCSVDesconexion()" class="btn btn-secondary" style="padding: 10px 20px; font-size: 12px">Cancelar</button>
              <button onclick="DesconexionesModule.confirmarCSVDesconexion()" class="btn btn-primary" style="padding: 10px 20px; font-size: 12px">✓ Procesar CSV</button>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    inicializarFechas();
    agregarMaterialManual();
    attachEventListeners();
  };

  const inicializarFechas = () => {
    const hoy = new Date().toISOString().split('T')[0];
    const input = document.getElementById('fecha-desconexion');
    if (input) input.value = hoy;
  };

  const switchModo = (modo, btn) => {
    modoActual = modo;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('modo-manual').style.display = modo === 'manual' ? 'block' : 'none';
    document.getElementById('modo-csv').style.display = modo === 'csv' ? 'block' : 'none';
  };

  // ===== MODO MANUAL =====

  const agregarMaterialManual = () => {
    const tbody = document.getElementById('tbody-materiales-desconexion');
    const rowId = `mat-des-${Date.now()}`;
    const html = `
      <tr id="${rowId}">
        <td><input type="text" class="codigo-input" placeholder="410001" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" onkeyup="DesconexionesModule.onCodigoInputManual(this)"></td>
        <td><input type="text" class="descripcion-input" placeholder="Auto-completar" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" readonly></td>
        <td><input type="number" class="cantidad-input" min="1" value="1" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)"></td>
        <td><input type="text" class="serie-input" placeholder="SN-001-2024" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)"></td>
        <td>
          <select class="estado-input" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary); font-size: 11px">
            <option value="reacondicionado">✓ Reacondicionado</option>
            <option value="scrap">🔴 Para Scrap</option>
            <option value="no_recuperado">❌ No Recuperado</option>
          </select>
        </td>
        <td><button onclick="DesconexionesModule.eliminarMaterialManual('${rowId}')" class="btn btn-secondary" style="font-size: 10px; padding: 4px 8px">🗑</button></td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', html);
  };

  const onCodigoInputManual = (input) => {
    const codigo = input.value.trim();
    const row = input.closest('tr');
    const descInput = row.querySelector('.descripcion-input');

    if (codigo.length >= 2) {
      const articulo = MockData.catalogoArticulos.find(a => a.codigo.toLowerCase().includes(codigo.toLowerCase()));
      if (articulo) {
        descInput.value = articulo.descripcion;
      }
    }
  };

  const eliminarMaterialManual = (rowId) => {
    document.getElementById(rowId)?.remove();
  };

  const limpiarManual = () => {
    document.getElementById('numero-desconexion').value = '';
    document.getElementById('tecnico-desconexion').value = '';
    document.getElementById('cliente-desconexion').value = '';
    document.getElementById('motivo-desconexion').value = 'BAJA ADMINISTRATIVA';
    document.getElementById('tbody-materiales-desconexion').innerHTML = '';
    agregarMaterialManual();
    inicializarFechas();
  };

  const confirmarManual = () => {
    const numero = document.getElementById('numero-desconexion').value.trim();
    const tecnico = document.getElementById('tecnico-desconexion').value.trim();
    const cliente = document.getElementById('cliente-desconexion').value.trim();
    const motivo = document.getElementById('motivo-desconexion').value;
    const fecha = document.getElementById('fecha-desconexion').value;

    if (!numero || !tecnico || !cliente || !fecha) {
      NotificationService.error('Completa todos los datos');
      return;
    }

    // Recolectar materiales
    const materiales = [];
    document.querySelectorAll('#tbody-materiales-desconexion tr').forEach(row => {
      const codigo = row.querySelector('.codigo-input').value.trim();
      const descripcion = row.querySelector('.descripcion-input').value.trim();
      const cantidad = parseInt(row.querySelector('.cantidad-input').value) || 0;
      const serie = row.querySelector('.serie-input').value.trim();
      const estado = row.querySelector('.estado-input').value;

      if (codigo && cantidad > 0) {
        materiales.push({ codigo, descripcion, cantidad, serie: serie || null, estado });
      }
    });

    if (materiales.length === 0) {
      NotificationService.error('Agrega al menos un material');
      return;
    }

    procesarDesconexion(numero, tecnico, cliente, motivo, fecha, materiales);
  };

  // ===== MODO CSV =====

  const onCSVUploadDesconexion = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const registros = parseCSVDesconexion(csv);
        mostrarPreviewDesconexion(registros);
      } catch (err) {
        NotificationService.error('Error al procesar CSV: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const parseCSVDesconexion = (csvText) => {
    const lines = csvText.split('\n').filter(l => l.trim());
    const registros = [];
    let desconexionActual = null;

    lines.forEach(line => {
      const cols = line.split(',').map(c => c.trim());

      // Si col 0 tiene valor numérico y col 1 es técnico → nueva desconexión
      if (cols[0] && !isNaN(parseInt(cols[0])) && cols[0] !== 'Orden') {
        desconexionActual = {
          numero: cols[0],
          tecnico: cols[1] || '',
          cliente: cols[2] || '',
          motivo: cols[3] || 'BAJA ADMINISTRATIVA',
          fecha: cols[4] || new Date().toISOString().split('T')[0],
          materiales: []
        };
        registros.push(desconexionActual);
      }

      // Si hay desconexión actual y hay artículo (col 4 es código)
      if (desconexionActual && cols[4] && !isNaN(parseInt(cols[4]))) {
        desconexionActual.materiales.push({
          codigo: cols[4],
          descripcion: cols[5] || '',
          cantidad: parseInt(cols[6]) || 1,
          serie: cols[7] || null,
          estado: cols[8] || 'reacondicionado'
        });
      }
    });

    return registros;
  };

  const mostrarPreviewDesconexion = (registros) => {
    const tbody = document.getElementById('tbody-preview-desconexion');
    tbody.innerHTML = '';

    registros.forEach(des => {
      des.materiales.forEach(mat => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${des.numero}</td>
          <td>${des.tecnico}</td>
          <td>${des.cliente}</td>
          <td>${des.motivo}</td>
          <td>${mat.codigo}</td>
          <td>${mat.descripcion}</td>
          <td>${mat.cantidad}</td>
        `;
        tbody.appendChild(row);
      });
    });

    document.getElementById('csv-preview-desconexion').style.display = 'block';
    document.getElementById('csv-input-desconexion').dataset.registros = JSON.stringify(registros);
  };

  const confirmarCSVDesconexion = () => {
    const registrosJSON = document.getElementById('csv-input-desconexion').dataset.registros;
    if (!registrosJSON) {
      NotificationService.error('Carga un archivo CSV primero');
      return;
    }

    const registros = JSON.parse(registrosJSON);
    let contador = 0;

    registros.forEach(des => {
      procesarDesconexion(
        des.numero,
        des.tecnico,
        des.cliente,
        des.motivo,
        des.fecha,
        des.materiales
      );
      contador++;
    });

    NotificationService.success(`${contador} desconexiones procesadas`);
    limpiarCSVDesconexion();
  };

  const limpiarCSVDesconexion = () => {
    document.getElementById('csv-input-desconexion').value = '';
    document.getElementById('csv-preview-desconexion').style.display = 'none';
    document.getElementById('tbody-preview-desconexion').innerHTML = '';
  };

  // ===== PROCESAMIENTO =====

  const procesarDesconexion = (numero, tecnico, cliente, motivo, fecha, materiales) => {
    try {
      // Procesar cada material según su estado
      materiales.forEach(mat => {
        if (mat.estado === 'reacondicionado') {
          // Sumar al stock
          const stock = MockData.stockData.find(s => s.codigo === mat.codigo);
          if (stock) {
            stock.stock += mat.cantidad;
          }
        } else if (mat.estado === 'no_recuperado') {
          // Crear alerta
          MockData.alertasData.push({
            nivel: 'warn',
            material: `${mat.descripcion} (${mat.codigo}) - NO RECUPERADO`,
            stock: 0,
            min: 1,
            accion: `Equipos pendientes de recuperación en orden ${numero}`
          });
        }
        // Si es 'scrap' no hacemos nada
      });

      // Crear registro
      const nuevoDesconexion = {
        id: `DES-${Date.now()}`,
        numero_orden: numero,
        tipo: 'DESCONEXION',
        tecnico,
        cliente,
        motivo,
        fecha,
        materiales_recuperados: materiales,
        confirmado: true
      };
      MockData.desconexionesData.push(nuevoDesconexion);

      // Agregar a movimientos
      const materialReacondicionados = materiales.filter(m => m.estado === 'reacondicionado');
      const detalle = materialReacondicionados.map(m => `${m.cantidad}x ${m.descripcion}`).join(' · ');
      MockData.movimientos.unshift({
        tipo: '+',
        desc: `Logística Inversa #${numero}`,
        detalle: detalle || 'Sin materiales reacondicionados',
        cuando: 'ahora',
        badge: 'logistica'
      });

      StateManager.addAuditLog('desconexion_confirmada', { numero, materiales: materiales.length, motivo });

      NotificationService.success(`Desconexión #${numero} procesada`);

      if (modoActual === 'manual') {
        limpiarManual();
      }
    } catch (e) {
      NotificationService.error('Error: ' + e.message);
    }
  };

  const attachEventListeners = () => {
    // Event listeners
  };

  return {
    render,
    switchModo,
    agregarMaterialManual,
    onCodigoInputManual,
    eliminarMaterialManual,
    limpiarManual,
    confirmarManual,
    onCSVUploadDesconexion,
    limpiarCSVDesconexion,
    confirmarCSVDesconexion,
  };
})();
