/**
 * Inventario Module - Gestión de inventario CRUD
 */

const InventarioModule = (() => {
  const render = (container) => {
    const inventario = StateManager.getState('inventario');

    const html = `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2>Gestión de Inventario</h2>
          <button class="btn btn-primary" onclick="InventarioModule.showCreateModal()">+ Nuevo Artículo</button>
        </div>

        <div class="card glass">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--bg-secondary); border-bottom: 2px solid var(--border-primary);">
              <tr>
                <th style="padding: var(--spacing-md); text-align: left;">Código</th>
                <th style="padding: var(--spacing-md); text-align: left;">Material</th>
                <th style="padding: var(--spacing-md); text-align: center;">Stock</th>
                <th style="padding: var(--spacing-md); text-align: center;">Mínimo</th>
                <th style="padding: var(--spacing-md); text-align: right;">Precio Unit.</th>
                <th style="padding: var(--spacing-md); text-align: center;">Estado</th>
                <th style="padding: var(--spacing-md); text-align: center;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${inventario.map(item => {
                const estadoBadge = item.stock < item.stockMinimo * 0.5 ?
                  'badge-red' : item.stock < item.stockMinimo ?
                  'badge-amber' : 'badge-emerald';

                return `
                  <tr style="border-bottom: 1px solid var(--border-secondary); transition: background var(--transition-fast);" onmouseenter="this.style.backgroundColor='var(--bg-hover)'" onmouseleave="this.style.backgroundColor='transparent'">
                    <td style="padding: var(--spacing-md); font-family: var(--font-mono); color: var(--cyan);">${item.codigo}</td>
                    <td style="padding: var(--spacing-md);">${item.material}</td>
                    <td style="padding: var(--spacing-md); text-align: center;"><strong>${item.stock}</strong></td>
                    <td style="padding: var(--spacing-md); text-align: center;">${item.stockMinimo}</td>
                    <td style="padding: var(--spacing-md); text-align: right;">${Formatters.currency(item.precioUnitario)}</td>
                    <td style="padding: var(--spacing-md); text-align: center;">
                      <span class="badge ${estadoBadge}">
                        ${item.stock < item.stockMinimo * 0.5 ? 'Crítico' : item.stock < item.stockMinimo ? 'Bajo' : 'OK'}
                      </span>
                    </td>
                    <td style="padding: var(--spacing-md); text-align: center;">
                      <button class="btn btn-sm btn-ghost" onclick="InventarioModule.showEditModal('${item.id}')">Editar</button>
                      <button class="btn btn-sm btn-danger" onclick="InventarioModule.delete('${item.id}')">Eliminar</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
    document.getElementById('page-title').textContent = 'Inventario';
  };

  const showCreateModal = () => {
    Modal.show({
      title: 'Nuevo Artículo',
      content: '<p>Formulario para agregar artículo aquí</p>',
      buttons: [
        { text: 'Cancelar', action: Modal.close },
        { text: 'Crear', action: () => { NotificationService.success('Artículo agregado'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const showEditModal = (id) => {
    Modal.show({
      title: 'Editar Artículo',
      content: `<p>Editando artículo ${id}</p>`,
      buttons: [
        { text: 'Cancelar', action: Modal.close },
        { text: 'Guardar', action: () => { NotificationService.success('Artículo actualizado'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const delete_ = (id) => {
    NotificationService.confirm('¿Eliminar este artículo?', () => {
      StateManager.removeFromArray('inventario', id);
      NotificationService.success('Artículo eliminado');
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
  module.exports = InventarioModule;
}
