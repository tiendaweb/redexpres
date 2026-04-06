/**
 * Mock Data
 * Sample data for all modules - extracted from index-fixed.html and UI-ORGINAL-part1.html
 */

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
  movimientos,
  alertasData,
  bobinasData,
  consumoFibraHistory,
  tecnicosData,
  equiposData,
  kpisData,
};
