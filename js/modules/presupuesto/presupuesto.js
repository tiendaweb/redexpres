/**
 * Presupuesto Module
 * Budget/Quote system for Admin Express with 5 service packages
 */

const PresupuestoModule = (() => {
  const packages = [
    {
      id: 'gestión-inventario',
      title: 'Núcleo de Inventario Maestro',
      description: 'Base de datos centralizada para depósitos de Obra e Instalación. Alertas de stock crítico y buscador inteligente con IA',
      icon: '📦',
      features: [
        'Stock en tiempo real',
        'Alertas de bajo inventario',
        'Historial de movimientos',
        'Reportes automáticos'
      ],
      savings: 'Reduce 40% de tiempo en control',
      price: 350000
    },
    {
      id: 'instalaciones',
      title: 'Gestión de Instalaciones',
      description: 'Balance de consumo técnico domiciliario. Trazabilidad por orden de servicio y material en calle',
      icon: '🏗️',
      features: [
        'Creación de órdenes',
        'Asignación de técnicos',
        'Importación desde CSV',
        'Seguimiento en vivo'
      ],
      savings: '60% más rápido que procesos manuales',
      price: 180000
    },
    {
      id: 'tecnicos',
      title: 'Logística de Obras & Nodos',
      description: 'Procesamiento de certificaciones de obra (Nodos). Cálculo de tendido de fibra, herrajes y materiales de red',
      icon: '👨‍🔧',
      features: [
        'Perfiles de técnicos',
        'Asignación de equipos',
        'Disponibilidad en tiempo real',
        'Historial de trabajos'
      ],
      savings: 'Optimiza rutas en 50%',
      price: 180000
    },
    {
      id: 'movimientos',
      title: 'Bajas & Recupero de Equipos',
      description: 'Módulo de logística inversa para desconexiones. Control de números de serie y estado de equipos recuperados',
      icon: '↔️',
      features: [
        'Ingresos y egresos',
        'Trazabilidad completa',
        'Auditoría de cambios',
        'Reportes detallados'
      ],
      savings: 'Trazabilidad en tiempo real',
      price: 180000
    },
    {
      id: 'alertas',
      title: 'Escaneo Inteligente con IA',
      description: 'Módulo con Inteligencia Artificial para lectura automática de remitos y PDF. Incluye acceso a API con tokens mensuales',
      icon: '🔔',
      features: [
        'Alertas en tiempo real',
        'Reportes automáticos',
        'Análisis de datos',
        'Exportación en múltiples formatos'
      ],
      savings: 'Prevención de problemas 100%',
      price: 180000
    }
  ];

  let selectedPackages = new Set();

  const render = (container) => {
    const html = `
      <div style="padding: 24px; max-width: 1400px; margin: 0 auto">
        <!-- Hero Section -->
        <div style="margin-bottom: 48px; text-align: center; padding: 24px; background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(0, 255, 163, 0.1)); border-radius: 12px; border: 1px solid var(--border-color)">
          <h1 class="font-display" style="font-size: 32px; font-weight: 800; margin: 0 0 12px 0; color: var(--text-light)">Presupuesta tu Solución</h1>
          <p style="margin: 0 0 8px 0; color: var(--text-muted); font-size: 14px">Conoce el costo de implementar cada módulo de Admin Express</p>
          <p style="margin: 0; color: var(--text-muted); font-size: 13px">Express Salta - Soluciones de Gestión Inteligente</p>
        </div>

        <!-- Services Grid -->
        <div style="margin-bottom: 48px">
          <h2 class="font-display" style="font-size: 20px; font-weight: 700; margin: 0 0 24px 0; color: var(--text-light)">Nuestros Servicios</h2>
          <div id="packages-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px">
            ${packages.map(pkg => renderPackageCard(pkg)).join('')}
          </div>
        </div>

        <!-- Pricing Section -->
        <div style="margin-bottom: 48px; padding: 32px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border-color)">
          <h2 class="font-display" style="font-size: 20px; font-weight: 700; margin: 0 0 24px 0; color: var(--text-light)">Opciones de Trabajo</h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px">
            <!-- Single Payment -->
            <div class="glass" style="padding: 20px; border-radius: 12px">
              <h3 style="margin: 0 0 8px 0; color: var(--cyan); font-size: 16px; font-weight: 600">💰 Pago Único</h3>
              <p style="margin: 0 0 16px 0; color: var(--text-muted); font-size: 12px">Propiedad total del proyecto</p>

              <div style="background: var(--bg-primary); padding: 16px; border-radius: 8px; margin-bottom: 16px">
                <p style="margin: 0 0 4px 0; color: var(--text-muted); font-size: 11px; text-transform: uppercase">Precio Total</p>
                <div style="display: flex; align-items: baseline; gap: 8px">
                  <span class="text-cyan" style="font-size: 28px; font-weight: 700; font-family: 'Space Mono'" id="total-pago-unico">$1.000.000</span>
                  <span style="color: var(--text-muted); font-size: 12px">ARS</span>
                </div>
              </div>

              <ul style="margin: 0; padding: 0; list-style: none; font-size: 12px; color: var(--text-light); line-height: 1.8">
                <li style="margin-bottom: 8px">✓ Eres dueño del código</li>
                <li style="margin-bottom: 8px">✓ Sin costos recurrentes</li>
                <li style="margin-bottom: 8px">✓ Implementación 4-6 semanas</li>
                <li style="margin-bottom: 8px">✓ Documentación completa</li>
              </ul>

              <button class="btn btn-primary" style="width: 100%; margin-top: 16px; font-size: 12px" onclick="PresupuestoModule.solicitarPresupuesto('pago-unico')">Solicitar Presupuesto</button>
            </div>

            <!-- Membership -->
            <div class="glass" style="padding: 20px; border-radius: 12px">
              <h3 style="margin: 0 0 8px 0; color: var(--emerald); font-size: 16px; font-weight: 600">🔄 Membresía Mensual</h3>
              <p style="margin: 0 0 16px 0; color: var(--text-muted); font-size: 12px">Incluye actualizaciones y soporte</p>

              <div style="background: var(--bg-primary); padding: 16px; border-radius: 8px; margin-bottom: 16px">
                <p style="margin: 0 0 4px 0; color: var(--text-muted); font-size: 11px; text-transform: uppercase">Costo Mensual</p>
                <div style="display: flex; align-items: baseline; gap: 8px">
                  <span class="text-emerald" style="font-size: 28px; font-weight: 700; font-family: 'Space Mono'" id="total-suscripcion">$500.000</span>
                  <span style="color: var(--text-muted); font-size: 12px">ARS/mes</span>
                </div>
                <p style="margin: 8px 0 0 0; color: var(--text-muted); font-size: 11px">Mes 1: $400.000 + $100.000 por módulos</p>
              </div>

              <ul style="margin: 0; padding: 0; list-style: none; font-size: 12px; color: var(--text-light); line-height: 1.8">
                <li style="margin-bottom: 8px">✓ Actualizaciones continuas</li>
                <li style="margin-bottom: 8px">✓ Soporte 24/7</li>
                <li style="margin-bottom: 8px">✓ Nuevas features automáticas</li>
                <li style="margin-bottom: 8px">✓ Hosting incluido</li>
              </ul>

              <button class="btn btn-primary" style="width: 100%; margin-top: 16px; font-size: 12px; background: var(--emerald)" onclick="PresupuestoModule.solicitarPresupuesto('suscripcion')">Solicitar Membresía</button>
            </div>
          </div>

          <p style="margin: 0; color: var(--text-muted); font-size: 12px; text-align: center">* Precios en Pesos Argentinos (ARS). Contacta para cotización en otras monedas.</p>
        </div>

        <!-- Time Savings Section -->
        <div style="margin-bottom: 48px; padding: 32px; background: linear-gradient(135deg, rgba(0, 229, 255, 0.05), rgba(0, 255, 163, 0.05)); border: 1px solid var(--border-color); border-radius: 12px">
          <h2 class="font-display" style="font-size: 20px; font-weight: 700; margin: 0 0 24px 0; color: var(--text-light)">Con Admin Express Ahorras Tiempo</h2>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px">
            ${renderSavingsCard('Gestión de Órdenes', '8 horas', '2 horas', '75%')}
            ${renderSavingsCard('Control de Inventario', '6 horas', '1.5 horas', '75%')}
            ${renderSavingsCard('Reportes Manuales', '4 horas', '15 minutos', '94%')}
            ${renderSavingsCard('Asignación de Técnicos', '3 horas', '30 minutos', '83%')}
          </div>

          <div style="margin-top: 24px; padding: 16px; background: var(--bg-secondary); border-radius: 8px">
            <p style="margin: 0; color: var(--text-light); font-size: 13px">
              <strong>Cálculo Annual:</strong> Procesando 100 órdenes/mes, ahorras <span class="text-cyan" style="font-weight: 700">~480 horas/año</span>
              (equivalente a <span class="text-emerald" style="font-weight: 700">2 técnicos trabajando 4 meses</span>)
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap">
          <button class="btn btn-primary" style="padding: 12px 24px" onclick="PresupuestoModule.contactarVentas()">📞 Contactar Ventas</button>
          <button class="btn btn-secondary" style="padding: 12px 24px" onclick="Router.navigate('dashboard')">← Volver al Dashboard</button>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Add event listeners for checkboxes
    document.querySelectorAll('[data-package-checkbox]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const pkgId = e.target.getAttribute('data-package-checkbox');
        if (e.target.checked) {
          selectedPackages.add(pkgId);
        } else {
          selectedPackages.delete(pkgId);
        }
        updatePricing();
      });
    });
  };

  const renderPackageCard = (pkg) => {
    const featuresList = pkg.features.map(f => `<li style="margin-bottom: 6px; color: var(--text-light); font-size: 12px">✓ ${f}</li>`).join('');

    return `
      <div class="glass" style="padding: 20px; border-radius: 12px; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; position: relative"
           onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 24px rgba(0, 229, 255, 0.1)'"
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow=''">

        <!-- Checkbox -->
        <div style="position: absolute; top: 16px; right: 16px">
          <input type="checkbox" data-package-checkbox="${pkg.id}" style="width: 18px; height: 18px; cursor: pointer">
        </div>

        <!-- Icon & Title -->
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px">
          <div style="font-size: 28px">${pkg.icon}</div>
          <h3 style="margin: 0; color: var(--text-light); font-size: 14px; font-weight: 600; flex: 1">${pkg.title}</h3>
        </div>

        <!-- Description -->
        <p style="margin: 0 0 12px 0; color: var(--text-muted); font-size: 12px">${pkg.description}</p>

        <!-- Features -->
        <ul style="margin: 0 0 12px 0; padding: 0; list-style: none; flex: 1">
          ${featuresList}
        </ul>

        <!-- Savings -->
        <div style="padding: 8px 12px; background: var(--bg-primary); border-radius: 6px; margin-bottom: 12px">
          <p style="margin: 0; color: var(--emerald); font-size: 12px; font-weight: 500">💰 ${pkg.savings}</p>
        </div>

        <!-- Price -->
        <div style="padding-top: 12px; border-top: 1px solid var(--border-color)">
          <p style="margin: 0 0 4px 0; color: var(--text-muted); font-size: 11px; text-transform: uppercase">Precio</p>
          <div style="display: flex; align-items: baseline; gap: 6px">
            <span class="text-cyan" style="font-size: 22px; font-weight: 700; font-family: 'Space Mono'">$${pkg.price.toLocaleString('es-AR')}</span>
            <span style="color: var(--text-muted); font-size: 12px">ARS</span>
          </div>
        </div>
      </div>
    `;
  };

  const renderSavingsCard = (title, before, after, percentage) => {
    return `
      <div class="glass" style="padding: 16px; border-radius: 12px">
        <h4 style="margin: 0 0 12px 0; color: var(--text-light); font-size: 13px; font-weight: 600">${title}</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px">
          <div style="text-align: center">
            <p style="margin: 0 0 4px 0; color: var(--text-muted); font-size: 11px; text-transform: uppercase">Sin Automatizar</p>
            <p style="margin: 0; color: var(--red); font-size: 16px; font-weight: 700">${before}</p>
          </div>
          <div style="text-align: center">
            <p style="margin: 0 0 4px 0; color: var(--text-muted); font-size: 11px; text-transform: uppercase">Con Admin Express</p>
            <p style="margin: 0; color: var(--emerald); font-size: 16px; font-weight: 700">${after}</p>
          </div>
        </div>
        <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; text-align: center">
          <p style="margin: 0; color: var(--cyan); font-size: 13px; font-weight: 600">${percentage} de ahorro</p>
        </div>
      </div>
    `;
  };

  const updatePricing = () => {
    const selectedPkgs = Array.from(selectedPackages);
    const selectedPackageObjs = packages.filter(pkg => selectedPkgs.includes(pkg.id));
    const totalPagoUnico = selectedPackageObjs.reduce((sum, pkg) => sum + pkg.price, 0);
    const totalSuscripcion = 400000 + selectedPackageObjs.reduce((sum, pkg) => sum + (pkg.price / 2), 0);

    const totalUnicoEl = document.getElementById('total-pago-unico');
    const totalSuscripcionEl = document.getElementById('total-suscripcion');

    if (totalUnicoEl) {
      totalUnicoEl.textContent = `$${totalPagoUnico.toLocaleString('es-AR')}`;
    }
    if (totalSuscripcionEl) {
      totalSuscripcionEl.textContent = `$${totalSuscripcion.toLocaleString('es-AR')}`;
    }
  };

  const solicitarPresupuesto = (tipo) => {
    const selectedPkgs = Array.from(selectedPackages);
    if (selectedPkgs.length === 0) {
      NotificationService.show('Por favor selecciona al menos un módulo', 'warning');
      return;
    }

    const message = `Presupuesto ${tipo === 'pago-unico' ? 'Pago Único' : 'Membresía'}: ${selectedPkgs.join(', ')}`;
    NotificationService.show(`✓ Presupuesto solicitado: ${message}`, 'success');
  };

  const contactarVentas = () => {
    NotificationService.show('📞 Te contactaremos próximamente en tu email registrado', 'success');
  };

  return {
    render,
    solicitarPresupuesto,
    contactarVentas
  };
})();
