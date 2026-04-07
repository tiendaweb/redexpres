const EmpleadosModule = (() => {
  const render = (container) => {
    let empleados = StateManager.getState('empleados');
    if (!empleados) {
      empleados = [
        { id: 'E001', nombre: 'Juan García', email: 'juan@example.com', rol: 'Técnico', especialidades: 'Fibra, Instalaciones', disponible: true, estado: 'activo' },
        { id: 'E002', nombre: 'María López', email: 'maria@example.com', rol: 'Supervisor', especialidades: 'Supervisión, Reportes', disponible: true, estado: 'activo' }
      ];
      StateManager.set('empleados', empleados);
    }

    const html = `
      <div style="padding: 24px; max-width: 1200px; margin: 0 auto">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px">
          <h1 class="font-display" style="font-size: 28px; font-weight: 800; margin: 0; color: var(--text-light)">Gestión de Empleados</h1>
          <button class="btn btn-primary" onclick="EmpleadosModule.showCreateModal()" style="padding: 10px 16px; font-size: 13px">+ Nuevo Empleado</button>
        </div>

        <div class="glass" style="border-radius: 12px; overflow: hidden">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--bg-secondary);">
              <tr>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Nombre</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Email</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Rol</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Disponible</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Estado</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${empleados.map(emp => `
                <tr style="border-bottom: 1px solid var(--border-color);" onmouseenter="this.style.backgroundColor='var(--bg-secondary)'" onmouseleave="this.style.backgroundColor='transparent'">
                  <td style="padding: 16px; color: var(--text-light); font-weight: 500">${emp.nombre}</td>
                  <td style="padding: 16px; color: var(--text-light); font-size: 13px">${emp.email}</td>
                  <td style="padding: 16px; color: var(--text-light); font-size: 13px">${emp.rol}</td>
                  <td style="padding: 16px; text-align: center">
                    <span class="badge ${emp.disponible ? 'badge-emerald' : 'badge-amber'}" style="font-size: 11px">
                      ${emp.disponible ? '✓ Sí' : '⏸ No'}
                    </span>
                  </td>
                  <td style="padding: 16px; text-align: center">
                    <span class="badge ${emp.estado === 'activo' ? 'badge-emerald' : 'badge-amber'}" style="font-size: 11px">
                      ${emp.estado === 'activo' ? '✓ Activo' : '⏸ Inactivo'}
                    </span>
                  </td>
                  <td style="padding: 16px; text-align: center; display: flex; gap: 8px; justify-content: center">
                    <button class="btn btn-secondary" onclick="EmpleadosModule.showEditModal('${emp.id}')" style="padding: 6px 12px; font-size: 12px">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="EmpleadosModule.deleteEmpleado('${emp.id}')" style="padding: 6px 12px; font-size: 12px">🗑️ Eliminar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  const showCreateModal = () => {
    const formHtml = `
      <div style="padding: 24px; min-width: 450px; display: grid; gap: 16px">
        <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Nombre</label>
        <input type="text" id="emp-nombre" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
        <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Email</label>
        <input type="email" id="emp-email" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
        <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Rol</label>
        <select id="emp-rol" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          <option>Técnico</option>
          <option>Supervisor</option>
          <option>Operador</option>
        </select></div>
        <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Especialidades</label>
        <input type="text" id="emp-especialidades" placeholder="Fibra, Instalaciones, etc" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
        <div style="display: flex; gap: 16px">
          <label style="display: flex; align-items: center; gap: 8px; color: var(--text-light); font-size: 13px"><input type="checkbox" id="emp-disponible" checked style="width: 16px; height: 16px"> Disponible</label>
        </div>
      </div>
    `;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `<div class="glass" style="border-radius: 12px; max-width: 500px">
      <div style="padding: 24px; border-bottom: 1px solid var(--border-color)"><h2 style="margin: 0; color: var(--text-light); font-size: 18px; font-weight: 600">Nuevo Empleado</h2></div>
      ${formHtml}
      <div style="padding: 24px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end">
        <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
        <button class="btn btn-primary" onclick="EmpleadosModule.saveEmpleado(null, event)" style="padding: 10px 16px; font-size: 13px">Crear</button>
      </div></div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.parentElement.removeChild(modal); });
    document.body.appendChild(modal);
  };

  const showEditModal = (id) => {
    const empleados = StateManager.getState('empleados') || [];
    const emp = empleados.find(e => e.id === id);
    if (!emp) return;

    const formHtml = `
      <div style="padding: 24px; min-width: 450px; display: grid; gap: 16px">
        <div><input type="text" id="emp-nombre" value="${emp.nombre}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
        <div><input type="email" id="emp-email" value="${emp.email}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
        <div><select id="emp-rol" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          <option ${emp.rol === 'Técnico' ? 'selected' : ''}>Técnico</option>
          <option ${emp.rol === 'Supervisor' ? 'selected' : ''}>Supervisor</option>
          <option ${emp.rol === 'Operador' ? 'selected' : ''}>Operador</option>
        </select></div>
        <div><input type="text" id="emp-especialidades" value="${emp.especialidades}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
        <div><label style="display: flex; align-items: center; gap: 8px; color: var(--text-light); font-size: 13px"><input type="checkbox" id="emp-disponible" ${emp.disponible ? 'checked' : ''} style="width: 16px; height: 16px"> Disponible</label></div>
      </div>
    `;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `<div class="glass" style="border-radius: 12px; max-width: 500px">
      <div style="padding: 24px; border-bottom: 1px solid var(--border-color)"><h2 style="margin: 0; color: var(--text-light); font-size: 18px; font-weight: 600">Editar Empleado</h2></div>
      ${formHtml}
      <div style="padding: 24px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end">
        <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
        <button class="btn btn-primary" onclick="EmpleadosModule.saveEmpleado('${id}', event)" style="padding: 10px 16px; font-size: 13px">Guardar</button>
      </div></div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.parentElement.removeChild(modal); });
    document.body.appendChild(modal);
  };

  const saveEmpleado = (id, event) => {
    const nombre = document.getElementById('emp-nombre').value.trim();
    const email = document.getElementById('emp-email').value.trim();
    const rol = document.getElementById('emp-rol').value;
    const especialidades = document.getElementById('emp-especialidades').value.trim();
    const disponible = document.getElementById('emp-disponible').checked;

    if (!nombre || !email) {
      NotificationService.show('Por favor completa los campos requeridos', 'warning');
      return;
    }

    let empleados = StateManager.getState('empleados') || [];

    if (id) {
      empleados = empleados.map(e => e.id === id ? { ...e, nombre, email, rol, especialidades, disponible } : e);
      NotificationService.show('✓ Empleado actualizado', 'success');
    } else {
      const newEmp = {
        id: 'E' + (Math.max(...empleados.map(e => parseInt(e.id.substring(1)) || 0)), 0) + 1,
        nombre, email, rol, especialidades, disponible, estado: 'activo'
      };
      empleados.push(newEmp);
      NotificationService.show('✓ Empleado creado', 'success');
    }

    StateManager.set('empleados', empleados);
    const modal = event.target.closest('[role=dialog]');
    if (modal) modal.parentElement.removeChild(modal);
    render(document.getElementById('main-content'));
  };

  const deleteEmpleado = (id) => {
    const empleados = StateManager.getState('empleados') || [];
    const emp = empleados.find(e => e.id === id);

    const confirmModal = document.createElement('div');
    confirmModal.role = 'dialog';
    confirmModal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    confirmModal.innerHTML = `<div class="glass" style="border-radius: 12px; padding: 32px; max-width: 400px; text-align: center">
      <p style="margin: 0 0 16px 0; color: var(--text-light); font-size: 16px; font-weight: 600">¿Eliminar empleado?</p>
      <p style="margin: 0 0 24px 0; color: var(--text-muted); font-size: 13px">¿Eliminar a <strong>${emp.nombre}</strong>?</p>
      <div style="display: flex; gap: 12px; justify-content: center">
        <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
        <button class="btn btn-danger" onclick="EmpleadosModule.confirmDelete('${id}', event)" style="padding: 10px 16px; font-size: 13px">Eliminar</button>
      </div></div>`;
    confirmModal.addEventListener('click', (e) => { if (e.target === confirmModal) confirmModal.parentElement.removeChild(confirmModal); });
    document.body.appendChild(confirmModal);
  };

  const confirmDelete = (id, event) => {
    let empleados = StateManager.getState('empleados') || [];
    empleados = empleados.filter(e => e.id !== id);
    StateManager.set('empleados', empleados);
    NotificationService.show('✓ Empleado eliminado', 'success');
    const modal = event.target.closest('[role=dialog]');
    if (modal) modal.parentElement.removeChild(modal);
    render(document.getElementById('main-content'));
  };

  return { render, showCreateModal, showEditModal, saveEmpleado, deleteEmpleado, confirmDelete };
})();
