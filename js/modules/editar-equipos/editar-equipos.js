/**
 * Editar Equipos Module
 * CRUD operations for equipment assignments
 */

const EditarEquiposModule = (() => {
  let equipos = [];

  const render = (container) => {
    equipos = JSON.parse(JSON.stringify(MockData.equiposData));

    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px">
            <h2 class="font-display" style="font-size: 20px; font-weight: 800">
              Gestión de <span class="text-cyan">Equipos</span>
            </h2>
            <button class="btn btn-primary" onclick="EditarEquiposModule.showAddForm()" style="padding: 8px 14px; font-size: 12px">+ Agregar Equipo</button>
          </div>
          <p class="text-muted" style="font-size: 13px">Administra los equipos asignados a técnicos</p>
        </div>

        <div class="col-12 glass fade-up delay-2" style="padding: 24px">
          <div id="equipos-table" style="overflow-x: auto">
          </div>
        </div>

        <div id="form-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 1000; align-items: center; justify-content: center; overflow-y: auto;">
          <div class="glass" style="width: 90%; max-width: 500px; padding: 24px; border-radius: 16px; margin: auto">
            <h3 style="margin-bottom: 16px; font-weight: 600">Agregar/Editar Equipo</h3>
            <form id="equipo-form" style="display: grid; gap: 12px">
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Técnico</label>
                <input type="text" id="form-tecnico" placeholder="Nombre del técnico" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Número de Serie</label>
                <input type="text" id="form-serie" placeholder="SN-001-2024" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Modelo</label>
                <input type="text" id="form-modelo" placeholder="ONU HG8310" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Cliente</label>
                <input type="text" id="form-cliente" placeholder="Cliente A" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Orden</label>
                <input type="text" id="form-orden" placeholder="ORD-2024-001" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Estado</label>
                <select id="form-estado" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
                  <option value="activo">Activo</option>
                  <option value="devuelto">Devuelto</option>
                </select>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px">
                <button type="button" onclick="EditarEquiposModule.closeForm()" class="btn btn-secondary" style="padding: 10px">Cancelar</button>
                <button type="submit" class="btn btn-primary" style="padding: 10px">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderTable();
    setupFormHandler();
  };

  const renderTable = () => {
    const html = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead style="background: var(--bg-panel); border-bottom: 2px solid var(--border-glass);">
          <tr>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--text-primary)">Técnico</th>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--text-primary)">Serie</th>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--text-primary)">Modelo</th>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--text-primary)">Cliente</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Estado</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${equipos.map((item, idx) => `
            <tr style="border-bottom: 1px solid var(--border-glass);">
              <td style="padding: 12px; color: var(--text-primary)">${item.tecnico}</td>
              <td style="padding: 12px; color: var(--cyan); font-family: var(--font-mono); font-size: 11px">${item.numeroSerie}</td>
              <td style="padding: 12px; color: var(--text-muted); font-size: 12px">${item.modelo}</td>
              <td style="padding: 12px; color: var(--text-muted); font-size: 12px">${item.cliente}</td>
              <td style="padding: 12px; text-align: center">
                <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; background: ${item.estado === 'activo' ? 'var(--emerald)22; color: var(--emerald)' : 'var(--amber)22; color: var(--amber)'}">
                  ${item.estado === 'activo' ? 'Activo' : 'Devuelto'}
                </span>
              </td>
              <td style="padding: 12px; text-align: center">
                <button onclick="EditarEquiposModule.editItem(${idx})" class="btn btn-sm btn-secondary" style="font-size: 11px; padding: 4px 8px; margin-right: 4px">Editar</button>
                <button onclick="EditarEquiposModule.deleteItem(${idx})" class="btn btn-sm btn-danger" style="font-size: 11px; padding: 4px 8px">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    document.getElementById('equipos-table').innerHTML = html;
  };

  const setupFormHandler = () => {
    const form = document.getElementById('equipo-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const tecnico = document.getElementById('form-tecnico').value;
      const numeroSerie = document.getElementById('form-serie').value;
      const modelo = document.getElementById('form-modelo').value;
      const cliente = document.getElementById('form-cliente').value;
      const orden = document.getElementById('form-orden').value;
      const estado = document.getElementById('form-estado').value;

      if (!tecnico || !numeroSerie || !modelo) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }

      const editingId = form.dataset.editingId;
      if (editingId !== undefined) {
        const id = equipos[editingId].id;
        equipos[editingId] = { id, tecnico, numeroSerie, modelo, estado, cliente, orden };
      } else {
        const newId = Math.max(...equipos.map(e => e.id), 0) + 1;
        equipos.push({ id: newId, tecnico, numeroSerie, modelo, estado, cliente, orden });
      }

      delete form.dataset.editingId;
      MockData.equiposData = JSON.parse(JSON.stringify(equipos));
      closeForm();
      renderTable();
    });
  };

  const showAddForm = () => {
    document.getElementById('form-modal').style.display = 'flex';
    document.getElementById('equipo-form').reset();
  };

  const editItem = (idx) => {
    const item = equipos[idx];
    document.getElementById('form-tecnico').value = item.tecnico;
    document.getElementById('form-serie').value = item.numeroSerie;
    document.getElementById('form-modelo').value = item.modelo;
    document.getElementById('form-cliente').value = item.cliente;
    document.getElementById('form-orden').value = item.orden;
    document.getElementById('form-estado').value = item.estado;
    document.getElementById('equipo-form').dataset.editingId = idx;
    showAddForm();
  };

  const deleteItem = (idx) => {
    if (confirm('¿Estás seguro de que quieres eliminar este equipo?')) {
      equipos.splice(idx, 1);
      MockData.equiposData = JSON.parse(JSON.stringify(equipos));
      renderTable();
    }
  };

  const closeForm = () => {
    document.getElementById('form-modal').style.display = 'none';
  };

  return { render, showAddForm, editItem, deleteItem, closeForm };
})();
