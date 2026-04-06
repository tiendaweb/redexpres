/**
 * Instalaciones Module - Motor 3
 * Gestión de instalaciones domiciliarias con carga manual e importación CSV
 */

const InstalacionesModule = (() => {
  let modoActual = 'manual';
  let itemsActuales = [];

  const render = (container) => {
    const html = `
      <div style="padding: 24px">
        <!-- Selector de modo -->
        <div class="glass fade-up delay-2" style="padding: 20px; margin-bottom: 24px">
          <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Modo de Carga</h2>
          <div class="tabs" style="margin-bottom: 0">
            <button class="tab-btn active" onclick="InstalacionesModule.switchModo('manual', this)">✍️ Carga Manual</button>
            <button class="tab-btn" onclick="InstalacionesModule.switchModo('csv', this)">📊 Importar CSV</button>
          </div>
        </div>

        <!-- MODO MANUAL -->
        <div id="modo-manual" class="glass fade-up delay-2" style="padding: 24px">
          <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Nueva Orden de Instalación</h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px">
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">N° Orden</label>
              <input type="text" id="numero-orden" placeholder="4095037" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Tipo de Orden</label>
              <select id="tipo-orden" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
                <option value="INSTALACION">INSTALACION</option>
                <option value="CAMBIO">CAMBIO</option>
                <option value="REPARACION">REPARACION</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Técnico</label>
              <select id="tecnico-manual" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
                <option value="">-- Seleccionar --</option>
                ${MockData.tecnicosData.filter(t => t.estado === 'activo').map(t => `<option value="${t.nombre}">${t.nombre}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Cliente</label>
              <input type="text" id="cliente-manual" placeholder="BENJAMIN QUIR" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
            <div style="grid-column: span 2">
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Fecha</label>
              <input type="date" id="fecha-inst-manual" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
          </div>

          <!-- Tabla de ítems -->
          <div style="margin-top: 20px">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px">
              <h3 class="font-display" style="font-size: 14px; font-weight: 700">Artículos a Instalar</h3>
              <button onclick="InstalacionesModule.agregarArticuloManual()" class="btn btn-primary" style="font-size: 11px; padding: 6px 12px">+ Agregar</button>
            </div>

            <div style="overflow-x: auto">
              <table class="data-table" id="tabla-articulos-manual" style="width: 100%; font-size: 12px">
                <thead>
                  <tr>
                    <th style="width: 18%">Código</th>
                    <th style="width: 30%">Descripción</th>
                    <th style="width: 15%">Cantidad</th>
                    <th style="width: 22%">N° Serie</th>
                    <th style="width: 15%">Acción</th>
                  </tr>
                </thead>
                <tbody id="tbody-articulos-manual">
                </tbody>
              </table>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px">
            <button onclick="InstalacionesModule.limpiarManual()" class="btn btn-secondary" style="padding: 10px 20px; font-size: 12px">Cancelar</button>
            <button onclick="InstalacionesModule.confirmarManual()" class="btn btn-primary" style="padding: 10px 20px; font-size: 12px">✓ Procesar Instalación</button>
          </div>
        </div>

        <!-- MODO CSV -->
        <div id="modo-csv" style="display: none" class="glass fade-up delay-2" style="padding: 24px">
          <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Importar CSV de Instalaciones</h2>

          <div class="glass" style="padding: 20px; border: 2px dashed var(--border-primary); border-radius: 8px; text-align: center; cursor: pointer" onclick="document.getElementById('csv-input').click()">
            <p style="font-size: 14px; color: var(--cyan); margin-bottom: 8px">📁 Arrastra un archivo CSV o haz clic aquí</p>
            <p style="font-size: 11px; color: var(--text-muted)">Formato esperado: Orden, Tipo, Técnico, Cliente, Producto, Artículos (código, nombre, serie, cantidad)</p>
            <input type="file" id="csv-input" accept=".csv" style="display: none" onchange="InstalacionesModule.onCSVUpload(event)">
          </div>

          <div id="csv-preview" style="display: none; margin-top: 20px">
            <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 12px">Previsualización</h3>
            <div style="overflow-x: auto">
              <table class="data-table" id="tabla-preview-csv" style="width: 100%; font-size: 11px">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Tipo</th>
                    <th>Técnico</th>
                    <th>Cliente</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody id="tbody-preview-csv">
                </tbody>
              </table>
            </div>

            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px">
              <button onclick="InstalacionesModule.limpiarCSV()" class="btn btn-secondary" style="padding: 10px 20px; font-size: 12px">Cancelar</button>
              <button onclick="InstalacionesModule.confirmarCSV()" class="btn btn-primary" style="padding: 10px 20px; font-size: 12px">✓ Procesar CSV</button>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    inicializarFechas();
    agregarArticuloManual();
    attachEventListeners();
  };

  const inicializarFechas = () => {
    const hoy = new Date().toISOString().split('T')[0];
    const input1 = document.getElementById('fecha-inst-manual');
    if (input1) input1.value = hoy;
  };

  const switchModo = (modo, btn) => {
    modoActual = modo;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('modo-manual').style.display = modo === 'manual' ? 'block' : 'none';
    document.getElementById('modo-csv').style.display = modo === 'csv' ? 'block' : 'none';
  };

  // ===== MODO MANUAL =====

  const agregarArticuloManual = () => {
    const tbody = document.getElementById('tbody-articulos-manual');
    const rowId = `art-${Date.now()}`;
    const html = `
      <tr id="${rowId}">
        <td><input type="text" class="codigo-input" placeholder="112400" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" onkeyup="InstalacionesModule.onCodigoInputManual(this)"></td>
        <td><input type="text" class="descripcion-input" placeholder="Auto-completar" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" readonly></td>
        <td><input type="number" class="cantidad-input" min="1" placeholder="1" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)"></td>
        <td><input type="text" class="serie-input" placeholder="SN-000-2024" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)"></td>
        <td><button onclick="InstalacionesModule.eliminarArticuloManual('${rowId}')" class="btn btn-secondary" style="font-size: 10px; padding: 4px 8px">🗑</button></td>
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

  const eliminarArticuloManual = (rowId) => {
    document.getElementById(rowId)?.remove();
  };

  const limpiarManual = () => {
    document.getElementById('numero-orden').value = '';
    document.getElementById('tipo-orden').value = 'INSTALACION';
    document.getElementById('tecnico-manual').value = '';
    document.getElementById('cliente-manual').value = '';
    document.getElementById('tbody-articulos-manual').innerHTML = '';
    agregarArticuloManual();
    inicializarFechas();
  };

  const confirmarManual = () => {
    const numero_orden = document.getElementById('numero-orden').value.trim();
    const tipo_orden = document.getElementById('tipo-orden').value;
    const tecnico = document.getElementById('tecnico-manual').value.trim();
    const cliente = document.getElementById('cliente-manual').value.trim();
    const fecha = document.getElementById('fecha-inst-manual').value;

    if (!numero_orden || !tecnico || !cliente || !fecha) {
      NotificationService.error('Completa todos los datos de cabecera');
      return;
    }

    // Recolectar ítems
    const items = [];
    document.querySelectorAll('#tbody-articulos-manual tr').forEach(row => {
      const codigo = row.querySelector('.codigo-input').value.trim();
      const descripcion = row.querySelector('.descripcion-input').value.trim();
      const cantidad = parseInt(row.querySelector('.cantidad-input').value) || 0;
      const serie = row.querySelector('.serie-input').value.trim();

      if (codigo && cantidad > 0) {
        items.push({ codigo, descripcion, cantidad, serie: serie || null });
      }
    });

    if (items.length === 0) {
      NotificationService.error('Agrega al menos un artículo');
      return;
    }

    procesarInstalacion(numero_orden, tipo_orden, tecnico, cliente, fecha, items);
  };

  // ===== MODO CSV =====

  const onCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const registros = parseCSV(csv);
        mostrarPreviewCSV(registros);
      } catch (err) {
        NotificationService.error('Error al procesar CSV: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(l => l.trim());
    const registros = [];
    let ordenActual = null;

    lines.forEach(line => {
      const cols = line.split(',').map(c => c.trim());

      // Si col 0 tiene valor → nueva orden
      if (cols[0] && cols[0] !== 'Orden') {
        ordenActual = {
          numero: cols[0],
          tipo: cols[1] || 'INSTALACION',
          tecnico: cols[2] || '',
          cliente: cols[3] || '',
          fecha: cols[4] || new Date().toISOString().split('T')[0],
          articulos: []
        };
        registros.push(ordenActual);
      }

      // Si hay orden actual y hay artículo → agregar
      if (ordenActual && cols[4] && !isNaN(cols[4])) {
        ordenActual.articulos.push({
          codigo: cols[4],
          descripcion: cols[5] || '',
          cantidad: parseInt(cols[6]) || 1,
          serie: cols[7] || null
        });
      }
    });

    return registros;
  };

  const mostrarPreviewCSV = (registros) => {
    const tbody = document.getElementById('tbody-preview-csv');
    tbody.innerHTML = '';

    registros.forEach(orden => {
      orden.articulos.forEach(art => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${orden.numero}</td>
          <td>${orden.tipo}</td>
          <td>${orden.tecnico}</td>
          <td>${orden.cliente}</td>
          <td>${art.codigo}</td>
          <td>${art.descripcion}</td>
          <td>${art.cantidad}</td>
        `;
        tbody.appendChild(row);
      });
    });

    document.getElementById('csv-preview').style.display = 'block';
    document.getElementById('csv-input').dataset.registros = JSON.stringify(registros);
  };

  const confirmarCSV = () => {
    const registrosJSON = document.getElementById('csv-input').dataset.registros;
    if (!registrosJSON) {
      NotificationService.error('Carga un archivo CSV primero');
      return;
    }

    const registros = JSON.parse(registrosJSON);
    let contador = 0;

    registros.forEach(orden => {
      procesarInstalacion(
        orden.numero,
        orden.tipo,
        orden.tecnico,
        orden.cliente,
        orden.fecha,
        orden.articulos
      );
      contador++;
    });

    NotificationService.success(`${contador} órdenes procesadas`);
    limpiarCSV();
  };

  const limpiarCSV = () => {
    document.getElementById('csv-input').value = '';
    document.getElementById('csv-preview').style.display = 'none';
    document.getElementById('tbody-preview-csv').innerHTML = '';
  };

  // ===== PROCESAMIENTO =====

  const procesarInstalacion = (numero_orden, tipo_orden, tecnico, cliente, fecha, items) => {
    try {
      // Verificar stock
      for (let item of items) {
        const stock = MockData.stockData.find(s => s.codigo === item.codigo);
        if (!stock || item.cantidad > stock.stock) {
          throw new Error(`Stock insuficiente para ${item.descripcion}`);
        }
      }

      // Actualizar stock
      items.forEach(item => {
        const stock = MockData.stockData.find(s => s.codigo === item.codigo);
        if (stock) {
          stock.stock -= item.cantidad;
        }
      });

      // Crear registro
      const nuevoInstacion = {
        id: `INST-${Date.now()}`,
        numero_orden,
        tipo: tipo_orden,
        tecnico,
        cliente,
        fecha,
        items,
        confirmado: true
      };
      MockData.instalacionesData.push(nuevoInstacion);

      // Agregar a movimientos
      const detalleItems = items.map(i => `${i.cantidad}x ${i.descripcion}`).join(' · ');
      MockData.movimientos.unshift({
        tipo: '-',
        desc: `Instalación #${numero_orden}`,
        detalle: detalleItems,
        cuando: 'ahora',
        badge: 'consumo'
      });

      StateManager.addAuditLog('instalacion_confirmada', { numero_orden, items: items.length, tecnico });

      NotificationService.success(`Instalación #${numero_orden} procesada`);

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
    agregarArticuloManual,
    onCodigoInputManual,
    eliminarArticuloManual,
    limpiarManual,
    confirmarManual,
    onCSVUpload,
    limpiarCSV,
    confirmarCSV,
  };
})();
