/**
 * Mock Data
 * Sample data for all modules - extracted from index-fixed.html and UI-ORGINAL-part1.html
 */

// ===== CATALOG DE ARTÍCULOS =====
const catalogoArticulos = [
  // Materiales de Nodo
  { codigo: '120204', descripcion: 'Morseto de 3 bulones', unidad: 'u', cat: 'nodo' },
  { codigo: '120211', descripcion: 'Grampas marineras 3/8"', unidad: 'u', cat: 'nodo' },
  { codigo: '120225', descripcion: 'Retenciones preformadas', unidad: 'u', cat: 'nodo' },
  { codigo: '120232', descripcion: 'Suspensores de acero', unidad: 'u', cat: 'nodo' },
  { codigo: '120240', descripcion: 'Flejes de acero 19mm', unidad: 'u', cat: 'nodo' },
  { codigo: '120241', descripcion: 'Hebillas flejes', unidad: 'u', cat: 'nodo' },
  { codigo: '210010', descripcion: 'Cajas NAP 70/30', unidad: 'u', cat: 'nodo' },
  { codigo: '210015', descripcion: 'Cajas NAP Final', unidad: 'u', cat: 'nodo' },
  { codigo: '296022', descripcion: 'NAP PRECONECT HORZD 2P/F', unidad: 'u', cat: 'nodo' },
  { codigo: '297031', descripcion: 'Cable preconectado 100m Fibra', unidad: 'm', cat: 'nodo' },
  { codigo: '297100', descripcion: 'Cable preconectado 150m Fibra', unidad: 'm', cat: 'nodo' },
  { codigo: '297101', descripcion: 'Cable preconectado 120m Fibra', unidad: 'm', cat: 'nodo' },
  // Materiales de Instalación
  { codigo: '297030', descripcion: 'Cable Drop precon. 30m', unidad: 'u', cat: 'inst' },
  { codigo: '297050', descripcion: 'Cable Drop precon. 50m', unidad: 'u', cat: 'inst' },
  { codigo: '297100', descripcion: 'Cable Drop precon. 100m', unidad: 'u', cat: 'inst' },
  { codigo: '297200', descripcion: 'Cable Drop precon. 200m', unidad: 'u', cat: 'inst' },
  { codigo: '310001', descripcion: 'Rosetas ópticas SC/APC', unidad: 'u', cat: 'inst' },
  { codigo: '310010', descripcion: 'Patchcords SC/APC 1m', unidad: 'u', cat: 'inst' },
  { codigo: '310020', descripcion: 'Conectores de campo', unidad: 'u', cat: 'inst' },
  { codigo: '310030', descripcion: 'Precintos negros 200mm', unidad: 'u', cat: 'inst' },
  { codigo: '112400', descripcion: 'Conector óptico campo SC/APC GPON', unidad: 'u', cat: 'inst' },
  { codigo: '120060', descripcion: 'Soporte cadena 28 eslabones c/bulón', unidad: 'u', cat: 'inst' },
  { codigo: '121201', descripcion: 'Mordaza cartuchera p/fibra drop', unidad: 'u', cat: 'inst' },
  { codigo: '125001', descripcion: 'Anillos identificadores omega k2-1', unidad: 'u', cat: 'inst' },
  { codigo: '125006', descripcion: 'Anillos identificadores omega k2-6', unidad: 'u', cat: 'inst' },
  { codigo: '125007', descripcion: 'Anillos identificadores omega k2-7', unidad: 'u', cat: 'inst' },
  { codigo: '125008', descripcion: 'Anillos identificadores omega k2-8', unidad: 'u', cat: 'inst' },
  { codigo: '122000', descripcion: 'Precinto plástico 190 x 5mm', unidad: 'u', cat: 'inst' },
  { codigo: '122900', descripcion: 'Grampas con clavo cribas p/rgb', unidad: 'u', cat: 'inst' },
  { codigo: '213021', descripcion: 'ONU 4GE 1TE WiFi 2,4/5 HG814', unidad: 'u', cat: 'inst' },
  { codigo: '213200', descripcion: 'PatchCord ONU G-657 A2 SC/APC-SC/APC 3M, D3', unidad: 'u', cat: 'inst' },
  { codigo: '410001', descripcion: 'ONU Huawei HG8310', unidad: 'u', cat: 'inst' },
  { codigo: '410010', descripcion: 'Modem WIFI GPON', unidad: 'u', cat: 'inst' },
  { codigo: '410020', descripcion: 'STB HD', unidad: 'u', cat: 'inst' },
  { codigo: '210301', descripcion: 'SMART CARD CONAX P/STB', unidad: 'u', cat: 'inst' },
  { codigo: '210310', descripcion: 'STB HD C/USB', unidad: 'u', cat: 'inst' },
];

// ===== NODOS DATA =====
const nodosData = [
  { id: 'NOD-001', nombre: 'NODO SURESTE 30', responsable: 'PEREDA', estado: 'activo', fecha_inicio: '2024-01-01' },
  { id: 'NOD-002', nombre: 'NODO-15', responsable: 'PEREDA', estado: 'activo', fecha_inicio: '2024-01-05' },
  { id: 'NOD-003', nombre: 'NODO-22', responsable: 'PEREDA', estado: 'activo', fecha_inicio: '2024-01-10' },
  { id: 'NOD-004', nombre: 'NODO-08', responsable: 'PEREDA', estado: 'en_construccion', fecha_inicio: '2024-01-15' },
  { id: 'NOD-005', nombre: 'SUBTRONCAL SE30GPON', responsable: 'PEREDA', estado: 'activo', fecha_inicio: '2024-01-12' },
];

// ===== INGRESOS DATA =====
const ingresosData = [
  { id: 'ING-001', numero_remito: '1850723', fecha: '2025-12-23', tipo: 'Construccion_Nodo', origen: 'Express Salta', destino: 'Deposito Central', items: [{ codigo: '297031', descripcion: 'Cable preconectado 100m', cantidad: 5, unidad: 'm' }], confirmado: true },
  { id: 'ING-002', numero_remito: '1850623', fecha: '2025-12-23', tipo: 'Construccion_Nodo', origen: 'Express Salta', destino: 'Deposito Central', items: [{ codigo: '120211', descripcion: 'Grampas marineras', cantidad: 15, unidad: 'u' }], confirmado: true },
];

// ===== EGRESOS NODO DATA =====
const egresosNodoData = [
  { id: 'EGR-001', nodo_id: 'NOD-001', nodo_nombre: 'NODO SURESTE 30', responsable: 'PEREDA', fecha: '2024-01-15', materiales: [{ codigo: '210010', descripcion: 'NAP 70/30', cantidad: 6 }], fibra: null, confirmado: true },
  { id: 'EGR-002', nodo_id: 'NOD-002', nodo_nombre: 'NODO-15', responsable: 'PEREDA', fecha: '2024-01-14', materiales: [{ codigo: '120204', descripcion: 'Morseto de 3 bulones', cantidad: 8 }], fibra: { tipo: 'F.O. 12', desde: 100, hasta: 150, consumido: 50 }, confirmado: true },
];

// ===== INSTALACIONES DATA =====
const instalacionesData = [
  { id: 'INST-001', numero_orden: '4095037', tipo: 'INSTALACION', tecnico: '372 - BENJAMIN QUIR', cliente: 'Cliente A', fecha: '2024-01-15', items: [{ codigo: '112400', descripcion: 'Conector óptico campo', cantidad: 1, serie: null }], confirmado: true },
  { id: 'INST-002', numero_orden: '4104218', tipo: 'INSTALACION', tecnico: '345 - FABIAN VEGA', cliente: 'Cliente B', fecha: '2024-01-14', items: [{ codigo: '410001', descripcion: 'ONU Huawei HG8310', cantidad: 1, serie: 'SN-HG8310-2024' }], confirmado: true },
];

// ===== DESCONEXIONES DATA =====
const desconexionesData = [
  { id: 'DES-001', numero_orden: '278478', tipo: 'DESCONEXION', tecnico: '320 - TE0169310', cliente: 'EVELYN', fecha_inicio: '2024-01-10', fecha_fin: '2024-01-04', materiales_recuperados: [{ codigo: '410001', descripcion: 'ONU', estado: 'reacondicionado', serie: 'SN-001-2024', cantidad: 1 }], confirmado: true },
  { id: 'DES-002', numero_orden: '350237', tipo: 'DESCONEXION', tecnico: '157 - CO227196', cliente: 'GRACIELA', fecha_inicio: '2024-01-02', fecha_fin: '2024-01-04', materiales_recuperados: [{ codigo: '213200', descripcion: 'Patchcord ONU', estado: 'scrap', serie: null, cantidad: 1 }], confirmado: true },
];

// ===== INVENTORY DATA =====
const stockData = [
  { codigo: '120204', material: 'Morseto de 3 bulones', cat: 'nodo', stock: 142, min: 50, unidad: 'u' },
  { codigo: '120211', material: 'Grampas marineras 3/8"', cat: 'nodo', stock: 89, min: 40, unidad: 'u' },
  { codigo: '120225', material: 'Retenciones preformadas', cat: 'nodo', stock: 63, min: 30, unidad: 'u' },
  { codigo: '120232', material: 'Suspensores de acero', cat: 'nodo', stock: 48, min: 30, unidad: 'u' },
  { codigo: '120240', material: 'Flejes de acero 19mm', cat: 'nodo', stock: 31, min: 50, unidad: 'u' },
  { codigo: '120241', material: 'Hebillas flejes', cat: 'nodo', stock: 31, min: 50, unidad: 'u' },
  { codigo: '210010', material: 'Cajas NAP 70/30', cat: 'nodo', stock: 4, min: 20, unidad: 'u' },
  { codigo: '210015', material: 'Cajas NAP Final', cat: 'nodo', stock: 12, min: 15, unidad: 'u' },
  { codigo: '297030', material: 'Cable Drop precon. 30m', cat: 'inst', stock: 18, min: 50, unidad: 'u' },
  { codigo: '297050', material: 'Cable Drop precon. 50m', cat: 'inst', stock: 34, min: 30, unidad: 'u' },
  { codigo: '297100', material: 'Cable Drop precon. 100m', cat: 'inst', stock: 21, min: 20, unidad: 'u' },
  { codigo: '297200', material: 'Cable Drop precon. 200m', cat: 'inst', stock: 8, min: 10, unidad: 'u' },
  { codigo: '310001', material: 'Rosetas ópticas SC/APC', cat: 'inst', stock: 156, min: 80, unidad: 'u' },
  { codigo: '310010', material: 'Patchcords SC/APC 1m', cat: 'inst', stock: 92, min: 60, unidad: 'u' },
  { codigo: '310020', material: 'Conectores de campo', cat: 'inst', stock: 203, min: 100, unidad: 'u' },
  { codigo: '310030', material: 'Precintos negros 200mm', cat: 'inst', stock: 580, min: 200, unidad: 'u' },
  { codigo: '410001', material: 'ONU Huawei HG8310', cat: 'inst', stock: 24, min: 20, unidad: 'u' },
  { codigo: '410010', material: 'Modem WIFI GPON', cat: 'inst', stock: 17, min: 15, unidad: 'u' },
  { codigo: '410020', material: 'STB HD', cat: 'inst', stock: 9, min: 10, unidad: 'u' },
  { codigo: '296022', material: 'NAP PRECONECT HORZD 2P/F', cat: 'nodo', stock: 25, min: 15, unidad: 'u' },
  { codigo: '297031', material: 'Cable preconectado 100m', cat: 'nodo', stock: 180, min: 50, unidad: 'm' },
  { codigo: '112400', material: 'Conector óptico campo SC/APC', cat: 'inst', stock: 145, min: 80, unidad: 'u' },
  { codigo: '120060', material: 'Soporte cadena 28 eslabones', cat: 'inst', stock: 78, min: 40, unidad: 'u' },
  { codigo: '121201', material: 'Mordaza cartuchera p/fibra drop', cat: 'inst', stock: 52, min: 30, unidad: 'u' },
  { codigo: '125001', material: 'Anillos identificadores omega k2-1', cat: 'inst', stock: 200, min: 100, unidad: 'u' },
  { codigo: '125006', material: 'Anillos identificadores omega k2-6', cat: 'inst', stock: 150, min: 100, unidad: 'u' },
  { codigo: '125007', material: 'Anillos identificadores omega k2-7', cat: 'inst', stock: 180, min: 100, unidad: 'u' },
  { codigo: '125008', material: 'Anillos identificadores omega k2-8', cat: 'inst', stock: 165, min: 100, unidad: 'u' },
  { codigo: '122000', material: 'Precinto plástico 190 x 5mm', cat: 'inst', stock: 1200, min: 500, unidad: 'u' },
  { codigo: '122900', material: 'Grampas con clavo cribas p/rgb', cat: 'inst', stock: 85, min: 50, unidad: 'u' },
  { codigo: '213021', material: 'ONU 4GE 1TE WiFi 2,4/5 HG814', cat: 'inst', stock: 11, min: 10, unidad: 'u' },
  { codigo: '213200', material: 'PatchCord ONU G-657 A2 SC/APC', cat: 'inst', stock: 35, min: 20, unidad: 'u' },
  { codigo: '210301', material: 'SMART CARD CONAX P/STB', cat: 'inst', stock: 22, min: 15, unidad: 'u' },
  { codigo: '210310', material: 'STB HD C/USB', cat: 'inst', stock: 18, min: 12, unidad: 'u' },
];

// ===== MOVEMENT HISTORY =====
const movimientos = [
  { tipo: '+', desc: 'Remito Ingreso #2241', detalle: '42u Patchcords · 80u Rosetas', cuando: 'hace 10 min', badge: 'ingreso' },
  { tipo: '-', desc: 'Certif. NODO SURESTE 30', detalle: '18u NAP · 145u Herrajes', cuando: 'hace 2 hs', badge: 'certif' },
  { tipo: '-', desc: 'Consumo Instalaciones', detalle: 'Técnico Rodríguez · 8 altas', cuando: 'hace 3 hs', badge: 'consumo' },
  { tipo: '+', desc: 'Logística Inversa', detalle: '3x ONU recuperada · Apto reuso', cuando: 'ayer 18:30', badge: 'logistica' },
];

// ===== ALERTS DATA =====
const alertasData = [
  { nivel: 'crit', material: 'Cable Drop precon. 30m (297030)', stock: 18, min: 50, accion: 'Solicitar compra urgente' },
  { nivel: 'crit', material: 'Cajas NAP 70/30 (210010)', stock: 4, min: 20, accion: 'Verificar remito pendiente' },
  { nivel: 'warn', material: 'Flejes de acero (120240)', stock: 31, min: 50, accion: 'Incluir en próximo pedido' },
  { nivel: 'warn', material: 'Hebillas flejes (120241)', stock: 31, min: 50, accion: 'Incluir en próximo pedido' },
  { nivel: 'warn', material: 'STB HD (410020)', stock: 9, min: 10, accion: 'Verificar disponibilidad' },
];

// ===== FIBER OPTICS DATA =====
const bobinasData = [
  { id: 1, tipo: 'F.O. 12 hilos', estado: 'Activa', metros: 2400, consumido: 840, disponible: 1560, porcentaje: 35 },
  { id: 2, tipo: 'F.O. 24 hilos', estado: 'Activa', metros: 3600, consumido: 1200, disponible: 2400, porcentaje: 33 },
  { id: 3, tipo: 'F.O. 12 hilos', estado: 'Reserva', metros: 2400, consumido: 0, disponible: 2400, porcentaje: 0 },
];

const consumoFibraHistory = [
  { tecnico: 'Rodríguez J.', nodo: 'NODO-15', fecha: '2024-01-15', desde: '100m', hasta: '150m', consumo: '50m', tipo: 'F.O. 12' },
  { tecnico: 'González M.', nodo: 'NODO-22', fecha: '2024-01-14', desde: '200m', hasta: '280m', consumo: '80m', tipo: 'F.O. 24' },
  { tecnico: 'López R.', nodo: 'NODO-08', fecha: '2024-01-13', desde: '50m', hasta: '120m', consumo: '70m', tipo: 'F.O. 12' },
];

// ===== TECHNICIANS DATA =====
const tecnicosData = [
  { id: 1, nombre: 'Rodríguez J.', telefono: '+54 9 387 123-4567', equipoAsignado: 3, estado: 'activo' },
  { id: 2, nombre: 'González M.', telefono: '+54 9 387 234-5678', equipoAsignado: 2, estado: 'activo' },
  { id: 3, nombre: 'López R.', telefono: '+54 9 387 345-6789', equipoAsignado: 4, estado: 'activo' },
  { id: 4, nombre: 'Martínez A.', telefono: '+54 9 387 456-7890', equipoAsignado: 2, estado: 'inactivo' },
];

const equiposData = [
  { id: 1, tecnico: 'Rodríguez J.', numeroSerie: 'SN-001-2024', modelo: 'ONU HG8310', estado: 'activo', cliente: 'Cliente A', orden: 'ORD-2024-001' },
  { id: 2, tecnico: 'González M.', numeroSerie: 'SN-002-2024', modelo: 'Modem GPON', estado: 'activo', cliente: 'Cliente B', orden: 'ORD-2024-002' },
  { id: 3, tecnico: 'López R.', numeroSerie: 'SN-003-2024', modelo: 'STB HD', estado: 'activo', cliente: 'Cliente C', orden: 'ORD-2024-003' },
  { id: 4, tecnico: 'López R.', numeroSerie: 'SN-004-2024', modelo: 'ONU HG8310', estado: 'activo', cliente: 'Cliente D', orden: 'ORD-2024-004' },
  { id: 5, tecnico: 'Martínez A.', numeroSerie: 'SN-005-2024', modelo: 'Modem GPON', estado: 'devuelto', cliente: 'Cliente E', orden: 'ORD-2024-005' },
];

// ===== KPI DATA =====
const kpisData = [
  { label: 'Materiales en Stock', valor: '3,240', capacidad: 72, color: 'cyan', unit: 'ítems' },
  { label: 'Consumibles', valor: '2,341', capacidad: 58, color: 'emerald', unit: 'ítems' },
  { label: 'Stock en Calle', valor: '183', capacidad: 45, color: 'amber', unit: 'con 4 técnicos' },
  { label: 'Alertas Críticas', valor: '3', capacidad: 100, color: 'red', unit: 'activas' },
];

// Export all data
const MockData = {
  stockData,
  catalogoArticulos,
  nodosData,
  ingresosData,
  egresosNodoData,
  instalacionesData,
  desconexionesData,
  movimientos,
  alertasData,
  bobinasData,
  consumoFibraHistory,
  tecnicosData,
  equiposData,
  kpisData,
};
