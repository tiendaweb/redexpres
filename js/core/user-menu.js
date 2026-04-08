/**
 * User Menu Module
 * Handles user dropdown menu, profile, IA providers, and presupuesto navigation
 */

const UserMenu = (() => {
  const menuToggle = document.getElementById('user-menu-toggle');
  const menuDropdown = document.getElementById('user-menu-dropdown');
  const menuLinks = document.querySelectorAll('[data-menu]');

  const init = () => {
    if (!menuToggle || !menuDropdown) return;

    // Toggle dropdown on button click
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuDropdown.style.display = menuDropdown.style.display === 'none' ? 'flex' : 'none';
    });

    // Handle menu item clicks
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const menu = link.getAttribute('data-menu');
        handleMenuAction(menu);
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!document.getElementById('user-menu-container').contains(e.target)) {
        menuDropdown.style.display = 'none';
      }
    });
  };

  const handleMenuAction = (menu) => {
    menuDropdown.style.display = 'none';

    if (menu === 'perfil') {
      showPerfilModal();
    } else if (menu === 'ia-providers') {
      showIAProvidersModal();
    } else if (menu === 'presupuesto') {
      Router.navigate('presupuesto');
    }
  };

  const showPerfilModal = () => {
    const userData = StateManager.getState('user') || {
      id: 'USR001',
      nombre: 'Usuario Admin',
      email: 'admin@adminexpress.com',
      rol: 'Administrador',
      empresa: 'Express Salta',
      telefono: '+54 387 123 4567',
      activo: true
    };

    const modalContent = `
      <div style="padding: 24px; min-width: 400px">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color)">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--cyan), var(--emerald)); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold">👤</div>
          <div>
            <h3 style="margin: 0; color: var(--text-light); font-size: 16px; font-weight: 600">${userData.nombre}</h3>
            <p style="margin: 4px 0 0 0; color: var(--text-muted); font-size: 12px">${userData.rol}</p>
          </div>
        </div>

        <div style="display: grid; gap: 16px">
          <div>
            <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">Email</label>
            <input type="email" value="${userData.email}" readonly style="width: 100%; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
            <div>
              <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">Teléfono</label>
              <input type="tel" value="${userData.telefono}" readonly style="width: 100%; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
            </div>
            <div>
              <label style="display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">Empresa</label>
              <input type="text" value="${userData.empresa}" readonly style="width: 100%; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-light); font-size: 13px">
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg-secondary); border-radius: 6px">
            <label style="color: var(--text-light); font-size: 13px">Estado: Activo</label>
            <div style="width: 8px; height: 8px; background: var(--emerald); border-radius: 50%; box-shadow: 0 0 6px var(--emerald)"></div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 24px; justify-content: flex-end">
          <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))">Cerrar</button>
        </div>
      </div>
    `;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `<div class="glass" style="border-radius: 12px; max-width: 500px">${modalContent}</div>`;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.parentElement.removeChild(modal);
      }
    });

    document.body.appendChild(modal);
  };

  const showIAProvidersModal = () => {
    const providers = [
      { name: 'OpenAI', status: 'Activo', icon: '🤖' },
      { name: 'Anthropic', status: 'Activo', icon: '🧠' },
      { name: 'Google AI', status: 'Inactivo', icon: '📊' },
      { name: 'Azure OpenAI', status: 'Activo', icon: '☁️' }
    ];

    const providersList = providers.map(p => `
      <div style="padding: 12px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color)">
        <div style="display: flex; align-items: center; gap: 12px">
          <span style="font-size: 20px">${p.icon}</span>
          <div>
            <div style="color: var(--text-light); font-size: 13px; font-weight: 500">${p.name}</div>
            <div style="color: var(--text-muted); font-size: 11px">${p.status}</div>
          </div>
        </div>
        <div style="width: 8px; height: 8px; background: ${p.status === 'Activo' ? 'var(--emerald)' : 'var(--text-muted)'}; border-radius: 50%; box-shadow: ${p.status === 'Activo' ? '0 0 6px var(--emerald)' : 'none'}"></div>
      </div>
    `).join('');

    const modalContent = `
      <div style="padding: 24px; min-width: 450px">
        <h3 style="margin: 0 0 16px 0; color: var(--text-light); font-size: 16px; font-weight: 600">Proveedores de IA Disponibles</h3>
        <p style="margin: 0 0 16px 0; color: var(--text-muted); font-size: 12px">Estos son los proveedores de inteligencia artificial que puedes integrar con Admin Express</p>

        <div class="glass" style="border-radius: 8px; overflow: hidden; margin-bottom: 24px">
          ${providersList}
        </div>

        <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px; margin-bottom: 24px">
          <p style="margin: 0; color: var(--text-light); font-size: 12px">
            <strong>Nota:</strong> Para integrar nuevos proveedores, contacta con el equipo de soporte.
          </p>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end">
          <button class="btn btn-secondary" onclick="this.closest('[role=dialog]').parentElement.removeChild(this.closest('[role=dialog]'))">Cerrar</button>
        </div>
      </div>
    `;

    const modal = document.createElement('div');
    modal.role = 'dialog';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000';
    modal.innerHTML = `<div class="glass" style="border-radius: 12px; max-width: 500px">${modalContent}</div>`;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.parentElement.removeChild(modal);
      }
    });

    document.body.appendChild(modal);
  };

  return {
    init
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', UserMenu.init);
} else {
  UserMenu.init();
}
