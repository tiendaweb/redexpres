
<script>

// ===== DATA =====
const stockData = [
  { codigo:'120204', material:'Morseto de 3 bulones', cat:'nodo', stock:142, min:50, unidad:'u' },
  { codigo:'120211', material:'Grampas marineras 3/8"', cat:'nodo', stock:89, min:40, unidad:'u' },
  { codigo:'120225', material:'Retenciones preformadas', cat:'nodo', stock:63, min:30, unidad:'u' },
  { codigo:'120232', material:'Suspensores de acero', cat:'nodo', stock:48, min:30, unidad:'u' },
  { codigo:'120240', material:'Flejes de acero 19mm', cat:'nodo', stock:31, min:50, unidad:'u' },
  { codigo:'120241', material:'Hebillas flejes', cat:'nodo', stock:31, min:50, unidad:'u' },
  { codigo:'210010', material:'Cajas NAP 70/30', cat:'nodo', stock:4, min:20, unidad:'u' },
  { codigo:'210015', material:'Cajas NAP Final', cat:'nodo', stock:12, min:15, unidad:'u' },
  { codigo:'297030', material:'Cable Drop precon. 30m', cat:'inst', stock:18, min:50, unidad:'u' },
  { codigo:'297050', material:'Cable Drop precon. 50m', cat:'inst', stock:34, min:30, unidad:'u' },
  { codigo:'297100', material:'Cable Drop precon. 100m', cat:'inst', stock:21, min:20, unidad:'u' },
  { codigo:'297200', material:'Cable Drop precon. 200m', cat:'inst', stock:8, min:10, unidad:'u' },
  { codigo:'310001', material:'Rosetas ópticas SC/APC', cat:'inst', stock:156, min:80, unidad:'u' },
  { codigo:'310010', material:'Patchcords SC/APC 1m', cat:'inst', stock:92, min:60, unidad:'u' },
  { codigo:'310020', material:'Conectores de campo', cat:'inst', stock:203, min:100, unidad:'u' },
  { codigo:'310030', material:'Precintos negros 200mm', cat:'inst', stock:580, min:200, unidad:'u' },
  { codigo:'410001', material:'ONU Huawei HG8310', cat:'inst', stock:24, min:20, unidad:'u' },
  { codigo:'410010', material:'Modem WIFI GPON', cat:'inst', stock:17, min:15, unidad:'u' },
  { codigo:'410020', material:'STB HD', cat:'inst', stock:9, min:10, unidad:'u' },
];

const movimientos = [
  { tipo:'+', desc:'Remito Ingreso #2241', detalle:'42u Patchcords · 80u Rosetas', cuando:'hace 10 min', badge:'ingreso' },
  { tipo:'-', desc:'Certif. NODO SURESTE 30', detalle:'18u NAP · 145u Herrajes', cuando:'hace 2 hs', badge:'certif' },
  { tipo:'-', desc:'Consumo Instalaciones', detalle:'Técnico Rodríguez · 8 altas', cuando:'hace 3 hs', badge:'consumo' },
  { tipo:'+', desc:'Logística Inversa', detalle:'3x ONU recuperada · Apto reuso', cuando:'ayer 18:30', badge:'logistica' },
];

const tecnicos = [
  { nombre:'Carlos Rodríguez', inicial:'CR', activo:true, enCalle:42, ordenes:8, ultimo:'hace 1h' },
  { nombre:'Miguel Fernández', inicial:'MF', activo:true, enCalle:28, ordenes:5, ultimo:'hace 2h' },
  { nombre:'Pablo Torres', inicial:'PT', activo:true, enCalle:67, ordenes:12, ultimo:'hace 30min' },
  { nombre:'Sergio Gómez', inicial:'SG', activo:false, enCalle:46, ordenes:0, ultimo:'ayer' },
];

const equiposActivos = [
  { ns:'H8310-AA2341', equipo:'ONU Huawei HG8310', tecnico:'Torres', cliente:'García, Juan', orden:'ORD-4421', fecha:'03/04/2025', estado:'activo' },
  { ns:'H8310-AA2342', equipo:'ONU Huawei HG8310', tecnico:'Rodríguez', cliente:'López, M.', orden:'ORD-4418', fecha:'02/04/2025', estado:'activo' },
  { ns:'GPON-WF-0891', equipo:'Modem WIFI GPON', tecnico:'Fernández', cliente:'Martínez, A.', orden:'ORD-4412', fecha:'01/04/2025', estado:'activo' },
  { ns:'STB-HD-0340', equipo:'STB HD', tecnico:'Torres', cliente:'Pérez, L.', orden:'ORD-4409', fecha:'31/03/2025', estado:'baja' },
  { ns:'H8310-AA2338', equipo:'ONU Huawei HG8310', tecnico:'Gómez', cliente:'Ruiz, C.', orden:'ORD-4401', fecha:'28/03/2025', estado:'activo' },
];

const bobinas = [
  { id:'BOB-12-001', tipo:'12h', metros_orig:5000, metros_restante:3240, nodo:'NODO NORTE 15' },
  { id:'BOB-12-002', tipo:'12h', metros_orig:5000, metros_restante:2180, nodo:'DEPÓSITO' },
  { id:'BOB-24-001', tipo:'24h', metros_orig:2000, metros_restante:1180, nodo:'NODO SURESTE 30' },
  { id:'BOB-24-002', tipo:'24h', metros_orig:2000, metros_restante:820, nodo:'DEPÓSITO' },
];

const fibraHistorial = [
  { fecha:'05/04', tipo:'12h', nodo:'NODO NORTE 15', desde:1100, hasta:1420, consumo:320, tecnico:'Torres', estado:'aplicado' },
  { fecha:'04/04', tipo:'24h', nodo:'NODO SURESTE 30', desde:820, hasta:1180, consumo:360, tecnico:'Rodríguez', estado:'aplicado' },
  { fecha:'03/04', tipo:'12h', nodo:'NODO ESTE 08', desde:450, hasta:780, consumo:330, tecnico:'Fernández', estado:'aplicado' },
];

const alertasData = [
  { nivel:'crit', material:'Cable Drop precon. 30m (297030)', stock:18, min:50, accion:'Solicitar compra urgente' },
  { nivel:'crit', material:'Cajas NAP 70/30 (210010)', stock:4, min:20, accion:'Verificar remito pendiente' },
  { nivel:'warn', material:'Flejes de acero (120240)', stock:31, min:50, accion:'Incluir en próximo pedido' },
  { nivel:'warn', material:'Hebillas flejes (120241)', stock:31, min:50, accion:'Incluir en próximo pedido' },
  { nivel:'warn', material:'F.O. 24 hilos — Bobina BOB-24-001', stock:'1,180m', min:'2,000m', accion:'Verificar stock en depósito' },
];

const logEntries = [
  { time:'09:42', action:'SISTEMA INICIADO', detail:'Base cargada · 19 materiales · Stock al 05-04', color:'var(--cyan)' },
  { time:'10:15', action:'REMITO PROCESADO', detail:'#2241 · +42 patchcords · +80 rosetas → Instalaciones', color:'var(--emerald)' },
  { time:'10:18', action:'ALERTA GENERADA', detail:'Drop precon. 30m bajó de mínimo (18 < 50)', color:'var(--red)' },
  { time:'11:30', action:'CERTIF. PROCESADA', detail:'NODO SURESTE 30 · -18 NAP · -145 herrajes', color:'var(--red)' },
  { time:'13:05', action:'LOGÍSTICA INVERSA', detail:'3x ONU recuperada [NS: H8310-AA2318,19,20] → Apto reuso', color:'var(--amber)' },
];

// ===== RENDER FUNCTIONS =====

function getEstadoClass(stock, min) {
  const ratio = stock / min;
  if (ratio < 0.5) return 'status-crit';
  if (ratio < 1) return 'status-warn';
  return 'status-ok';
}
function getEstadoLabel(stock, min) {
  const ratio = stock / min;
  if (ratio < 0.5) return 'CRÍTICO';
  if (ratio < 1) return 'BAJO';
  return 'OK';
}

let currentFilter = 'todos';

function renderTable(filter) {
  const data = filter === 'todos' ? stockData : stockData.filter(d => d.cat === filter);
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = data.map(d => `
    <tr>
      <td><span class="font-mono" style="font-size:12px;color:var(--text-muted)">${d.codigo}</span></td>
      <td style="font-weight:500">${d.material}</td>
      <td><span class="badge ${d.cat==='nodo'?'badge-cyan':'badge-emerald'}" style="font-size:10px">${d.cat.toUpperCase()}</span></td>
      <td><span class="font-mono" style="font-size:15px;font-weight:700;color:${d.stock<d.min?'var(--red)':'var(--text-primary)'}">${d.stock}</span> <span style="font-size:11px;color:var(--text-dim)">${d.unidad}</span></td>
      <td><span class="font-mono" style="font-size:12px;color:var(--text-dim)">${d.min} ${d.unidad}</span></td>
      <td><span class="chip ${getEstadoClass(d.stock,d.min)}" style="font-size:10px;padding:3px 8px;border-radius:5px">${getEstadoLabel(d.stock,d.min)}</span></td>
    </tr>
  `).join('');
}

function filterTable(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTable(f);
}

function renderMovimientos() {
  const colors = { ingreso:'var(--cyan)', certif:'var(--red)', consumo:'var(--red)', logistica:'var(--amber)' };
  const icons = { ingreso:'↑', certif:'↓', consumo:'↓', logistica:'↑' };
  document.getElementById('movimientos-log').innerHTML = movimientos.map(m => `
    <div class="glass" style="padding:16px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <span style="width:28px;height:28px;border-radius:8px;background:rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:${colors[m.badge]}">${icons[m.badge]}</span>
        <span style="font-size:11px;font-family:'Space Mono',monospace;color:${colors[m.badge]}">${m.tipo === '+' ? 'SUMA' : 'RESTA'}</span>
      </div>
      <p style="font-size:13px;font-weight:600;margin-bottom:4px">${m.desc}</p>
      <p style="font-size:11px;color:var(--text-muted);margin-bottom:10px">${m.detalle}</p>
      <p style="font-size:10px;color:var(--text-dim);font-family:'Space Mono',monospace">${m.cuando}</p>
    </div>
  `).join('');
}

function renderLog() {
  document.getElementById('log-entries').innerHTML = logEntries.map(e => `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04);align-items:flex-start">
      <span class="font-mono" style="font-size:11px;color:var(--text-dim);flex-shrink:0;padding-top:1px">${e.time}</span>
      <span style="width:3px;align-self:stretch;background:${e.color};border-radius:3px;flex-shrink:0;opacity:0.6"></span>
      <div>
        <span class="font-mono" style="font-size:11px;font-weight:700;color:${e.color}">${e.action}</span>
        <p style="font-size:12px;color:var(--text-muted);margin-top:2px">${e.detail}</p>
      </div>
    </div>
  `).join('');
}

function renderBobinas() {
  document.getElementById('bobinas-list').innerHTML = bobinas.map(b => {
    const pct = Math.round(b.metros_restante / b.metros_orig * 100);
    const color = pct < 30 ? 'var(--red)' : pct < 60 ? 'var(--amber)' : 'var(--emerald)';
    const fillClass = pct < 30 ? 'fill-red' : pct < 60 ? 'fill-amber' : 'fill-emerald';
    return `
    <div style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div>
          <span class="font-mono" style="font-size:12px;color:var(--text-muted)">${b.id}</span>
          <span class="badge ${b.tipo==='12h'?'badge-cyan':'badge-amber'}" style="font-size:9px;margin-left:6px">FO ${b.tipo}</span>
        </div>
        <span class="font-mono" style="color:${color};font-size:14px;font-weight:700">${b.metros_restante.toLocaleString()}m</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill ${fillClass}" style="width:${pct}%"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:4px">
        <span style="font-size:10px;color:var(--text-dim)">${b.nodo}</span>
        <span style="font-size:10px;color:var(--text-dim)">${pct}% · de ${b.metros_orig.toLocaleString()}m</span>
      </div>
    </div>
    `;
  }).join('');
}

function renderFibraHistorial() {
  document.getElementById('fibra-historial').innerHTML = fibraHistorial.map(r => `
    <tr>
      <td class="font-mono" style="font-size:12px;color:var(--text-muted)">${r.fecha}</td>
      <td><span class="badge ${r.tipo==='12h'?'badge-cyan':'badge-amber'}" style="font-size:10px">FO ${r.tipo}</span></td>
      <td style="font-size:13px">${r.nodo}</td>
      <td class="font-mono" style="font-size:12px">${r.desde}m</td>
      <td class="font-mono" style="font-size:12px">${r.hasta}m</td>
      <td class="font-mono text-red" style="font-size:14px;font-weight:700">-${r.consumo}m</td>
      <td style="font-size:12px">${r.tecnico}</td>
      <td><span class="chip badge-emerald" style="font-size:10px">${r.estado}</span></td>
    </tr>
  `).join('');
}

function renderTecnicos() {
  document.getElementById('tecnicos-cards').innerHTML = tecnicos.map(t => `
    <div class="glass" style="padding:22px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <div class="tecnico-avatar">${t.inicial}</div>
        <div>
          <p style="font-size:13px;font-weight:600">${t.nombre}</p>
          <span class="dot ${t.activo?'dot-emerald':'dot-amber'}" style="display:inline-block;margin-right:4px"></span>
          <span style="font-size:11px;color:var(--text-muted)">${t.activo?'Activo':'Inactivo'}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
        <div style="padding:10px;background:rgba(255,255,255,0.02);border-radius:8px;text-align:center">
          <p class="font-mono text-amber" style="font-size:22px;font-weight:700">${t.enCalle}</p>
          <p style="font-size:10px;color:var(--text-muted)">en calle</p>
        </div>
        <div style="padding:10px;background:rgba(255,255,255,0.02);border-radius:8px;text-align:center">
          <p class="font-mono text-emerald" style="font-size:22px;font-weight:700">${t.ordenes}</p>
          <p style="font-size:10px;color:var(--text-muted)">órdenes hoy</p>
        </div>
      </div>
      <p style="font-size:10px;color:var(--text-dim);font-family:'Space Mono',monospace">Últ. reporte: ${t.ultimo}</p>
    </div>
  `).join('');

  document.getElementById('ns-table').innerHTML = equiposActivos.map(e => `
    <tr>
      <td class="font-mono" style="font-size:12px;color:var(--cyan)">${e.ns}</td>
      <td style="font-size:13px">${e.equipo}</td>
      <td style="font-size:13px">${e.tecnico}</td>
      <td style="font-size:13px">${e.cliente}</td>
      <td class="font-mono" style="font-size:12px;color:var(--text-muted)">${e.orden}</td>
      <td style="font-size:12px;color:var(--text-muted)">${e.fecha}</td>
      <td><span class="chip ${e.estado==='activo'?'badge-emerald':'badge-red'}" style="font-size:10px">${e.estado.toUpperCase()}</span></td>
    </tr>
  `).join('');
}

function renderAlertas() {
  document.getElementById('alertas-panel').innerHTML = alertasData.map(a => `
    <div class="glass ${a.nivel==='crit'?'glow-red':'glow-amber'}" style="padding:20px;display:flex;align-items:center;gap:16px;border-left:3px solid ${a.nivel==='crit'?'var(--red)':'var(--amber)'}">
      <span class="dot ${a.nivel==='crit'?'dot-red':'dot-amber'}" style="flex-shrink:0;width:12px;height:12px"></span>
      <div style="flex:1">
        <p style="font-size:14px;font-weight:600;margin-bottom:4px">${a.material}</p>
        <p style="font-size:12px;color:var(--text-muted)">
          Stock actual: <strong style="color:${a.nivel==='crit'?'var(--red)':'var(--amber)'}">${a.stock}</strong> · 
          Mínimo requerido: <strong>${a.min}</strong>
        </p>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <span class="badge ${a.nivel==='crit'?'badge-red':'badge-amber'}">${a.nivel==='crit'?'CRÍTICO':'BAJO'}</span>
        <p style="font-size:11px;color:var(--text-muted);margin-top:6px">${a.accion}</p>
      </div>
    </div>
  `).join('');
}

// ===== INTERACTIVITY =====

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const btns = { dashboard:0, movimientos:1, fibra:2, tecnicos:3, alertas:4 };
  document.querySelectorAll('.nav-btn')[btns[page]]?.classList.add('active');
}

function openModal() {
  document.getElementById('modal').classList.add('visible');
}
function closeModal() {
  document.getElementById('modal').classList.remove('visible');
}
document.getElementById('modal').addEventListener('click', e => { if(e.target.id==='modal') closeModal(); });

function showNotif(msg, icon='✓') {
  const n = document.getElementById('notif');
  document.getElementById('notif-msg').textContent = msg;
  document.getElementById('notif-icon').textContent = icon;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 3500);
}

function simProcess(tipo) {
  const msgs = {
    ingreso: ['Leyendo PDF...', 'Detectando códigos de artículo...', 'Mapeando contra catálogo...', '✓ Ingreso procesado · Stock actualizado'],
    egreso: ['Leyendo certificación...', 'Calculando consumos...', 'Verificando marcas métricas...', '✓ Egreso aplicado · Stock descontado'],
  };
  let i = 0;
  const el = document.getElementById('dz-' + tipo);
  const interval = setInterval(() => {
    if(i < msgs[tipo].length - 1) {
      el.querySelector('p').textContent = msgs[tipo][i];
      i++;
    } else {
      clearInterval(interval);
      el.querySelector('p').textContent = msgs[tipo][i];
      showNotif(msgs[tipo][i]);
      // Add to log
      const entry = {
        time: new Date().toTimeString().slice(0,5),
        action: tipo === 'ingreso' ? 'REMITO PROCESADO' : 'EGRESO PROCESADO',
        detail: tipo === 'ingreso' ? 'Archivo procesado · Stock actualizado' : 'Documento procesado · Stock descontado',
        color: tipo === 'ingreso' ? 'var(--emerald)' : 'var(--red)'
      };
      logEntries.unshift(entry);
      renderLog();
      setTimeout(() => {
        el.querySelector('p').textContent = tipo === 'ingreso' ? 'DROP PDF / CSV AQUÍ' : 'DROP PDF / CSV AQUÍ';
      }, 3000);
    }
  }, 800);
}

function addStock() {
  const codigo = document.getElementById('new-codigo').value;
  const material = document.getElementById('new-material').value;
  const cantidad = parseInt(document.getElementById('new-cantidad').value) || 0;
  const destino = document.getElementById('new-destino').value;

  if(!codigo || !material || !cantidad) {
    showNotif('Completá todos los campos', '⚠');
    return;
  }

  // Find in stock and update, or add new
  const existing = stockData.find(d => d.codigo === codigo);
  if(existing) {
    existing.stock += cantidad;
  } else {
    stockData.push({ codigo, material, cat: destino.includes('Nodo') ? 'nodo' : 'inst', stock: cantidad, min: Math.ceil(cantidad * 0.3), unidad: 'u' });
  }

  logEntries.unshift({
    time: new Date().toTimeString().slice(0,5),
    action: 'INGRESO MANUAL',
    detail: `+${cantidad}x ${material} (${codigo}) → ${destino}`,
    color: 'var(--emerald)'
  });

  renderTable(currentFilter);
  renderLog();
  closeModal();
  showNotif(`+${cantidad} ${material} → Stock actualizado`);

  // Reset form
  document.getElementById('new-codigo').value = '';
  document.getElementById('new-material').value = '';
  document.getElementById('new-cantidad').value = '';
}

function calcFibra() {
  const desde = parseFloat(document.getElementById('fiber-desde').value) || 0;
  const hasta = parseFloat(document.getElementById('fiber-hasta').value) || 0;
  const tipo = document.getElementById('fiber-type').value;
  const consumo = Math.max(0, hasta - desde);
  const stockActual = tipo === '12' ? 3240 : 1180;
  const nuevoStock = stockActual - consumo;

  document.getElementById('fibra-resultado').textContent = consumo.toLocaleString();
  const color = nuevoStock < 0 ? 'var(--red)' : nuevoStock < (tipo==='12'?500:400) ? 'var(--amber)' : 'var(--emerald)';
  document.getElementById('fibra-nuevo-stock').innerHTML = `Nuevo stock post-consumo: <span style="color:${color}">${nuevoStock.toLocaleString()}m</span>`;
}

function aplicarFibra() {
  const desde = parseFloat(document.getElementById('fiber-desde').value) || 0;
  const hasta = parseFloat(document.getElementById('fiber-hasta').value) || 0;
  const consumo = Math.max(0, hasta - desde);
  const tipo = document.getElementById('fiber-type').value;

  if(!consumo) { showNotif('Ingresá los valores secuenciales', '⚠'); return; }

  fibraHistorial.unshift({
    fecha: new Date().toLocaleDateString('es-AR',{day:'2d',month:'2d'}).replace(/\//,'/').slice(0,5),
    tipo: tipo+'h', nodo: 'MANUAL', desde, hasta, consumo,
    tecnico: 'Usuario', estado: 'aplicado'
  });
  renderFibraHistorial();
  logEntries.unshift({ time: new Date().toTimeString().slice(0,5), action:'CONSUMO FIBRA', detail:`FO ${tipo}h · -${consumo}m (${desde}m → ${hasta}m)`, color:'var(--amber)' });
  showNotif(`Consumo FO ${tipo}h aplicado: -${consumo}m`);
}

// ===== INIT =====
renderTable('todos');
renderMovimientos();
renderLog();
renderBobinas();
renderFibraHistorial();
renderTecnicos();
renderAlertas();

// Drag over effect for drop zones
['dz-ingreso','dz-egreso'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('drag-over'); });
  el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
  el.addEventListener('drop', e => { e.preventDefault(); el.classList.remove('drag-over'); simProcess(id.split('-')[1]); });
});

</script>
