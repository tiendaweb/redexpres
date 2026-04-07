const OrdenesModule = (() => {
  const render = (container) => {
    let ordenes = StateManager.getState('ordenes');
    if (!ordenes) {
      ordenes = [
        { id: 'ORD001', cliente: 'Empresa A', tecnico: 'Juan García', estado: 'activo', prioridad: 'alta', fecha: '2026-04-01' },
        { id: 'ORD002', cliente: 'Empresa B', tecnico: 'María López', estado: 'activo', prioridad: 'media', fecha: '2026-04-02' }
      ];
      StateManager.set('ordenes', ordenes);
    }

    const html = `
      <div style="padding: 24px; max-width: 1400px; margin: 0 auto">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px">
          <h1 class="font-display" style="font-size: 28px; font-weight: 800; margin: 0; color: var(--text-light)">Gestión de Órdenes</h1>
          <button class="btn btn-primary" onclick="OrdenesModule.showCreateModal()" style="padding: 10px 16px; font-size: 13px">+ Nueva Orden</button>
        </div>

        <div class="glass" style="border-radius: 12px; overflow: auto">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--bg-secondary); position: sticky; top: 0;">
              <tr>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">ID</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Cliente</th>
                <th style="padding: 16px; text-align: left; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Técnico</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Estado</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Prioridad</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Fecha</th>
                <th style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${ordenes.map(ord => `
                <tr style="border-bottom: 1px solid var(--border-color);" onmouseenter="this.style.backgroundColor='var(--bg-secondary)'" onmouseleave="this.style.backgroundColor='transparent'">
                  <td style="padding: 16px; color: var(--cyan); font-weight: 600; font-family: 'Space Mono'">${ord.id}</td>
                  <td style="padding: 16px; color: var(--text-light); font-size: 13px">${ord.cliente}</td>
                  <td style="padding: 16px; color: var(--text-light); font-size: 13px">${ord.tecnico}</td>
                  <td style="padding: 16px; text-align: center">
                    <span class="badge ${ord.estado === 'activo' ? 'badge-emerald' : 'badge-amber'}" style="font-size: 11px">
                      ${ord.estado === 'activo' ? '✓ Activo' : '⏸ Completado'}
                    </span>
                  </td>
                  <td style="padding: 16px; text-align: center">
                    <span class="badge ${ord.prioridad === 'alta' ? 'badge-red' : ord.prioridad === 'media' ? 'badge-amber' : 'badge-emerald'}" style="font-size: 11px">
                      ${ord.prioridad === 'alta' ? '⚡ Alta' : ord.prioridad === 'media' ? '→ Media' : '↓ Baja'}
                    </span>
                  </td>
                  <td style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 12px">${ord.fecha}</td>
                  <td style="padding: 16px; text-align: center; display: flex; gap: 8px; justify-content: center">
                    <button class="btn btn-secondary" onclick="OrdenesModule.showEditModal('${ord.id}')" style="padding: 6px 12px; font-size: 12px">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="OrdenesModule.deleteOrden('${ord.id}')" style="padding: 6px 12px; font-size: 12px">🗑️</button>
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
    const form = `<div style="padding: 24px; min-width: 500px; display: grid; gap: 16px">
      <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">ID Orden</label>
      <input type="text" id="ord-id" placeholder="ORD..." style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
      <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Cliente</label>
      <input type="text" id="ord-cliente" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
      <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Técnico</label>
      <input type="text" id="ord-tecnico" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px"></div>
      <div><label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; margin-bottom: 8px">Prioridad</label>
      <select id="ord-prioridad" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select></div>
    </div>`;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `<div class="glass" style="border-radius: 12px">
      <div style="padding: 24px; border-bottom: 1px solid var(--border-color)"><h2 style="margin: 0; color: var(--text-light); font-size: 18px; font-weight: 600">Nueva Orden</h2></div>
      ${form}
      <div style="padding: 24px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end">
        <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
        <button class="btn btn-primary" onclick="OrdenesModule.saveOrden(null, event)" style="padding: 10px 16px; font-size: 13px">Crear Orden</button>
      </div></div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.parentElement.removeChild(modal); });
    document.body.appendChild(modal);
  };

  const showEditModal = (id) => {
    const ordenes = StateManager.getState('ordenes') || [];
    const ord = ordenes.find(o => o.id === id);
    if (!ord) return;

    const form = `<div style="padding: 24px; min-width: 500px; display: grid; gap: 16px">
      <input type="text" id="ord-id" value="${ord.id}" readonly style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
      <input type="text" id="ord-cliente" value="${ord.cliente}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
      <input type="text" id="ord-tecnico" value="${ord.tecnico}" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
      <select id="ord-prioridad" style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
        <option value="alta" ${ord.prioridad === 'alta' ? 'selected' : ''}>Alta</option>
        <option value="media" ${ord.prioridad === 'media' ? 'selected' : ''}>Media</option>
        <option value="baja" ${ord.prioridad === 'baja' ? 'selected' : ''}>Baja</option>
      </select>
    </div>`;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `<div class="glass" style="border-radius: 12px">
      <div style="padding: 24px; border-bottom: 1px solid var(--border-color)"><h2 style="margin: 0; color: var(--text-light); font-size: 18px; font-weight: 600">Editar Orden</h2></div>
      ${form}
      <div style="padding: 24px; border-top: 1px solid var(--border-color); display: flex; gap: 12px; justify-content: flex-end">
        <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))" style="padding: 10px 16px; font-size: 13px">Cancelar</button>
        <button class="btn btn-primary" onclick="OrdenesModule.saveOrden('${id}', event)" style="padding: 10px 16px; font-size: 13px">Guardar</button>
      </div></div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.parentElement.removeChild(modal); });
    document.body.appendChild(modal);
  };

  const saveOrden = (id, event) => {
    const ordId = document.getElementById('ord-id').value.trim();
    const cliente = document.getElementById('ord-cliente').value.trim();
    const tecnico = document.getElementById('ord-tecnico').value.trim();
    const prioridad = document.getElementById('ord-prioridad').value;

    if (!ordId || !cliente || !tecnico) {
      NotificationService.show('Completa todos los campos', 'warning');
      return;
    }

    let ordenes = StateManager.getState('ordenes') || [];

    if (id) {
      ordenes = ordenes.map(o => o.id === id ? { ...o, cliente, tecnico, prioridad } : o);
      NotificationService.show('✓ Orden actualizada', 'success');
    } else {
      ordenes.push({ id: ordId, cliente, tecnico, estado: 'activo', prioridad, fecha: new Date().toISOString().split('T')[0] });
      NotificationService.show('✓ Orden creada', 'success');
    }

    StateManager.set('ordenes', ordenes);
    const modal = event.target.closest('[role=dialog]');
    if (modal) modal.parentElement.removeChild(modal);
    render(document.getElementById('main-content'));
  };

  const deleteOrden = (id) => {
    let ordenes = StateManager.getState('ordenes') || [];
    ordenes = ordenes.filter(o => o.id !== id);
    StateManager.set('ordenes', ordenes);
    NotificationService.show('✓ Orden eliminada', 'success');
    render(document.getElementById('main-content'));
  };

  return { render, showCreateModal, showEditModal, saveOrden, deleteOrden };
})();
