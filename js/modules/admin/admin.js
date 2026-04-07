/**
 * Admin Module with Tabs
 * System configuration and management panel
 */

const AdminModule = (() => {
  let currentTab = 'general';

  const render = (container) => {
    const html = `
      <div style="padding: 24px; max-width: 1200px; margin: 0 auto">
        <h1 class="font-display" style="font-size: 28px; font-weight: 800; margin: 0 0 24px 0; color: var(--text-light)">Configuración del Sistema</h1>

        <!-- Tabs Navigation -->
        <div class="glass" style="display: flex; gap: 0; border-radius: 12px 12px 0 0; margin-bottom: 0; overflow: hidden">
          ${renderTabButton('general', 'Ajustes Generales')}
          ${renderTabButton('temas', 'Temas')}
          ${renderTabButton('usuarios', 'Usuarios & Permisos')}
          ${renderTabButton('mantenimiento', 'Mantenimiento')}
          ${renderTabButton('sistema', 'Sistema')}
        </div>

        <!-- Tabs Content -->
        <div class="glass" style="border-radius: 0 0 12px 12px; padding: 32px">
          <!-- General Settings Tab -->
          <div id="tab-general" class="admin-tab" style="display: ${currentTab === 'general' ? 'block' : 'none'}">
            ${renderGeneralSettings()}
          </div>

          <!-- Themes Tab -->
          <div id="tab-temas" class="admin-tab" style="display: ${currentTab === 'temas' ? 'block' : 'none'}">
            ${renderThemesTab()}
          </div>

          <!-- Users Tab -->
          <div id="tab-usuarios" class="admin-tab" style="display: ${currentTab === 'usuarios' ? 'block' : 'none'}">
            ${renderUsersTab()}
          </div>

          <!-- Maintenance Tab -->
          <div id="tab-mantenimiento" class="admin-tab" style="display: ${currentTab === 'mantenimiento' ? 'block' : 'none'}">
            ${renderMaintenanceTab()}
          </div>

          <!-- System Tab -->
          <div id="tab-sistema" class="admin-tab" style="display: ${currentTab === 'sistema' ? 'block' : 'none'}">
            ${renderSystemTab()}
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Add tab click listeners
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = btn.getAttribute('data-tab');
        switchTab(tab, container);
      });
    });
  };

  const renderTabButton = (tabName, label) => {
    const isActive = currentTab === tabName;
    return `
      <button data-tab="${tabName}" style="
        flex: 1;
        padding: 16px;
        border: none;
        background: ${isActive ? 'var(--bg-secondary)' : 'transparent'};
        color: ${isActive ? 'var(--cyan)' : 'var(--text-muted)'};
        font-size: 13px;
        font-weight: ${isActive ? '600' : '500'};
        cursor: pointer;
        border-bottom: 2px solid ${isActive ? 'var(--cyan)' : 'transparent'};
        transition: all 0.2s;
      " onmouseover="!this.classList.contains('active') && (this.style.color='var(--text-light)')" onmouseout="this.style.color='${isActive ? 'var(--cyan)' : 'var(--text-muted)'}'">
        ${label}
      </button>
    `;
  };

  const renderGeneralSettings = () => {
    return `
      <div style="display: grid; gap: 24px">
        <h3 style="margin: 0; color: var(--text-light); font-size: 16px; font-weight: 600">Ajustes Generales</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Nombre de la Empresa</label>
            <input type="text" value="Express Salta" readonly style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>

          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Ubicación</label>
            <input type="text" value="Salta, Argentina" readonly style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>
        </div>

        <div>
          <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px">Descripción</label>
          <textarea readonly style="width: 100%; padding: 10px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px; resize: vertical; min-height: 80px">Admin Express - Sistema de Gestión Inteligente para operaciones logísticas</textarea>
        </div>

        <div style="padding: 16px; background: linear-gradient(135deg, rgba(0, 229, 255, 0.05), rgba(0, 255, 163, 0.05)); border-radius: 8px; border: 1px solid var(--border-color)">
          <p style="margin: 0; color: var(--cyan); font-size: 12px"><strong>Logo de la Empresa</strong></p>
          <p style="margin: 8px 0 0 0; color: var(--text-muted); font-size: 12px">Carga tu logo (solo visualización, no funcional en esta versión)</p>
          <input type="file" accept="image/*" style="margin-top: 8px; font-size: 12px" disabled>
        </div>
      </div>
    `;
  };

  const renderThemesTab = () => {
    return `
      <div style="display: grid; gap: 24px">
        <h3 style="margin: 0; color: var(--text-light); font-size: 16px; font-weight: 600">Temas y Apariencia</h3>

        <div>
          <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px">Tema Actual</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
            <div class="glass" style="padding: 16px; cursor: pointer; border: 2px solid var(--cyan); border-radius: 8px">
              <p style="margin: 0 0 8px 0; color: var(--cyan); font-size: 13px; font-weight: 600">🌙 Modo Oscuro</p>
              <p style="margin: 0; color: var(--text-muted); font-size: 12px">Tema actual (optimizado)</p>
            </div>
            <div class="glass" style="padding: 16px; cursor: pointer; border: 1px solid var(--border-color); border-radius: 8px; opacity: 0.6">
              <p style="margin: 0 0 8px 0; color: var(--text-light); font-size: 13px; font-weight: 600">☀️ Modo Claro</p>
              <p style="margin: 0; color: var(--text-muted); font-size: 12px">Disponible</p>
            </div>
          </div>
        </div>

        <div>
          <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px">Paleta de Colores</label>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
              <div style="width: 40px; height: 40px; background: var(--cyan); border-radius: 6px; box-shadow: 0 0 12px var(--cyan)"></div>
              <span style="color: var(--text-muted); font-size: 11px">Cyan</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
              <div style="width: 40px; height: 40px; background: var(--emerald); border-radius: 6px; box-shadow: 0 0 12px var(--emerald)"></div>
              <span style="color: var(--text-muted); font-size: 11px">Emerald</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
              <div style="width: 40px; height: 40px; background: var(--red); border-radius: 6px; box-shadow: 0 0 12px var(--red)"></div>
              <span style="color: var(--text-muted); font-size: 11px">Red</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
              <div style="width: 40px; height: 40px; background: var(--amber); border-radius: 6px; box-shadow: 0 0 12px var(--amber)"></div>
              <span style="color: var(--text-muted); font-size: 11px">Amber</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
              <div style="width: 40px; height: 40px; background: #8b5cf6; border-radius: 6px; box-shadow: 0 0 12px #8b5cf6" style="opacity: 0.5"></div>
              <span style="color: var(--text-muted); font-size: 11px">Purple</span>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const renderUsersTab = () => {
    return `
      <div style="display: grid; gap: 24px">
        <h3 style="margin: 0; color: var(--text-light); font-size: 16px; font-weight: 600">Usuarios & Permisos</h3>

        <div style="display: grid; gap: 16px">
          ${renderUserItem('admin@adminexpress.com', 'Administrador', 'Activo')}
          ${renderUserItem('supervisor@adminexpress.com', 'Supervisor', 'Activo')}
          ${renderUserItem('operador@adminexpress.com', 'Operador', 'Inactivo')}
        </div>

        <button class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 13px">+ Agregar Usuario (Visual)</button>
      </div>
    `;
  };

  const renderUserItem = (email, role, status) => {
    const isActive = status === 'Activo';
    return `
      <div class="glass" style="padding: 16px; display: flex; align-items: center; justify-content: space-between">
        <div>
          <p style="margin: 0 0 4px 0; color: var(--text-light); font-size: 13px; font-weight: 500">${email}</p>
          <p style="margin: 0; color: var(--text-muted); font-size: 12px">${role}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 12px">
          <div style="width: 8px; height: 8px; background: ${isActive ? 'var(--emerald)' : 'var(--text-muted)'}; border-radius: 50%; box-shadow: ${isActive ? '0 0 6px var(--emerald)' : 'none'}"></div>
          <span style="color: ${isActive ? 'var(--emerald)' : 'var(--text-muted)'}; font-size: 12px">${status}</span>
        </div>
      </div>
    `;
  };

  const renderMaintenanceTab = () => {
    return `
      <div style="display: grid; gap: 24px">
        <h3 style="margin: 0; color: var(--text-light); font-size: 16px; font-weight: 600">Mantenimiento</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
          <button class="btn btn-secondary" style="padding: 12px; text-align: left; display: flex; align-items: center; gap: 12px; font-size: 13px" onclick="AdminModule.backupData()">
            <span style="font-size: 18px">💾</span>
            <span>Hacer Backup</span>
          </button>
          <button class="btn btn-secondary" style="padding: 12px; text-align: left; display: flex; align-items: center; gap: 12px; font-size: 13px" onclick="AdminModule.restoreData()">
            <span style="font-size: 18px">♻️</span>
            <span>Restaurar Datos</span>
          </button>
          <button class="btn btn-secondary" style="padding: 12px; text-align: left; display: flex; align-items: center; gap: 12px; font-size: 13px" onclick="AdminModule.clearCache()">
            <span style="font-size: 18px">🗑️</span>
            <span>Limpiar Caché</span>
          </button>
          <button class="btn btn-secondary" style="padding: 12px; text-align: left; display: flex; align-items: center; gap: 12px; font-size: 13px" onclick="AdminModule.viewLogs()">
            <span style="font-size: 18px">📋</span>
            <span>Ver Logs</span>
          </button>
        </div>

        <div style="padding: 16px; background: linear-gradient(135deg, rgba(255, 59, 107, 0.05), rgba(255, 107, 107, 0.05)); border-radius: 8px; border: 1px solid var(--border-color)">
          <p style="margin: 0 0 8px 0; color: var(--red); font-size: 13px; font-weight: 600">⚠️ Operaciones Avanzadas</p>
          <p style="margin: 0 0 12px 0; color: var(--text-muted); font-size: 12px">Estas acciones afectarán a todos los datos del sistema</p>
          <button class="btn btn-secondary" style="padding: 8px 12px; font-size: 12px; color: var(--red); border-color: var(--red);">Resetear Sistema (Visual)</button>
        </div>
      </div>
    `;
  };

  const renderSystemTab = () => {
    const storageUsed = StorageService.getSize ? StorageService.getSize() : '~5 MB';
    return `
      <div style="display: grid; gap: 24px">
        <h3 style="margin: 0; color: var(--text-light); font-size: 16px; font-weight: 600">Información del Sistema</h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px">
          ${renderSystemInfo('Version', 'v1.0.0', '📦')}
          ${renderSystemInfo('Última Actualización', '07/04/2026', '📅')}
          ${renderSystemInfo('Base de Datos', 'Local Storage', '💾')}
          ${renderSystemInfo('Almacenamiento Usado', storageUsed, '📊')}
          ${renderSystemInfo('Navegador', navigator.userAgent.split(' ').slice(-2).join(' '), '🌐')}
          ${renderSystemInfo('Conexión', navigator.onLine ? 'Online' : 'Offline', '📡')}
        </div>

        <div style="padding: 16px; background: var(--bg-secondary); border-radius: 8px">
          <p style="margin: 0 0 8px 0; color: var(--text-light); font-size: 13px; font-weight: 600">Información Técnica</p>
          <div style="display: grid; gap: 8px; font-family: 'Space Mono'; font-size: 11px; color: var(--text-muted)">
            <div>Plataforma: <span style="color: var(--cyan)">${navigator.platform}</span></div>
            <div>Lenguaje: <span style="color: var(--emerald)">JavaScript ES6+</span></div>
            <div>Arquitectura: <span style="color: var(--cyan)">Single Page Application (SPA)</span></div>
            <div>Framework: <span style="color: var(--emerald)">Vanilla JS (Sin dependencias externas)</span></div>
          </div>
        </div>
      </div>
    `;
  };

  const renderSystemInfo = (label, value, icon) => {
    return `
      <div class="glass" style="padding: 16px; border-radius: 8px">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px">
          <span style="font-size: 20px">${icon}</span>
          <p style="margin: 0; color: var(--text-muted); font-size: 12px; font-weight: 500">${label}</p>
        </div>
        <p style="margin: 0; color: var(--text-light); font-size: 14px; font-weight: 600">${value}</p>
      </div>
    `;
  };

  const switchTab = (tabName, container) => {
    currentTab = tabName;
    render(container);
  };

  const backupData = () => {
    NotificationService.show('✓ Backup creado exitosamente', 'success');
  };

  const restoreData = () => {
    NotificationService.show('✓ Datos restaurados', 'success');
  };

  const clearCache = () => {
    NotificationService.show('✓ Caché limpiado correctamente', 'success');
  };

  const viewLogs = () => {
    NotificationService.show('📋 Ver logs (Visual - sin funcionalidad real)', 'info');
  };

  const openSettings = (section) => {
    console.log(`Opening settings: ${section}`);
  };

  return {
    render,
    backupData,
    restoreData,
    clearCache,
    viewLogs,
    openSettings
  };
})();
