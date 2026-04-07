/**
 * Inventario Module - Gestión de inventario CRUD
 */

const InventarioModule = (() => {
  const render = (container) => {
    let items = StateManager.getState('inventario');
    if (!items) {
      items = [
        { codigo: 'FO-001', material: 'Fibra Óptica 50/125', categoria: 'Fibra', stock: 150, stockMin: 50, precio: 2500 },
        { codigo: 'CON-001', material: 'Conector SC/APC', categoria: 'Conectores', stock: 300, stockMin: 100, precio: 150 }
      ];
      StateManager.set('inventario', items);
    }

    const html = `
      <div style="padding: 24px; max-width: 1400px; margin: 0 auto">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px">
          <h1 class="font-display" style="font-size: 28px; font-weight: 800; margin: 0; color: var(--text-light)">Gestión de Inventario</h1>
          <button class="btn btn-primary" onclick="InventarioModule.showCreateModal()" style="padding: 10px 16px; font-size: 13px">+ Nuevo Artículo</button>
        </div>

        <div class="glass" style="border-radius: 12px; overflow: auto">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--bg-secondary);">
              <tr>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Código</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Material</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Categoría</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Stock</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Stock Mín.</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Precio</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Estado</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => {
                const estado = item.stock < item.stockMin ? 'bajo' : item.stock < item.stockMin * 1.5 ? 'advertencia' : 'ok';
                return `
                  <tr style="border-bottom: 1px solid var(--border-color);" onmouseenter="this.style.backgroundColor='var(--bg-secondary)'" onmouseleave="this.style.backgroundColor='transparent'">
                    <td style="padding: 16px; color: var(--cyan); font-weight: 600; font-family: 'Space Mono'; font-size: 12px">${item.codigo}</td>
                    <td style="padding: 16px; color: var(--text-light); font-size: 13px">${item.material}</td>
                    <td style="padding: 16px; color: var(--text-light); font-size: 13px">${item.categoria}</td>
                    <td style="padding: 16px; text-align: center; color: var(--text-light); font-weight: 600">${item.stock}</td>
                    <td style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 12px">${item.stockMin}</td>
                    <td style="padding: 16px; text-align: center; color: var(--text-light); font-size: 12px">$${item.precio}</td>
                    <td style="padding: 16px; text-align: center">
                      <span class="badge badge-${estado === 'bajo' ? 'red' : estado === 'advertencia' ? 'amber' : 'emerald'}" style="font-size: 11px">
                        ${estado === 'bajo' ? '⚠️ Bajo' : estado === 'advertencia' ? '→ Medio' : '✓ OK'}
                      </span>
                    </td>
                    <td style="padding: 16px; text-align: center; display: flex; gap: 8px; justify-content: center">
                      <button class="btn btn-secondary" onclick="InventarioModule.showEditModal('${item.codigo}')" style="padding: 6px 12px; font-size: 12px">✏️ Editar</button>
                      <button class="btn btn-danger" onclick="InventarioModule.deleteItem('${item.codigo}')" style="padding: 6px 12px; font-size: 12px">🗑️</button>
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
  };

  const showCreateModal = () => {
    const form = `<div style="padding: 24px; min-width: 500px; display: grid; gap: 16px">
      <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Código</label>
      <input type="text" id="inv-codigo" placeholder="ej: FO-001" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
      <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Material</label>
      <input type="text" id="inv-material" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
      <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Categoría</label>
      <input type="text" id="inv-categoria" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
        <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Stock</label>
        <input type="number" id="inv-stock" value="0" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
        <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Stock Mín.</label>
        <input type="number" id="inv-stockmin" value="0" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
      </div>
      <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Precio Unitario</label>
      <input type="number" id="inv-precio" value="0" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
    </div>`;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `<div class="glass" style="border-radius: 12px">
      <div style="padding: 24px; border-bottom: 1px solid var(--border-color)"><h2 style="margin: 0; color: var(--text-light); font-size: 18px; font-weight: 600">Nuevo Artículo</h2></div>
      ${form}
      <div style="padding: 24px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end">
        <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
        <button class="btn btn-primary" onclick="InventarioModule.saveItem(null, event)" style="padding: 10px 16px; font-size: 13px">Crear</button>
      </div></div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.parentElement.removeChild(modal); });
    document.body.appendChild(modal);
  };

  const showEditModal = (codigo) => {
    const items = StateManager.getState('inventario') || [];
    const item = items.find(i => i.codigo === codigo);
    if (!item) return;

    const form = `<div style="padding: 24px; min-width: 500px; display: grid; gap: 16px">
      <input type="text" id="inv-codigo" value="${item.codigo}" readonly style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
      <input type="text" id="inv-material" value="${item.material}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
      <input type="text" id="inv-categoria" value="${item.categoria}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
        <input type="number" id="inv-stock" value="${item.stock}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
        <input type="number" id="inv-stockmin" value="${item.stockMin}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
      </div>
      <input type="number" id="inv-precio" value="${item.precio}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
    </div>`;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `<div class="glass" style="border-radius: 12px">
      <div style="padding: 24px; border-bottom: 1px solid var(--border-color)"><h2 style="margin: 0; color: var(--text-light); font-size: 18px; font-weight: 600">Editar Artículo</h2></div>
      ${form}
      <div style="padding: 24px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end">
        <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
        <button class="btn btn-primary" onclick="InventarioModule.saveItem('${codigo}', event)" style="padding: 10px 16px; font-size: 13px">Guardar</button>
      </div></div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.parentElement.removeChild(modal); });
    document.body.appendChild(modal);
  };

  const saveItem = (codigo, event) => {
    const newCodigo = document.getElementById('inv-codigo').value.trim();
    const material = document.getElementById('inv-material').value.trim();
    const categoria = document.getElementById('inv-categoria').value.trim();
    const stock = parseInt(document.getElementById('inv-stock').value) || 0;
    const stockMin = parseInt(document.getElementById('inv-stockmin').value) || 0;
    const precio = parseInt(document.getElementById('inv-precio').value) || 0;

    if (!newCodigo || !material || !categoria) {
      NotificationService.show('Completa todos los campos', 'warning');
      return;
    }

    let items = StateManager.getState('inventario') || [];

    if (codigo) {
      items = items.map(i => i.codigo === codigo ? { codigo: newCodigo, material, categoria, stock, stockMin, precio } : i);
      NotificationService.show('✓ Artículo actualizado', 'success');
    } else {
      items.push({ codigo: newCodigo, material, categoria, stock, stockMin, precio });
      NotificationService.show('✓ Artículo creado', 'success');
    }

    StateManager.set('inventario', items);
    const modal = event.target.closest('[role=dialog]');
    if (modal) modal.parentElement.removeChild(modal);
    render(document.getElementById('main-content'));
  };

  const deleteItem = (codigo) => {
    let items = StateManager.getState('inventario') || [];
    items = items.filter(i => i.codigo !== codigo);
    StateManager.set('inventario', items);
    NotificationService.show('✓ Artículo eliminado', 'success');
    render(document.getElementById('main-content'));
  };

  return { render, showCreateModal, showEditModal, saveItem, deleteItem };
})();
