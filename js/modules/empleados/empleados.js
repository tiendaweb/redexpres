const EmpleadosModule = (() => {
  const render = (container) => {
    const empleados = StateManager.getState('empleados');

    const html = `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Gestión de Empleados</h2>
          <button class="btn btn-primary" onclick="EmpleadosModule.showCreateModal()">+ Nuevo Empleado</button>
        </div>

        <div class="card glass">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--bg-secondary); border-bottom: 2px solid var(--border-primary);">
              <tr>
                <th style="padding: var(--spacing-md); text-align: left;">Nombre</th>
                <th style="padding: var(--spacing-md); text-align: left;">Email</th>
                <th style="padding: var(--spacing-md); text-align: left;">Rol</th>
                <th style="padding: var(--spacing-md); text-align: center;">Disponible</th>
                <th style="padding: var(--spacing-md); text-align: center;">Estado</th>
                <th style="padding: var(--spacing-md); text-align: center;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${empleados.map(emp => `
                <tr style="border-bottom: 1px solid var(--border-secondary); transition: background var(--transition-fast);" onmouseenter="this.style.backgroundColor='var(--bg-hover)'" onmouseleave="this.style.backgroundColor='transparent'">
                  <td style="padding: var(--spacing-md);"><strong>${emp.nombre}</strong></td>
                  <td style="padding: var(--spacing-md);">${emp.email}</td>
                  <td style="padding: var(--spacing-md);" class="text-capitalize">${emp.rol}</td>
                  <td style="padding: var(--spacing-md); text-align: center;">
                    <span class="badge ${emp.disponible ? 'badge-emerald' : 'badge-red'}">${emp.disponible ? 'Sí' : 'No'}</span>
                  </td>
                  <td style="padding: var(--spacing-md); text-align: center;">${Formatters.status(emp.estado)}</td>
                  <td style="padding: var(--spacing-md); text-align: center;">
                    <button class="btn btn-sm btn-ghost" onclick="EmpleadosModule.showEditModal('${emp.id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="EmpleadosModule.delete('${emp.id}')">Eliminar</button>
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
    document.getElementById('page-title').textContent = 'Empleados';
  };

  const showCreateModal = () => {
    Modal.show({
      title: 'Nuevo Empleado',
      content: '<p>Formulario para nuevo empleado aquí</p>',
      buttons: [
        { text: 'Cancelar', action: Modal.close },
        { text: 'Crear', action: () => { NotificationService.success('Empleado creado'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const showEditModal = (id) => {
    Modal.show({
      title: 'Editar Empleado',
      content: `<p>Editando empleado ${id}</p>`,
      buttons: [
        { text: 'Cancelar', action: Modal.close },
        { text: 'Guardar', action: () => { NotificationService.success('Empleado actualizado'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const delete_ = (id) => {
    NotificationService.confirm('¿Eliminar este empleado?', () => {
      StateManager.removeFromArray('empleados', id);
      NotificationService.success('Empleado eliminado');
      render(document.getElementById('app-content'));
    });
  };

  return { render, showCreateModal, showEditModal, delete: delete_ };
})();
