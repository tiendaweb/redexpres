const ClientesModule = (() => {
  const render = (container) => {
    const clientes = StateManager.getState('clientes');

    const html = `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Gestión de Clientes</h2>
          <button class="btn btn-primary" onclick="ClientesModule.showCreateModal()">+ Nuevo Cliente</button>
        </div>

        <div class="card glass">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--bg-secondary); border-bottom: 2px solid var(--border-primary);">
              <tr>
                <th style="padding: var(--spacing-md); text-align: left;">Nombre</th>
                <th style="padding: var(--spacing-md); text-align: left;">Email</th>
                <th style="padding: var(--spacing-md); text-align: left;">Teléfono</th>
                <th style="padding: var(--spacing-md); text-align: left;">Tipo</th>
                <th style="padding: var(--spacing-md); text-align: center;">Estado</th>
                <th style="padding: var(--spacing-md); text-align: center;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${clientes.map(cliente => `
                <tr style="border-bottom: 1px solid var(--border-secondary); transition: background var(--transition-fast);" onmouseenter="this.style.backgroundColor='var(--bg-hover)'" onmouseleave="this.style.backgroundColor='transparent'">
                  <td style="padding: var(--spacing-md);"><strong>${cliente.nombre}</strong></td>
                  <td style="padding: var(--spacing-md);">${cliente.email}</td>
                  <td style="padding: var(--spacing-md);">${cliente.telefono}</td>
                  <td style="padding: var(--spacing-md);" class="text-capitalize">${cliente.tipo}</td>
                  <td style="padding: var(--spacing-md); text-align: center;">${Formatters.status(cliente.estado)}</td>
                  <td style="padding: var(--spacing-md); text-align: center;">
                    <button class="btn btn-sm btn-ghost" onclick="ClientesModule.showEditModal('${cliente.id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="ClientesModule.delete('${cliente.id}')">Eliminar</button>
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
    document.getElementById('page-title').textContent = 'Clientes';
  };

  const showCreateModal = () => {
    Modal.show({
      title: 'Nuevo Cliente',
      content: '<p>Formulario para nuevo cliente aquí</p>',
      buttons: [
        { text: 'Cancelar', action: Modal.close },
        { text: 'Crear', action: () => { NotificationService.success('Cliente creado'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const showEditModal = (id) => {
    Modal.show({
      title: 'Editar Cliente',
      content: `<p>Editando cliente ${id}</p>`,
      buttons: [
        { text: 'Cancelar', action: Modal.close },
        { text: 'Guardar', action: () => { NotificationService.success('Cliente actualizado'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const delete_ = (id) => {
    NotificationService.confirm('¿Eliminar este cliente?', () => {
      StateManager.removeFromArray('clientes', id);
      NotificationService.success('Cliente eliminado');
      render(document.getElementById('app-content'));
    });
  };

  return { render, showCreateModal, showEditModal, delete: delete_ };
})();
