/**
 * Form Component - Formulario genérico con validación
 */

const Form = (() => {
  const create = (config) => {
    const {
      fields = [],
      onSubmit = null,
      onCancel = null,
      submitText = 'Guardar',
      cancelText = 'Cancelar'
    } = config;

    // Crear contenedor
    const form = document.createElement('form');
    form.style.cssText = 'width: 100%;';

    // Campos
    const fieldElements = {};

    fields.forEach(field => {
      const group = document.createElement('div');
      group.className = 'form-group';

      // Label
      if (field.label) {
        const label = document.createElement('label');
        label.textContent = field.label;
        label.htmlFor = field.name;
        group.appendChild(label);
      }

      // Input
      let input;
      switch (field.type) {
        case 'textarea':
          input = document.createElement('textarea');
          input.rows = field.rows || 4;
          break;

        case 'select':
          input = document.createElement('select');
          if (field.options) {
            field.options.forEach(opt => {
              const option = document.createElement('option');
              option.value = opt.value;
              option.textContent = opt.label;
              input.appendChild(option);
            });
          }
          break;

        case 'checkbox':
          input = document.createElement('input');
          input.type = 'checkbox';
          input.style.cssText = 'width: auto; margin-right: 0.5rem;';
          break;

        case 'radio':
          input = document.createElement('div');
          input.style.cssText = 'display: flex; gap: 1rem;';
          if (field.options) {
            field.options.forEach(opt => {
              const label = document.createElement('label');
              label.style.cssText = 'display: flex; align-items: center; gap: 0.5rem; cursor: pointer;';
              const radio = document.createElement('input');
              radio.type = 'radio';
              radio.name = field.name;
              radio.value = opt.value;
              label.appendChild(radio);
              label.appendChild(document.createTextNode(opt.label));
              input.appendChild(label);
            });
          }
          break;

        default:
          input = document.createElement('input');
          input.type = field.type || 'text';
      }

      input.name = field.name;
      input.id = field.name;
      input.placeholder = field.placeholder || '';
      input.required = field.required || false;
      input.disabled = field.disabled || false;

      if (field.value) {
        input.value = field.value;
      }

      fieldElements[field.name] = input;
      group.appendChild(input);

      // Helper text
      if (field.helper) {
        const small = document.createElement('small');
        small.textContent = field.helper;
        group.appendChild(small);
      }

      form.appendChild(group);
    });

    // Buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.style.cssText = 'display: flex; gap: var(--spacing-md); margin-top: var(--spacing-lg);';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-primary btn-lg flex-1';
    submitBtn.textContent = submitText;

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn btn-secondary btn-lg flex-1';
    cancelBtn.textContent = cancelText;
    cancelBtn.addEventListener('click', onCancel);

    buttonGroup.appendChild(submitBtn);
    buttonGroup.appendChild(cancelBtn);
    form.appendChild(buttonGroup);

    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Recolectar datos
      const formData = new FormData(form);
      const datos = Object.fromEntries(formData);

      // Validar
      const validationResult = validateForm(fields, datos);
      if (!validationResult.valid) {
        showValidationErrors(form, validationResult.errors);
        return;
      }

      // Llamar onSubmit
      if (onSubmit) {
        onSubmit(datos);
      }
    });

    return form;
  };

  const validateForm = (fields, datos) => {
    const errors = {};

    fields.forEach(field => {
      const valor = datos[field.name];

      // Requerido
      if (field.required && !valor) {
        errors[field.name] = `${field.label || field.name} es requerido`;
      }

      // Validadores custom
      if (field.validate && typeof field.validate === 'function') {
        const error = field.validate(valor);
        if (error) {
          errors[field.name] = error;
        }
      }
    });

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  };

  const showValidationErrors = (form, errors) => {
    // Remover errores previos
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Mostrar nuevos errores
    Object.entries(errors).forEach(([fieldName, mensaje]) => {
      const group = form.querySelector(`[name="${fieldName}"]`)?.closest('.form-group');
      if (group) {
        group.classList.add('error');
        let errorEl = group.querySelector('small.error-message');
        if (!errorEl) {
          errorEl = document.createElement('small');
          errorEl.className = 'error-message';
          group.appendChild(errorEl);
        }
        errorEl.textContent = mensaje;
      }
    });

    NotificationService.error('Por favor, corrija los errores en el formulario');
  };

  return {
    create,
    validateForm
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Form;
}
