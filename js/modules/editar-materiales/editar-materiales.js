/**
 * Editar Materiales Module
 * CRUD operations for inventory materials
 */

const EditarMaterialesModule = (() => {
  let materials = [];

  const render = (container) => {
    materials = JSON.parse(JSON.stringify(MockData.stockData));

    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px">
            <h2 class="font-display" style="font-size: 20px; font-weight: 800">
              Gestión de <span class="text-cyan">Materiales</span>
            </h2>
            <button class="btn btn-primary" onclick="EditarMaterialesModule.showAddForm()" style="padding: 8px 14px; font-size: 12px">+ Agregar Material</button>
          </div>
          <p class="text-muted" style="font-size: 13px">Editar, agregar o eliminar materiales del inventario</p>
        </div>

        <div class="col-12 glass fade-up delay-2" style="padding: 24px">
          <div id="materiales-table" style="overflow-x: auto">
          </div>
        </div>

        <div id="form-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 1000; align-items: center; justify-content: center;">
          <div class="glass" style="width: 90%; max-width: 500px; padding: 24px; border-radius: 16px">
            <h3 style="margin-bottom: 16px; font-weight: 600">Agregar/Editar Material</h3>
            <form id="material-form" style="display: grid; gap: 12px">
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Código</label>
                <input type="text" id="form-codigo" placeholder="Ej: 120204" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Material</label>
                <input type="text" id="form-material" placeholder="Nombre del material" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
              </div>
              <div>
                <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Categoría</label>
                <select id="form-cat" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
                  <option value="nodo">Nodo</option>
                  <option value="inst">Instalación</option>
                </select>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
                <div>
                  <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Stock</label>
                  <input type="number" id="form-stock" placeholder="0" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
                </div>
                <div>
                  <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px">Mínimo</label>
                  <input type="number" id="form-min" placeholder="0" style="width: 100%; padding: 8px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px">
                <button type="button" onclick="EditarMaterialesModule.closeForm()" class="btn btn-secondary" style="padding: 10px">Cancelar</button>
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
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--text-primary)">Código</th>
            <th style="padding: 12px; text-align: left; font-weight: 700; color: var(--text-primary)">Material</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Categoría</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Stock</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Mín</th>
            <th style="padding: 12px; text-align: center; font-weight: 700; color: var(--text-primary)">Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${materials.map((item, idx) => `
            <tr style="border-bottom: 1px solid var(--border-glass);">
              <td style="padding: 12px; color: var(--cyan); font-family: var(--font-mono); font-size: 12px">${item.codigo}</td>
              <td style="padding: 12px; color: var(--text-primary)">${item.material}</td>
              <td style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 12px">${item.cat === 'nodo' ? 'Nodo' : 'Instalación'}</td>
              <td style="padding: 12px; text-align: center; color: var(--text-primary); font-weight: 600">${item.stock}</td>
              <td style="padding: 12px; text-align: center; color: var(--text-muted)">${item.min}</td>
              <td style="padding: 12px; text-align: center">
                <button onclick="EditarMaterialesModule.editItem(${idx})" class="btn btn-sm btn-secondary" style="font-size: 11px; padding: 4px 8px; margin-right: 4px">Editar</button>
                <button onclick="EditarMaterialesModule.deleteItem(${idx})" class="btn btn-sm btn-danger" style="font-size: 11px; padding: 4px 8px">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    document.getElementById('materiales-table').innerHTML = html;
  };

  const setupFormHandler = () => {
    const form = document.getElementById('material-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const codigo = document.getElementById('form-codigo').value;
      const material = document.getElementById('form-material').value;
      const cat = document.getElementById('form-cat').value;
      const stock = parseInt(document.getElementById('form-stock').value) || 0;
      const min = parseInt(document.getElementById('form-min').value) || 0;

      if (!codigo || !material) {
        alert('Por favor completa todos los campos');
        return;
      }

      const editingId = form.dataset.editingId;
      if (editingId !== undefined) {
        materials[editingId] = { codigo, material, cat, stock, min, unidad: 'u' };
      } else {
        materials.push({ codigo, material, cat, stock, min, unidad: 'u' });
      }

      delete form.dataset.editingId;
      MockData.stockData = JSON.parse(JSON.stringify(materials));
      closeForm();
      renderTable();
    });
  };

  const showAddForm = () => {
    document.getElementById('form-modal').style.display = 'flex';
    document.getElementById('material-form').reset();
  };

  const editItem = (idx) => {
    const item = materials[idx];
    document.getElementById('form-codigo').value = item.codigo;
    document.getElementById('form-material').value = item.material;
    document.getElementById('form-cat').value = item.cat;
    document.getElementById('form-stock').value = item.stock;
    document.getElementById('form-min').value = item.min;
    document.getElementById('material-form').dataset.editingId = idx;
    showAddForm();
  };

  const deleteItem = (idx) => {
    if (confirm('¿Estás seguro de que quieres eliminar este material?')) {
      materials.splice(idx, 1);
      MockData.stockData = JSON.parse(JSON.stringify(materials));
      renderTable();
    }
  };

  const closeForm = () => {
    document.getElementById('form-modal').style.display = 'none';
  };

  return { render, showAddForm, editItem, deleteItem, closeForm };
})();
