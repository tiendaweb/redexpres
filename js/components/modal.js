/**
 * Modal Component - Modal genérico reutilizable
 */

const Modal = (() => {
  let currentModal = null;

  const show = (config) => {
    const { title = 'Modal', content = '', buttons = [], size = 'md' } = config;

    // Crear backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: var(--z-modal-backdrop);
      animation: fadeIn 0.2s ease-out;
    `;

    // Crear modal
    const modal = document.createElement('div');
    modal.className = `modal modal-${size}`;
    modal.style.cssText = `
      position: fixed;
      inset: 50%;
      transform: translate(-50%, -50%);
      background: var(--bg-panel);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      z-index: var(--z-modal);
      width: ${size === 'sm' ? '400px' : size === 'md' ? '600px' : '800px'};
      max-height: 80vh;
      overflow: auto;
      animation: slideUp 0.3s ease-out;
      box-shadow: var(--shadow-xl);
    `;

    // Encabezado
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.style.cssText = `
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--border-primary);
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    header.innerHTML = `
      <h3 style="margin: 0; font-size: 1.5rem;">${title}</h3>
      <button style="background: none; border: none; cursor: pointer; font-size: 1.5rem; color: var(--text-muted);">×</button>
    `;
    header.querySelector('button').addEventListener('click', close);

    // Body
    const body = document.createElement('div');
    body.className = 'modal-body';
    body.style.cssText = `
      padding: var(--spacing-lg);
    `;
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else {
      body.appendChild(content);
    }

    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    footer.style.cssText = `
      padding: var(--spacing-lg);
      border-top: 1px solid var(--border-primary);
      display: flex;
      gap: var(--spacing-md);
      justify-content: flex-end;
    `;

    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn.text;
      button.className = `btn ${btn.class || 'btn-secondary'}`;
      button.addEventListener('click', btn.action);
      footer.appendChild(button);
    });

    // Armando modal
    modal.appendChild(header);
    modal.appendChild(body);
    if (buttons.length > 0) {
      modal.appendChild(footer);
    }

    // Agregar al DOM
    const container = document.getElementById('modal-container');
    container.appendChild(backdrop);
    container.appendChild(modal);

    currentModal = { backdrop, modal };

    // Cerrar al clickear backdrop
    backdrop.addEventListener('click', close);

    // ESC para cerrar
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', onKeyDown);
      }
    };
    document.addEventListener('keydown', onKeyDown);
  };

  const close = () => {
    if (currentModal) {
      currentModal.modal.style.animation = 'slideDown 0.3s ease-out forwards';
      currentModal.backdrop.style.animation = 'fadeOut 0.2s ease-out forwards';

      setTimeout(() => {
        currentModal.modal.remove();
        currentModal.backdrop.remove();
        currentModal = null;
      }, 300);
    }
  };

  return {
    show,
    close
  };
})();

// Agregar animaciones
const modalStyle = document.createElement('style');
modalStyle.innerHTML = `
  @keyframes slideUp {
    from {
      transform: translate(-50%, -45%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -45%);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
document.head.appendChild(modalStyle);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Modal;
}
