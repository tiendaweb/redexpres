/**
 * Configuración Module
 * Application settings and preferences
 */

const ConfiguracionModule = (() => {
  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            <span class="text-cyan">Configuración</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Ajustes y preferencias de la aplicación</p>
        </div>

        <!-- COMPANY SETTINGS -->
        <div class="col-12 glass fade-up delay-2" style="padding: 24px; margin-bottom: 16px">
          <h3 style="margin-bottom: 16px; font-weight: 600; font-size: 16px">Información de la Empresa</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px">
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px">Nombre de la Empresa</label>
              <input type="text" id="company-name" value="Express Salta" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
            </div>
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px">Ubicación</label>
              <input type="text" id="company-location" value="Salta, Argentina" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
            </div>
          </div>
          <div>
            <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px">Teléfono de Contacto</label>
            <input type="tel" id="company-phone" value="+54 387 123-4567" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
          </div>
        </div>

        <!-- INVENTORY SETTINGS -->
        <div class="col-12 glass fade-up delay-2" style="padding: 24px; margin-bottom: 16px">
          <h3 style="margin-bottom: 16px; font-weight: 600; font-size: 16px">Configuración de Inventario</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px">Código de Moneda</label>
              <select id="currency-code" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
                <option value="ARS">ARS - Peso Argentino</option>
                <option value="USD">USD - Dólar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px">Unidad por Defecto</label>
              <input type="text" id="default-unit" value="u" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
            </div>
          </div>
        </div>

        <!-- NOTIFICATION SETTINGS -->
        <div class="col-12 glass fade-up delay-2" style="padding: 24px; margin-bottom: 16px">
          <h3 style="margin-bottom: 16px; font-weight: 600; font-size: 16px">Notificaciones</h3>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer">
              <input type="checkbox" id="notify-low-stock" checked style="width: 18px; height: 18px">
              <span style="color: var(--text-muted); font-size: 13px">Notificar cuando el stock esté bajo</span>
            </label>
            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer">
              <input type="checkbox" id="notify-critical" checked style="width: 18px; height: 18px">
              <span style="color: var(--text-muted); font-size: 13px">Notificar alertas críticas</span>
            </label>
            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer">
              <input type="checkbox" id="notify-movements" checked style="width: 18px; height: 18px">
              <span style="color: var(--text-muted); font-size: 13px">Notificar movimientos de inventario</span>
            </label>
          </div>
        </div>

        <!-- APPEARANCE SETTINGS -->
        <div class="col-12 glass fade-up delay-2" style="padding: 24px; margin-bottom: 16px">
          <h3 style="margin-bottom: 16px; font-weight: 600; font-size: 16px">Apariencia</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px">
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px">Tema</label>
              <select id="theme-select" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)" onchange="ConfiguracionModule.changeTheme(this.value)">
                <option value="dark">Oscuro (Dark)</option>
                <option value="light">Claro (Light)</option>
              </select>
            </div>
            <div>
              <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px">Tamaño de Fuente</label>
              <select id="font-size" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-base); color: var(--text-primary)">
                <option value="small">Pequeño</option>
                <option value="medium" selected>Medio</option>
                <option value="large">Grande</option>
              </select>
            </div>
          </div>
        </div>

        <!-- DANGER ZONE -->
        <div class="col-12 glass fade-up delay-2" style="padding: 24px; border-left: 4px solid var(--red)">
          <h3 style="margin-bottom: 16px; font-weight: 600; font-size: 16px; color: var(--red)">Zona de Peligro</h3>
          <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 12px">Acciones irreversibles</p>
          <button onclick="ConfiguracionModule.resetData()" class="btn btn-danger" style="padding: 10px 16px">Restablecer Todos los Datos</button>
        </div>

        <!-- SAVE BUTTON -->
        <div style="display: flex; gap: 12px; margin-top: 24px">
          <button onclick="ConfiguracionModule.saveSettings()" class="btn btn-primary" style="padding: 12px 24px; flex: 1">Guardar Cambios</button>
          <button onclick="ConfiguracionModule.resetForm()" class="btn btn-secondary" style="padding: 12px 24px">Cancelar</button>
        </div>
      </div>
    `;

    container.innerHTML = html;
    loadSettings();
  };

  const loadSettings = () => {
    const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
    document.getElementById('company-name').value = settings.companyName || 'Express Salta';
    document.getElementById('company-location').value = settings.companyLocation || 'Salta, Argentina';
    document.getElementById('company-phone').value = settings.companyPhone || '+54 387 123-4567';
    document.getElementById('currency-code').value = settings.currencyCode || 'ARS';
    document.getElementById('default-unit').value = settings.defaultUnit || 'u';
    document.getElementById('notify-low-stock').checked = settings.notifyLowStock !== false;
    document.getElementById('notify-critical').checked = settings.notifyCritical !== false;
    document.getElementById('notify-movements').checked = settings.notifyMovements !== false;
    document.getElementById('theme-select').value = document.documentElement.getAttribute('data-theme') || 'dark';
    document.getElementById('font-size').value = settings.fontSize || 'medium';
  };

  const saveSettings = () => {
    const settings = {
      companyName: document.getElementById('company-name').value,
      companyLocation: document.getElementById('company-location').value,
      companyPhone: document.getElementById('company-phone').value,
      currencyCode: document.getElementById('currency-code').value,
      defaultUnit: document.getElementById('default-unit').value,
      notifyLowStock: document.getElementById('notify-low-stock').checked,
      notifyCritical: document.getElementById('notify-critical').checked,
      notifyMovements: document.getElementById('notify-movements').checked,
      fontSize: document.getElementById('font-size').value,
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));
    alert('Configuración guardada correctamente');
  };

  const changeTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    ThemeManager.set(theme);
  };

  const resetForm = () => {
    loadSettings();
  };

  const resetData = () => {
    if (confirm('⚠️ ADVERTENCIA: Esto eliminará TODOS los datos personalizados.\n\n¿Estás completamente seguro?')) {
      if (confirm('Última confirmación: ¿Quieres continuar?')) {
        localStorage.clear();
        location.reload();
      }
    }
  };

  return { render, changeTheme, saveSettings, resetForm, resetData };
})();
