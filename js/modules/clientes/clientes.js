const ClientesModule = (() => {
  const render = (container) => {
    let clientes = StateManager.getState('clientes');
    if (!clientes || !Array.isArray(clientes)) {
      clientes = [
        { id: 'C001', nombre: 'Empresa A', email: 'contacto@empresaa.com', telefono: '+54 387 123 4567', tipo: 'Empresa', estado: 'activo' },
        { id: 'C002', nombre: 'Empresa B', email: 'contacto@empresab.com', telefono: '+54 387 234 5678', tipo: 'Persona', estado: 'activo' }
      ];
      StateManager.set('clientes', clientes);
    }

    const html = `
      <div style="padding: 24px; max-width: 1200px; margin: 0 auto">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px">
          <h1 class="font-display" style="font-size: 28px; font-weight: 800; margin: 0; color: var(--text-light)">Gestión de Clientes</h1>
          <button class="btn btn-primary" onclick="ClientesModule.showCreateModal()" style="padding: 10px 16px; font-size: 13px">+ Nuevo Cliente</button>
        </div>

        <div class="glass" style="border-radius: 12px; overflow: hidden">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--bg-secondary); border-bottom: 2px solid var(--border-color);">
              <tr>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600">Nombre</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600">Email</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600">Teléfono</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600">Tipo</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600">Estado</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${clientes.map(cliente => `
                <tr style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;" onmouseenter="this.style.backgroundColor='var(--bg-secondary)'" onmouseleave="this.style.backgroundColor='transparent'">
                  <td style="padding: 16px; color: var(--text-light); font-weight: 500">${cliente.nombre}</td>
                  <td style="padding: 16px; color: var(--text-light); font-size: 13px">${cliente.email}</td>
                  <td style="padding: 16px; color: var(--text-light); font-size: 13px">${cliente.telefono}</td>
                  <td style="padding: 16px; color: var(--text-light); font-size: 13px">${cliente.tipo}</td>
                  <td style="padding: 16px; text-align: center">
                    <span class="badge ${cliente.estado === 'activo' ? 'badge-emerald' : 'badge-amber'}" style="font-size: 11px">
                      ${cliente.estado === 'activo' ? '✓ Activo' : '⏸ Inactivo'}
                    </span>
                  </td>
                  <td style="padding: 16px; text-align: center; display: flex; gap: 8px; justify-content: center">
                    <button class="btn btn-secondary" onclick="ClientesModule.showEditModal('${cliente.id}')" style="padding: 6px 12px; font-size: 12px">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="ClientesModule.deleteCliente('${cliente.id}')" style="padding: 6px 12px; font-size: 12px">🗑️ Eliminar</button>
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
      <div style="padding: 24px; min-width: 450px">
        <div style="display: grid; gap: 16px">
          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Nombre</label>
            <input type="text" id="cliente-nombre" placeholder="Nombre de la empresa o persona" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Email</label>
            <input type="email" id="cliente-email" placeholder="correo@ejemplo.com" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Teléfono</label>
            <input type="tel" id="cliente-telefono" placeholder="+54 387 123 4567" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Tipo de Cliente</label>
            <select id="cliente-tipo" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
              <option value="Empresa">Empresa</option>
              <option value="Persona">Persona Física</option>
              <option value="Otra">Otra</option>
            </select>
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Estado</label>
            <select id="cliente-estado" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>
    `;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `
      <div class="glass" style="border-radius: 12px; max-width: 500px">
        <div style="padding: 24px; border-bottom: 1px solid var(--border-color)">
          <h2 style="margin: 0; color: var(--text-light); font-size: 18px; font-weight: 600">Nuevo Cliente</h2>
        </div>
        ${formHtml}
        <div style="padding: 24px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end">
          <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
          <button class="btn btn-primary" onclick="ClientesModule.saveCliente(null, event)" style="padding: 10px 16px; font-size: 13px">Crear Cliente</button>
        </div>
      </div>
    `;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.parentElement.removeChild(modal);
      }
    });

    document.body.appendChild(modal);
  };

  const showEditModal = (id) => {
    const clientes = StateManager.getState('clientes') || [];
    const cliente = clientes.find(c => c.id === id);

    if (!cliente) return;

    const formHtml = `
      <div style="padding: 24px; min-width: 450px">
        <div style="display: grid; gap: 16px">
          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Nombre</label>
            <input type="text" id="cliente-nombre" value="${cliente.nombre}" placeholder="Nombre de la empresa o persona" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Email</label>
            <input type="email" id="cliente-email" value="${cliente.email}" placeholder="correo@ejemplo.com" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Teléfono</label>
            <input type="tel" id="cliente-telefono" value="${cliente.telefono}" placeholder="+54 387 123 4567" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Tipo de Cliente</label>
            <select id="cliente-tipo" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
              <option value="Empresa" ${cliente.tipo === 'Empresa' ? 'selected' : ''}>Empresa</option>
              <option value="Persona" ${cliente.tipo === 'Persona' ? 'selected' : ''}>Persona Física</option>
              <option value="Otra" ${cliente.tipo === 'Otra' ? 'selected' : ''}>Otra</option>
            </select>
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Estado</label>
            <select id="cliente-estado" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
              <option value="activo" ${cliente.estado === 'activo' ? 'selected' : ''}>Activo</option>
              <option value="inactivo" ${cliente.estado === 'inactivo' ? 'selected' : ''}>Inactivo</option>
            </select>
          </div>
        </div>
      </div>
    `;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `
      <div class="glass" style="border-radius: 12px; max-width: 500px">
        <div style="padding: 24px; border-bottom: 1px solid var(--border-color)">
          <h2 style="margin: 0; color: var(--text-light); font-size: 18px; font-weight: 600">Editar Cliente</h2>
        </div>
        ${formHtml}
        <div style="padding: 24px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end">
          <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
          <button class="btn btn-primary" onclick="ClientesModule.saveCliente('${id}', event)" style="padding: 10px 16px; font-size: 13px">Guardar Cambios</button>
        </div>
      </div>
    `;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.parentElement.removeChild(modal);
      }
    });

    document.body.appendChild(modal);
  };

  const saveCliente = (id, event) => {
    const nombre = document.getElementById('cliente-nombre').value.trim();
    const email = document.getElementById('cliente-email').value.trim();
    const telefono = document.getElementById('cliente-telefono').value.trim();
    const tipo = document.getElementById('cliente-tipo').value;
    const estado = document.getElementById('cliente-estado').value;

    if (!nombre || !email || !telefono) {
      NotificationService.show('Por favor completa todos los campos', 'warning');
      return;
    }

    let clientes = StateManager.getState('clientes') || [];

    if (id) {
      // Actualizar
      clientes = clientes.map(c =>
        c.id === id
          ? { ...c, nombre, email, telefono, tipo, estado }
          : c
      );
      NotificationService.show('✓ Cliente actualizado exitosamente', 'success');
    } else {
      // Crear
      const newCliente = {
        id: 'C' + (Math.max(...clientes.map(c => parseInt(c.id.substring(1)) || 0)), 0) + 1,
        nombre,
        email,
        telefono,
        tipo,
        estado
      };
      clientes.push(newCliente);
      NotificationService.show('✓ Cliente creado exitosamente', 'success');
    }

    StateManager.set('clientes', clientes);

    // Close modal and refresh
    const modal = event.target.closest('[role=dialog]');
    if (modal) modal.parentElement.removeChild(modal);
    render(document.getElementById('main-content'));
  };

  const deleteCliente = (id) => {
    const clientes = StateManager.getState('clientes') || [];
    const cliente = clientes.find(c => c.id === id);

    const confirmModal = document.createElement('div');
    confirmModal.role = 'dialog';
    confirmModal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    confirmModal.innerHTML = `
      <div class="glass" style="border-radius: 12px; padding: 32px; max-width: 400px; text-align: center">
        <p style="margin: 0 0 16px 0; color: var(--text-light); font-size: 16px; font-weight: 600">¿Eliminar cliente?</p>
        <p style="margin: 0 0 24px 0; color: var(--text-muted); font-size: 13px">Esta acción eliminará el cliente <strong>${cliente.nombre}</strong> y no se puede deshacer</p>
        <div style="display: flex; gap: 12px; justify-content: center">
          <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
          <button class="btn btn-danger" onclick="ClientesModule.confirmDelete('${id}', event)" style="padding: 10px 16px; font-size: 13px">Sí, Eliminar</button>
        </div>
      </div>
    `;

    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        confirmModal.parentElement.removeChild(confirmModal);
      }
    });

    document.body.appendChild(confirmModal);
  };

  const confirmDelete = (id, event) => {
    let clientes = StateManager.getState('clientes') || [];
    clientes = clientes.filter(c => c.id !== id);
    StateManager.set('clientes', clientes);

    NotificationService.show('✓ Cliente eliminado exitosamente', 'success');

    const modal = event.target.closest('[role=dialog]');
    if (modal) modal.parentElement.removeChild(modal);
    render(document.getElementById('main-content'));
  };

  return {
    render,
    showCreateModal,
    showEditModal,
    saveCliente,
    deleteCliente,
    confirmDelete
  };
})();
