/**
 * Certificación Module
 * Displays certification records
 */

const CertificacionModule = (() => {
  const render = (container) => {
    const html = `
      <div class="bento">
        <div class="col-12 fade-up delay-1">
          <h2 class="font-display" style="font-size: 20px; font-weight: 800; margin-bottom: 6px">
            Registros de <span class="text-cyan">Certificación</span>
          </h2>
          <p class="text-muted" style="font-size: 13px; margin-bottom: 24px">Historial de certificaciones completadas</p>
        </div>

        <div class="col-12 glass fade-up delay-2" style="padding: 24px">
          <div id="certificacion-log" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px">
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderRecords();
  };

  const renderRecords = () => {
    const certifications = MockData.movimientos.filter(m => m.badge === 'certif');

    if (certifications.length === 0) {
      document.getElementById('certificacion-log').innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center;">
          <p style="color: var(--text-muted); font-size: 14px">No hay registros de certificación</p>
        </div>
      `;
      return;
    }

    const html = certifications.map(cert => `
      <div class="glass" style="padding: 16px; border-left: 4px solid var(--red)">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px">
          <span style="width: 32px; height: 32px; border-radius: 8px; background: var(--red)22; display: flex; align-items: center; justify-content: center; color: var(--red); font-weight: 700">
            ✓
          </span>
          <span style="font-size: 12px; font-weight: 600; color: var(--red); text-transform: uppercase">Certificación</span>
        </div>
        <p style="font-size: 13px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary)">${cert.desc}</p>
        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px">${cert.detalle}</p>
        <p style="font-size: 10px; color: var(--text-dim); font-family: var(--font-mono)">${cert.cuando}</p>
      </div>
    `).join('');

    document.getElementById('certificacion-log').innerHTML = html;
  };

  return { render };
})();
