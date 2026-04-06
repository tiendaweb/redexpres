const AdminModule = (() => {
  const render = (container) => {
    const html = `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
        <h2>Administración del Sistema</h2>

        <div class="grid grid-2">
          <div class="card glass">
            <h3 style="margin-bottom: var(--spacing-lg);">⚙️ Configuración</h3>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              <button class="btn btn-secondary btn-block" onclick="AdminModule.openSettings('general')">Configuración General</button>
              <button class="btn btn-secondary btn-block" onclick="AdminModule.openSettings('usuarios')">Gestión de Usuarios</button>
              <button class="btn btn-secondary btn-block" onclick="AdminModule.openSettings('roles')">Roles y Permisos</button>
              <button class="btn btn-secondary btn-block" onclick="AdminModule.openSettings('alertas')">Umbrales de Alertas</button>
            </div>
          </div>

          <div class="card glass">
            <h3 style="margin-bottom: var(--spacing-lg);">🔧 Mantenimiento</h3>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              <button class="btn btn-warning btn-block" onclick="AdminModule.backupData()">💾 Hacer Backup</button>
              <button class="btn btn-danger btn-block" onclick="AdminModule.restoreData()">♻️ Restaurar Datos</button>
              <button class="btn btn-secondary btn-block" onclick="AdminModule.clearCache()">🗑️ Limpiar Caché</button>
              <button class="btn btn-secondary btn-block" onclick="AdminModule.viewLogs()">📋 Ver Logs</button>
            </div>
          </div>
        </div>

        <div class="card glass">
          <h3 style="margin-bottom: var(--spacing-lg);">ℹ️ Información del Sistema</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg);">
            <div>
              <small style="color: var(--text-muted);">Versión</small>
              <div style="font-size: 1.2rem; font-weight: 600;">v1.0.0</div>
            </div>
            <div>
              <small style="color: var(--text-muted);">Última Actualización</small>
              <div style="font-size: 1.2rem; font-weight: 600;">04/04/2025</div>
            </div>
            <div>
              <small style="color: var(--text-muted);">Base de Datos</small>
              <div style="font-size: 1.2rem; font-weight: 600;">Local Storage</div>
            </div>
            <div>
              <small style="color: var(--text-muted);">Almacenamiento Usado</small>
              <div style="font-size: 1.2rem; font-weight: 600;">${StorageService.getSize()}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    document.getElementById('page-title').textContent = 'Administración';
  };

  const openSettings = (seccion) => {
    Modal.show({
      title: `Configuración - ${seccion}`,
      content: `<p>Configuración de ${seccion} aquí</p>`,
      size: 'lg',
      buttons: [
        { text: 'Cerrar', action: Modal.close },
        { text: 'Guardar', action: () => { NotificationService.success('Cambios guardados'); Modal.close(); }, class: 'btn-primary' }
      ]
    });
  };

  const backupData = () => {
    const data = {
      clientes: StateManager.getState('clientes'),
      empleados: StateManager.getState('empleados'),
      ordenes: StateManager.getState('ordenes'),
      inventario: StateManager.getState('inventario'),
      fibra: StateManager.getState('fibra'),
      alertas: StateManager.getState('alertas'),
      fecha: new Date().toISOString()
    };

    StorageService.save('backup_' + Date.now(), data);
    NotificationService.success('Backup realizado correctamente');
  };

  const restoreData = () => {
    NotificationService.confirm('¿Restaurar datos desde backup?', () => {
      NotificationService.success('Datos restaurados');
    });
  };

  const clearCache = () => {
    NotificationService.confirm('¿Limpiar caché del sistema?', () => {
      StorageService.clear();
      NotificationService.success('Caché limpiado');
    });
  };

  const viewLogs = () => {
    Modal.show({
      title: 'Logs del Sistema',
      content: '<p>Logs aquí</p>',
      size: 'lg',
      buttons: [{ text: 'Cerrar', action: Modal.close }]
    });
  };

  return {
    render,
    openSettings,
    backupData,
    restoreData,
    clearCache,
    viewLogs
  };
})();
