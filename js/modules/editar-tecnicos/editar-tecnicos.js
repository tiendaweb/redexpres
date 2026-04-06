/**
 * Editar Técnicos Module
 * CRUD operations for technicians
 */

const EditarTecnicosModule = (() => {
  let tecnicos = [];

  const render = (container) => {
    tecnicos = JSON.parse(JSON.stringify(MockData.tecnicosData));

    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px">
            <h2 class="font-display" style="font-size: 20px; font-weight: 800">
              Gestión de <span class="text-cyan">Técnicos</span>
            </h2>
            <button class="btn btn-primary" onclick="EditarTecnicosModule.showAddForm()" style="padding: 8px 14px; font-size: 12px">+ Agregar Técnico</button>
          </div>
          <p class="text-muted" style="font-size: 13px">Administra la información de los técnicos del equipo</p>
        </div>

        <div class="col-12 glass fade-up delay-2" style="padding: 24px">
          <div id="tecnicos-table" style="overflow-x: auto">
          </div>
        </div>

        <div id="form-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 1000; align-items: center; justify-content: center;">
          <div class="glass" style="width: 90%; max-width: 500px; padding: 24px; border-radius: 16px">
            <h3 style="margin-bottom: 16px; font-weight: 600">Agregar/Editar Técnico</h3>
            <form id="tecnico-form" style="display: grid; gap: 12px">
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Nombre</label>
                <input type="text" id="form-nombre" placeholder="Nombre completo" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Teléfono</label>
                <input type="tel" id="form-telefono" placeholder="+54 9 387 123-4567" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Equipos Asignados</label>
                <input type="number" id="form-equipos" placeholder="0" min="0" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Estado</label>
                <select id="form-estado" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px">
                <button type="button" onclick="EditarTecnicosModule.closeForm()" class="btn btn-secondary" style="padding: 10px">Cancelar</button>
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
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--text-primary)">Nombre</th>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--text-primary)">Teléfono</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Equipos</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Estado</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${tecnicos.map((item, idx) => `
            <tr style="border-bottom: 1px solid var(--border-glass);">
              <td style="padding: 12px; color: var(--text-primary); font-weight: 500">${item.nombre}</td>
              <td style="padding: 12px; color: var(--text-muted); font-size: 12px">${item.telefono}</td>
              <td style="padding: 12px; text-align: center; color: var(--text-primary)">${item.equipoAsignado}</td>
              <td style="padding: 12px; text-align: center">
                <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; background: ${item.estado === 'activo' ? 'var(--emerald)22; color: var(--emerald)' : 'var(--red)22; color: var(--red)'}">
                  ${item.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td style="padding: 12px; text-align: center">
                <button onclick="EditarTecnicosModule.editItem(${idx})" class="btn btn-sm btn-secondary" style="font-size: 11px; padding: 4px 8px; margin-right: 4px">Editar</button>
                <button onclick="EditarTecnicosModule.deleteItem(${idx})" class="btn btn-sm btn-danger" style="font-size: 11px; padding: 4px 8px">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    document.getElementById('tecnicos-table').innerHTML = html;
  };

  const setupFormHandler = () => {
    const form = document.getElementById('tecnico-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('form-nombre').value;
      const telefono = document.getElementById('form-telefono').value;
      const equipoAsignado = parseInt(document.getElementById('form-equipos').value) || 0;
      const estado = document.getElementById('form-estado').value;

      if (!nombre || !telefono) {
        alert('Por favor completa todos los campos');
        return;
      }

      const editingId = form.dataset.editingId;
      if (editingId !== undefined) {
        const id = tecnicos[editingId].id;
        tecnicos[editingId] = { id, nombre, telefono, equipoAsignado, estado };
      } else {
        const newId = Math.max(...tecnicos.map(t => t.id), 0) + 1;
        tecnicos.push({ id: newId, nombre, telefono, equipoAsignado, estado });
      }

      delete form.dataset.editingId;
      MockData.tecnicosData = JSON.parse(JSON.stringify(tecnicos));
      closeForm();
      renderTable();
    });
  };

  const showAddForm = () => {
    document.getElementById('form-modal').style.display = 'flex';
    document.getElementById('tecnico-form').reset();
  };

  const editItem = (idx) => {
    const item = tecnicos[idx];
    document.getElementById('form-nombre').value = item.nombre;
    document.getElementById('form-telefono').value = item.telefono;
    document.getElementById('form-equipos').value = item.equipoAsignado;
    document.getElementById('form-estado').value = item.estado;
    document.getElementById('tecnico-form').dataset.editingId = idx;
    showAddForm();
  };

  const deleteItem = (idx) => {
    if (confirm('¿Estás seguro de que quieres eliminar este técnico?')) {
      tecnicos.splice(idx, 1);
      MockData.tecnicosData = JSON.parse(JSON.stringify(tecnicos));
      renderTable();
    }
  };

  const closeForm = () => {
    document.getElementById('form-modal').style.display = 'none';
  };

  return { render, showAddForm, editItem, deleteItem, closeForm };
})();
