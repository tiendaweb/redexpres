/**
 * Notification Service - Sistema de notificaciones
 * Muestra toasts y alertas en la UI
 */

const NotificationService = (() => {
  const CONTAINER_ID = 'notifications-container';

  const createNotification = (mensaje, tipo = 'info', duracion = 3000) => {
    const id = Date.now();
    const container = document.getElementById(CONTAINER_ID);

    // Crear elemento
    const el = document.createElement('div');
    el.id = `notif-${id}`;
    el.className = `alert alert-${tipo}`;
    el.style.cssText = `
      animation: slideIn 0.3s ease-out;
      max-width: 400px;
      font-weight: 500;
    `;

    // Contenido
    const icon = {
      success: '✓',
      error: '✕',
      warning: '!',
      info: 'ⓘ'
    }[tipo] || '•';

    el.innerHTML = `
      <span>${icon}</span>
      <span>${mensaje}</span>
      <button style="background: none; border: none; cursor: pointer; color: inherit; padding: 0; font-size: 1rem;" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(el);

    // Auto-remover
    if (duracion) {
      setTimeout(() => {
        el.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => el.remove(), 300);
      }, duracion);
    }

    return id;
  };

  // Métodos públicos
  const show = (mensaje, tipo = 'info', duracion = 3000) => {
    return createNotification(mensaje, tipo, duracion);
  };

  const success = (mensaje, duracion = 3000) => {
    StateManager.addNotification(mensaje, 'success', duracion);
    return createNotification(mensaje, 'success', duracion);
  };

  const error = (mensaje, duracion = 4000) => {
    StateManager.addNotification(mensaje, 'error', duracion);
    return createNotification(mensaje, 'error', duracion);
  };

  const warning = (mensaje, duracion = 3000) => {
    StateManager.addNotification(mensaje, 'warning', duracion);
    return createNotification(mensaje, 'warning', duracion);
  };

  const info = (mensaje, duracion = 3000) => {
    StateManager.addNotification(mensaje, 'info', duracion);
    return createNotification(mensaje, 'info', duracion);
  };

  // Confirmar
  const confirm = (mensaje, onConfirm, onCancel) => {
    return Modal.show({
      title: 'Confirmar',
      content: `<p>${mensaje}</p>`,
      buttons: [
        { text: 'Cancelar', action: () => { Modal.close(); if (onCancel) onCancel(); } },
        { text: 'Confirmar', action: () => { Modal.close(); if (onConfirm) onConfirm(); }, class: 'btn-danger' }
      ]
    });
  };

  // Prompt
  const prompt = (mensaje, onSubmit, defaultValue = '') => {
    return Modal.show({
      title: 'Ingrese un valor',
      content: `<p>${mensaje}</p><input type="text" id="prompt-input" class="form-group" value="${defaultValue}" style="width: 100%;" />`,
      buttons: [
        { text: 'Cancelar', action: () => Modal.close() },
        { text: 'OK', action: () => { const valor = document.getElementById('prompt-input').value; Modal.close(); if (onSubmit) onSubmit(valor); }, class: 'btn-primary' }
      ]
    });
  };

  return {
    show,
    success,
    error,
    warning,
    info,
    confirm,
    prompt
  };
})();

// Agregar animaciones
const style = document.createElement('style');
style.innerHTML = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotificationService;
}
