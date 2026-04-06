/**
 * Órdenes Module - Gestión de órdenes CRUD
 */

const OrdenesModule = (() => {
  const render = (container) => {
    const ordenes = StateManager.getState('ordenes');

    const html = `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Gestión de Órdenes</h2>
          <button class="btn btn-primary" onclick="OrdenesModule.showCreateModal()">+ Nueva Orden</button>
        </div>

        <div class="card glass">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--bg-secondary); border-bottom: 2px solid var(--border-primary);">
              <tr>
                <th style="padding: var(--spacing-md); text-align: left;">ID</th>
                <th style="padding: var(--spacing-md); text-align: left;">Cliente</th>
                <th style="padding: var(--spacing-md); text-align: left;">Técnico</th>
                <th style="padding: var(--spacing-md); text-align: center;">Estado</th>
                <th style="padding: var(--spacing-md); text-align: center;">Prioridad</th>
                <th style="padding: var(--spacing-md); text-align: center;">Fecha</th>
                <th style="padding: var(--spacing-md); text-align: center;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${ordenes.map(orden => `
                <tr style="border-bottom: 1px solid var(--border-secondary); transition: background var(--transition-fast);" onmouseenter="this.style.backgroundColor='var(--bg-hover)'" onmouseleave="this.style.backgroundColor='transparent'">
                  <td style="padding: var(--spacing-md);"><strong class="text-cyan">${orden.id}</strong></td>
                  <td style="padding: var(--spacing-md);">${orden.cliente.nombre}</td>
                  <td style="padding: var(--spacing-md);">${orden.tecnico.nombre}</td>
                  <td style="padding: var(--spacing-md); text-align: center;">${Formatters.status(orden.estado)}</td>
                  <td style="padding: var(--spacing-md); text-align: center;">
                    <span class="badge badge-${orden.prioridad === 'alta' ? 'red' : 'amber'}">${orden.prioridad}</span>
                  </td>
                  <td style="padding: var(--spacing-md); text-align: center;">${Formatters.date(orden.fechaCreacion)}</td>
                  <td style="padding: var(--spacing-md); text-align: center;">
                    <button class="btn btn-sm btn-ghost" onclick="OrdenesModule.showEditModal('${orden.id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="OrdenesModule.delete('${orden.id}')">Eliminar</button>
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
    document.getElementById('page-title').textContent = 'Órdenes';
  };

  const showCreateModal = () => {
    Modal.show({
      title: 'Nueva Orden',
      content: '<p>Formulario para crear orden aquí</p>',
      buttons: [
        { text: 'Cancelar', action: Modal.close },
        { text: 'Crear', action: () => { NotificationService.success('Orden creada'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const showEditModal = (id) => {
    Modal.show({
      title: 'Editar Orden',
      content: `<p>Editando orden ${id}</p>`,
      buttons: [
        { text: 'Cancelar', action: Modal.close },
        { text: 'Guardar', action: () => { NotificationService.success('Orden actualizada'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const delete_ = (id) => {
    NotificationService.confirm('¿Eliminar esta orden?', () => {
      StateManager.removeFromArray('ordenes', id);
      NotificationService.success('Orden eliminada');
      render(document.getElementById('app-content'));
    });
  };

  return {
    render,
    showCreateModal,
    showEditModal,
    delete: delete_
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = OrdenesModule;
}
