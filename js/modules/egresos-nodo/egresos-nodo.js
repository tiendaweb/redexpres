/**
 * Egresos Nodo Module - Motor 2
 * Gestión de egresos hacia nodos/obras con calculadora de fibra
 */

const EgresosNodoModule = (() => {
  let itemsActuales = [];
  let fibraActual = null;
  let nodoSeleccionado = null;

  const render = (container) => {
    const html = `
      <div style="padding: 24px">
        <div class="bento">
          <!-- Columna izquierda: Formulario -->
          <div class="col-8 fade-up delay-2" style="padding: 24px">
            <!-- Cabecera -->
            <div class="glass" style="padding: 20px; margin-bottom: 20px">
              <h2 class="font-display" style="font-size: 16px; font-weight: 700; margin-bottom: 16px">Información del Egreso</h2>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px">
                <div>
                  <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Nodo/Obra</label>
                  <select id="nodo-select" onchange="EgresosNodoModule.onNodoChange(this)" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
                    <option value="">-- Seleccionar Nodo --</option>
                    ${MockData.nodosData.map(n => `<option value="${n.id}">${n.nombre} (${n.responsable})</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Responsable/Técnico</label>
                  <select id="tecnico-select" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
                    <option value="">-- Seleccionar Técnico --</option>
                    ${MockData.tecnicosData.filter(t => t.estado === 'activo').map(t => `<option value="${t.nombre}">${t.nombre}</option>`).join('')}
                  </select>
                </div>
                <div style="grid-column: span 2">
                  <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; font-weight: 600">Fecha</label>
                  <input type="date" id="fecha-egreso" style="width: 100%; padding: 10px; border: 1px solid var(--border-primary); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary)">
                </div>
              </div>
            </div>

            <!-- Materiales -->
            <div class="glass" style="padding: 20px; margin-bottom: 20px">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px">
                <h3 class="font-display" style="font-size: 14px; font-weight: 700">Materiales a Egresar</h3>
                <button onclick="EgresosNodoModule.agregarMaterial()" class="btn btn-primary" style="font-size: 11px; padding: 6px 12px">+ Agregar</button>
              </div>

              <div style="overflow-x: auto">
                <table class="data-table" id="materiales-table" style="width: 100%; font-size: 12px">
                  <thead>
                    <tr>
                      <th style="width: 20%">Código</th>
                      <th style="width: 35%">Descripción</th>
                      <th style="width: 15%">Cantidad</th>
                      <th style="width: 20%">Acción</th>
                    </tr>
                  </thead>
                  <tbody id="materiales-tbody">
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Calculadora de Fibra -->
            <div class="glass" style="padding: 20px">
              <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 12px">
                <input type="checkbox" id="fibra-toggle" onchange="EgresosNodoModule.toggleFibra(this)" style="margin-right: 8px"> Agregar Fibra Óptica
              </h3>

              <div id="fibra-section" style="display: none">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px">
                  <div>
                    <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 4px">Tipo de Fibra</label>
                    <select id="tipo-fibra" style="width: 100%; padding: 8px; border: 1px solid var(--border-primary); border-radius: 6px; background: var(--bg-secondary); color: var(--text-primary); font-size: 12px">
                      <option value="">-- Seleccionar --</option>
                      <option value="F.O. 12 hilos">F.O. 12 hilos</option>
                      <option value="F.O. 24 hilos">F.O. 24 hilos</option>
                    </select>
                  </div>
                  <div></div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px">
                  <div>
                    <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 4px">Secuencial Desde (m)</label>
                    <input type="number" id="fibra-desde" placeholder="2085" style="width: 100%; padding: 8px; border: 1px solid var(--border-primary); border-radius: 6px; background: var(--bg-secondary); color: var(--text-primary); font-size: 12px">
                  </div>
                  <div>
                    <label style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 4px">Secuencial Hasta (m)</label>
                    <input type="number" id="fibra-hasta" placeholder="1835" style="width: 100%; padding: 8px; border: 1px solid var(--border-primary); border-radius: 6px; background: var(--bg-secondary); color: var(--text-primary); font-size: 12px">
                  </div>
                </div>

                <div style="padding: 12px; background: var(--bg-secondary); border-radius: 6px; margin-bottom: 12px">
                  <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px">Metros Consumidos:</p>
                  <p id="fibra-resultado" style="font-size: 20px; font-weight: 700; color: var(--cyan)">0 m</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px">
                  <button onclick="EgresosNodoModule.calcularFibra()" class="btn btn-primary" style="font-size: 11px; padding: 8px 12px">📊 Calcular</button>
                  <button onclick="EgresosNodoModule.agregarFibra()" class="btn btn-secondary" style="font-size: 11px; padding: 8px 12px">✓ Agregar a Egreso</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna derecha: Previsualización -->
          <div class="col-4 fade-up delay-3" style="display: flex; flex-direction: column; gap: 16px">
            <div class="glass" style="padding: 20px">
              <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 12px">Resumen del Egreso</h3>
              <div id="preview-section" style="font-size: 12px; line-height: 1.6">
                <p style="color: var(--text-muted)">Selecciona un nodo para ver el resumen</p>
              </div>
            </div>

            <!-- Alertas de stock -->
            <div class="glass" style="padding: 20px">
              <h3 class="font-display" style="font-size: 14px; font-weight: 700; margin-bottom: 12px">⚠️ Alertas</h3>
              <div id="alertas-section" style="font-size: 11px; color: var(--text-muted)">
                <p>No hay alertas</p>
              </div>
            </div>

            <!-- Botones de acción -->
            <button onclick="EgresosNodoModule.limpiarFormulario()" class="btn btn-secondary" style="width: 100%; padding: 12px; font-size: 12px">Cancelar</button>
            <button onclick="EgresosNodoModule.confirmarEgreso()" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 12px; background: var(--emerald)">✓ Confirmar Egreso</button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    inicializarFecha();
    agregarMaterial();
    attachEventListeners();
  };

  const inicializarFecha = () => {
    const input = document.getElementById('fecha-egreso');
    const hoy = new Date().toISOString().split('T')[0];
    input.value = hoy;
  };

  const onNodoChange = (select) => {
    nodoSeleccionado = select.value;
    actualizarPreview();
  };

  const agregarMaterial = () => {
    const tbody = document.getElementById('materiales-tbody');
    const rowId = `mat-${Date.now()}`;
    const html = `
      <tr id="${rowId}">
        <td><input type="text" class="codigo-input" placeholder="120204" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" onkeyup="EgresosNodoModule.onCodigoInput(this)"></td>
        <td><input type="text" class="descripcion-input" placeholder="Auto-completar" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" readonly></td>
        <td><input type="number" class="cantidad-input" min="1" placeholder="0" style="width: 100%; padding: 6px; border: 1px solid var(--border-secondary); border-radius: 4px; background: var(--bg-input); color: var(--text-primary)" onchange="EgresosNodoModule.actualizarPreview()"></td>
        <td><button onclick="EgresosNodoModule.eliminarMaterial('${rowId}')" class="btn btn-secondary" style="font-size: 10px; padding: 4px 8px">🗑 Eliminar</button></td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', html);
  };

  const onCodigoInput = (input) => {
    const codigo = input.value.trim();
    const row = input.closest('tr');
    const descInput = row.querySelector('.descripcion-input');

    if (codigo.length >= 2) {
      const articulo = MockData.catalogoArticulos.find(a => a.codigo.toLowerCase().includes(codigo.toLowerCase()));
      if (articulo) {
        descInput.value = articulo.descripcion;
      }
    }
    actualizarPreview();
  };

  const eliminarMaterial = (rowId) => {
    document.getElementById(rowId)?.remove();
    actualizarPreview();
  };

  const toggleFibra = (checkbox) => {
    const fibra_section = document.getElementById('fibra-section');
    fibra_section.style.display = checkbox.checked ? 'block' : 'none';
  };

  const calcularFibra = () => {
    const desde = parseInt(document.getElementById('fibra-desde').value) || 0;
    const hasta = parseInt(document.getElementById('fibra-hasta').value) || 0;
    const consumo = Math.abs(desde - hasta);

    document.getElementById('fibra-resultado').textContent = `${consumo} m`;
    fibraActual = {
      tipo: document.getElementById('tipo-fibra').value,
      desde,
      hasta,
      consumido: consumo
    };
  };

  const agregarFibra = () => {
    if (!fibraActual || !fibraActual.tipo) {
      NotificationService.error('Completa el cálculo de fibra primero');
      return;
    }
    NotificationService.info(`Fibra agregada: ${fibraActual.tipo} - ${fibraActual.consumido}m`);
    actualizarPreview();
  };

  const actualizarPreview = () => {
    const nodo_id = document.getElementById('nodo-select').value;
    const tecnico = document.getElementById('tecnico-select').value;
    const preview = document.getElementById('preview-section');
    const alertas_div = document.getElementById('alertas-section');

    if (!nodo_id) {
      preview.innerHTML = '<p style="color: var(--text-muted)">Selecciona un nodo</p>';
      return;
    }

    const nodo = MockData.nodosData.find(n => n.id === nodo_id);
    let previewHTML = `
      <p style="color: var(--cyan); font-weight: 600">${nodo?.nombre || 'Nodo'}</p>
      <p style="color: var(--text-muted)">Responsable: ${nodo?.responsable || '-'}</p>
      <hr style="border: none; border-top: 1px solid var(--border-primary); margin: 8px 0">
    `;

    // Listar materiales
    let materialesHTML = '<p style="font-weight: 600; margin: 8px 0">Materiales a egresar:</p>';
    const tbody = document.getElementById('materiales-tbody');
    let hayMateriales = false;

    tbody.querySelectorAll('tr').forEach(row => {
      const codigo = row.querySelector('.codigo-input').value;
      const cantidad = parseInt(row.querySelector('.cantidad-input').value) || 0;
      const desc = row.querySelector('.descripcion-input').value;

      if (codigo && cantidad > 0) {
        hayMateriales = true;
        const stock = MockData.stockData.find(s => s.codigo === codigo);
        const stockActual = stock?.stock || 0;
        const alerta = cantidad > stockActual ? ' 🔴' : '';
        materialesHTML += `<p style="margin: 4px 0">• ${cantidad}x ${desc}${alerta}</p>`;
      }
    });

    if (!hayMateriales) {
      materialesHTML += '<p style="color: var(--text-muted)">Sin materiales</p>';
    }

    previewHTML += materialesHTML;

    // Fibra
    if (fibraActual) {
      previewHTML += `
        <hr style="border: none; border-top: 1px solid var(--border-primary); margin: 8px 0">
        <p style="font-weight: 600; margin: 8px 0">Fibra Óptica:</p>
        <p style="margin: 4px 0">• ${fibraActual.tipo}: ${fibraActual.consumido}m</p>
      `;
    }

    preview.innerHTML = previewHTML;

    // Verificar alertas de stock
    let alertasHTML = '';
    tbody.querySelectorAll('tr').forEach(row => {
      const codigo = row.querySelector('.codigo-input').value;
      const cantidad = parseInt(row.querySelector('.cantidad-input').value) || 0;
      if (codigo && cantidad > 0) {
        const stock = MockData.stockData.find(s => s.codigo === codigo);
        if (stock && cantidad > stock.stock) {
          alertasHTML += `<p style="color: var(--red); margin: 4px 0">⚠️ ${stock.material}: Stock insuficiente (hay ${stock.stock}, quieres ${cantidad})</p>`;
        }
      }
    });

    alertas_div.innerHTML = alertasHTML || '<p style="color: var(--emerald)">✓ Stock disponible</p>';
  };

  const limpiarFormulario = () => {
    document.getElementById('nodo-select').value = '';
    document.getElementById('tecnico-select').value = '';
    document.getElementById('tipo-fibra').value = '';
    document.getElementById('fibra-desde').value = '';
    document.getElementById('fibra-hasta').value = '';
    document.getElementById('fibra-toggle').checked = false;
    document.getElementById('fibra-section').style.display = 'none';
    document.getElementById('materiales-tbody').innerHTML = '';
    agregarMaterial();
    fibraActual = null;
    nodoSeleccionado = null;
    actualizarPreview();
    inicializarFecha();
  };

  const confirmarEgreso = () => {
    const nodo_id = document.getElementById('nodo-select').value;
    const tecnico = document.getElementById('tecnico-select').value;
    const fecha = document.getElementById('fecha-egreso').value;

    if (!nodo_id || !tecnico || !fecha) {
      NotificationService.error('Completa los datos de cabecera');
      return;
    }

    // Recolectar materiales
    const materiales = [];
    document.querySelectorAll('#materiales-tbody tr').forEach(row => {
      const codigo = row.querySelector('.codigo-input').value.trim();
      const descripcion = row.querySelector('.descripcion-input').value.trim();
      const cantidad = parseInt(row.querySelector('.cantidad-input').value) || 0;

      if (codigo && cantidad > 0) {
        materiales.push({ codigo, descripcion, cantidad });
      }
    });

    if (materiales.length === 0 && !fibraActual) {
      NotificationService.error('Debes agregar al menos un material o fibra');
      return;
    }

    procesarEgreso(nodo_id, tecnico, fecha, materiales, fibraActual);
  };

  const procesarEgreso = (nodo_id, tecnico, fecha, materiales, fibra) => {
    try {
      // Verificar stock
      for (let item of materiales) {
        const stock = MockData.stockData.find(s => s.codigo === item.codigo);
        if (!stock || item.cantidad > stock.stock) {
          throw new Error(`Stock insuficiente para ${item.descripcion}`);
        }
      }

      // Actualizar stock
      materiales.forEach(item => {
        const stock = MockData.stockData.find(s => s.codigo === item.codigo);
        if (stock) {
          stock.stock -= item.cantidad;
        }
      });

      // Actualizar fibra
      if (fibra) {
        const bobina = MockData.bobinasData.find(b => b.tipo === fibra.tipo && b.estado === 'Activa');
        if (bobina) {
          bobina.consumido += fibra.consumido;
          bobina.disponible -= fibra.consumido;
          bobina.porcentaje = Math.round((bobina.consumido / bobina.metros) * 100);
        }
      }

      // Crear registro
      const nodo = MockData.nodosData.find(n => n.id === nodo_id);
      const nuevoEgreso = {
        id: `EGR-${Date.now()}`,
        nodo_id,
        nodo_nombre: nodo?.nombre || 'Nodo',
        responsable: tecnico,
        fecha,
        materiales,
        fibra: fibra || null,
        confirmado: true
      };
      MockData.egresosNodoData.push(nuevoEgreso);

      // Agregar a movimientos
      const detalleItems = materiales.map(m => `${m.cantidad}u ${m.descripcion}`).join(' · ');
      MockData.movimientos.unshift({
        tipo: '-',
        desc: `Egreso ${nodo?.nombre}`,
        detalle: detalleItems + (fibra ? ` · ${fibra.consumido}m ${fibra.tipo}` : ''),
        cuando: 'ahora',
        badge: 'certif'
      });

      StateManager.addAuditLog('egreso_nodo', { nodo_id, materiales: materiales.length, fibra: !!fibra });

      NotificationService.success(`Egreso confirmado para ${nodo?.nombre}`);

      limpiarFormulario();
    } catch (e) {
      NotificationService.error('Error: ' + e.message);
    }
  };

  const attachEventListeners = () => {
    // Event listeners
  };

  return {
    render,
    onNodoChange,
    agregarMaterial,
    onCodigoInput,
    eliminarMaterial,
    toggleFibra,
    calcularFibra,
    agregarFibra,
    actualizarPreview,
    limpiarFormulario,
    confirmarEgreso,
  };
})();
