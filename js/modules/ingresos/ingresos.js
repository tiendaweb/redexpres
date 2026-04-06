/**
 * Ingresos Module - Motor 1
 * Gestión de ingresos de materiales diferenciando entre:
 * - Construcción de Nodo (cyan)
 * - Instalaciones (emerald)
 */

const IngresosModule = (() => {
  let currentType = 'Construccion_Nodo';
  let itemsActuales = [];

  const render = (container) => {
    const html = `
      <div style="padding: 24px">
        <!-- Selector de tipo -->
        <div class="glass fade-up delay-2" style="padding: 20px; margin-bottom: 24px">
          <h2 class="font-display" style="font-size: 18px; font-weight: 700; margin-bottom: 16px">Tipo de Ingreso</h2>
          <div style="display: flex; gap: 12px; flex-wrap: wrap">
            <button class="tab-btn active" onclick="IngresosModule.switchType('Construccion_Nodo', this)" style="padding: 10px 20px; border-left: 3px solid var(--cyan)">
              🔵 Construcción de Nodo
            </button>
            <button class="tab-btn" onclick="IngresosModule.switchType('Instalacion', this)" style="padding: 10px 20px; border-left: 3px solid var(--emerald)">
              🟢 Instalaciones
            </button>
          </div>
        </div>

        <!-- Formulario de cabecera -->
        <div class="glass fade-up delay-2" style="padding: 24px; margin-bottom: 24px">
          <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Información del Remito</h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px">
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">N° Remito</label>
              <input type="text" id="numero_remito" placeholder="Ej: 1850723" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary); font-family: 'Space Mono'">
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Fecha</label>
              <input type="date" id="fecha_ingreso" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Proveedor/Origen</label>
              <input type="text" id="origen" placeholder="Express Salta" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
            <div>
              <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Destino</label>
              <input type="text" id="destino" placeholder="Depósito Central" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
            </div>
          </div>
        </div>

        <!-- Tabla de ítems -->
        <div class="glass fade-up delay-3" style="padding: 24px">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px">
            <h2 class="font-display" style="font-size: 16px; font-weight: 700">Materiales</h2>
            <button onclick="IngresosModule.agregarFila()" class="btn btn-primary" style="font-size: 12px; padding: 8px 16px">+ Agregar ítem</button>
          </div>

          <div style="overflow-x: auto">
            <table class="data-table" id="items-table" style="width: 100%">
              <thead>
                <tr>
                  <th style="width: 15%">Código</th>
                  <th style="width: 35%">Descripción</th>
                  <th style="width: 15%">Cantidad</th>
                  <th style="width: 15%">Unidad</th>
                  <th style="width: 20%">Acción</th>
                </tr>
              </thead>
              <tbody id="items-tbody">
              </tbody>
            </table>
          </div>

          <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: flex-end">
            <button onclick="IngresosModule.limpiarFormulario()" class="btn btn-secondary" style="font-size: 12px; padding: 10px 20px">Cancelar</button>
            <button onclick="IngresosModule.confirmarIngreso()" class="btn btn-primary" style="font-size: 12px; padding: 10px 20px">✓ Confirmar Ingreso</button>
          </div>
        </div>

        <!-- Previsualización -->
        <div id="preview-container" style="display: none; margin-top: 24px">
          <div class="glass fade-up delay-3" style="padding: 24px">
            <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Resumen del Ingreso</h2>
            <div id="preview-content"></div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    itemsActuales = [];
    inicializarFecha();
    agregarFila();
    attachEventListeners();
  };

  const inicializarFecha = () => {
    const input = document.getElementById('fecha_ingreso');
    const hoy = new Date().toISOString().split('T')[0];
    input.value = hoy;
  };

  const agregarFila = () => {
    const tbody = document.getElementById('items-tbody');
    const rowId = `row-${Date.now()}`;
    const html = `
      <tr id="${rowId}" style="border-bottom: 1px solid var(--border-primary)">
        <td><input type="text" class="codigo-input" placeholder="297031" style="width: 100%; padding: 8px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" onkeyup="IngresosModule.onCodigoInput(this)"></td>
        <td><input type="text" class="descripcion-input" placeholder="Auto-completar" style="width: 100%; padding: 8px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" readonly></td>
        <td><input type="number" class="cantidad-input" min="1" placeholder="0" style="width: 100%; padding: 8px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)"></td>
        <td><input type="text" class="unidad-input" placeholder="u" style="width: 100%; padding: 8px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" readonly></td>
        <td><button onclick="IngresosModule.eliminarFila('${rowId}')" class="btn btn-secondary" style="font-size: 11px; padding: 6px 12px">🗑 Eliminar</button></td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', html);
  };

  const onCodigoInput = (input) => {
    const codigo = input.value.trim();
    const row = input.closest('tr');
    const descInput = row.querySelector('.descripcion-input');
    const unidadInput = row.querySelector('.unidad-input');

    if (codigo.length >= 2) {
      const articulo = MockData.catalogoArticulos.find(a => a.codigo.toLowerCase().includes(codigo.toLowerCase()) || a.descripcion.toLowerCase().includes(codigo.toLowerCase()));
      if (articulo) {
        descInput.value = articulo.descripcion;
        unidadInput.value = articulo.unidad;
      }
    }
  };

  const eliminarFila = (rowId) => {
    const row = document.getElementById(rowId);
    if (row) {
      row.remove();
    }
  };

  const limpiarFormulario = () => {
    document.getElementById('numero_remito').value = '';
    document.getElementById('origen').value = '';
    document.getElementById('destino').value = '';
    const tbody = document.getElementById('items-tbody');
    tbody.innerHTML = '';
    agregarFila();
    inicializarFecha();
  };

  const switchType = (tipo, btn) => {
    currentType = tipo;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  };

  const confirmarIngreso = () => {
    const nroRemito = document.getElementById('numero_remito').value.trim();
    const fecha = document.getElementById('fecha_ingreso').value;
    const origen = document.getElementById('origen').value.trim();
    const destino = document.getElementById('destino').value.trim();

    if (!nroRemito || !fecha || !origen || !destino) {
      NotificationService.error('Por favor completa todos los campos de cabecera');
      return;
    }

    // Recolectar items
    const items = [];
    document.querySelectorAll('#items-tbody tr').forEach(row => {
      const codigo = row.querySelector('.codigo-input').value.trim();
      const descripcion = row.querySelector('.descripcion-input').value.trim();
      const cantidad = parseInt(row.querySelector('.cantidad-input').value) || 0;
      const unidad = row.querySelector('.unidad-input').value.trim();

      if (codigo && cantidad > 0) {
        items.push({ codigo, descripcion, cantidad, unidad });
      }
    });

    if (items.length === 0) {
      NotificationService.error('Debe agregar al menos un ítem');
      return;
    }

    // Procesar ingreso
    procesarIngreso(nroRemito, fecha, origen, destino, items);
  };

  const procesarIngreso = (nroRemito, fecha, origen, destino, items) => {
    try {
      // Actualizar stock
      items.forEach(item => {
        const stock = MockData.stockData.find(s => s.codigo === item.codigo);
        if (stock) {
          stock.stock += item.cantidad;
        }
      });

      // Crear registro en ingresosData
      const nuevoIngreso = {
        id: `ING-${Date.now()}`,
        numero_remito: nroRemito,
        fecha: fecha,
        tipo: currentType,
        origen: origen,
        destino: destino,
        items: items,
        confirmado: true
      };
      MockData.ingresosData.push(nuevoIngreso);

      // Agregar a movimientos
      const detalleItems = items.map(i => `${i.cantidad}${i.unidad} ${i.descripcion}`).join(' · ');
      MockData.movimientos.unshift({
        tipo: '+',
        desc: `Remito Ingreso #${nroRemito}`,
        detalle: detalleItems,
        cuando: 'ahora',
        badge: 'ingreso'
      });

      // Actualizar estado
      StateManager.set('ingresos.lastProcessed', nuevoIngreso);
      StateManager.addAuditLog('ingreso_confirmado', { nroRemito, tipo: currentType, items: items.length });

      // Notificar éxito
      NotificationService.success(`Ingreso #${nroRemito} procesado correctamente`);

      // Limpiar
      limpiarFormulario();
    } catch (e) {
      NotificationService.error('Error al procesar el ingreso: ' + e.message);
    }
  };

  const attachEventListeners = () => {
    // Event listeners if needed
  };

  return {
    render,
    switchType,
    agregarFila,
    onCodigoInput,
    eliminarFila,
    limpiarFormulario,
    confirmarIngreso,
  };
})();
