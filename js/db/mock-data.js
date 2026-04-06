/**
 * Mock Data - Datos de ejemplo para demostración
 */

const MockData = (() => {
  // Clientes
  const clientes = [
    {
      id: 'CLI-001',
      nombre: 'García, Juan',
      tipo: 'residencial',
      email: 'juan@example.com',
      telefono: '11-2345-6789',
      direccion: 'Av. Principal 123',
      ciudad: 'Buenos Aires',
      codigoPostal: '1425',
      rut: '12345678-9',
      fechaRegistro: '2025-01-15',
      estado: 'activo',
      ordenes: ['ORD-0001', 'ORD-0002'],
      notas: 'Cliente VIP'
    },
    {
      id: 'CLI-002',
      nombre: 'Guaycari, Graciela',
      tipo: 'comercial',
      email: 'graciela@example.com',
      telefono: '11-3456-7890',
      direccion: 'Calle Secundaria 456',
      ciudad: 'La Paz',
      codigoPostal: '2000',
      rut: '23456789-0',
      fechaRegistro: '2024-06-20',
      estado: 'activo',
      ordenes: [],
      notas: ''
    }
  ];

  // Empleados/Técnicos
  const empleados = [
    {
      id: 'TEC-001',
      nombre: 'Torres, Pablo',
      email: 'pablo@express.com',
      telefono: '11-9876-5432',
      rol: 'tecnico',
      especialidad: ['instalacion', 'mantenimiento'],
      estado: 'activo',
      enCalle: 67,
      ordenesAsignadas: 12,
      disponible: true,
      ultimaLocalizacion: { lat: -34.6037, lng: -58.3816, fecha: new Date() },
      documentoId: '12345678',
      fechaContratacion: '2020-06-15'
    },
    {
      id: 'TEC-002',
      nombre: 'Mendez, Silvia',
      email: 'silvia@express.com',
      telefono: '11-8765-4321',
      rol: 'tecnico',
      especialidad: ['diagnostico', 'instalacion'],
      estado: 'activo',
      enCalle: 45,
      ordenesAsignadas: 8,
      disponible: true,
      ultimaLocalizacion: { lat: -34.6080, lng: -58.3800, fecha: new Date() },
      documentoId: '23456789',
      fechaContratacion: '2021-03-10'
    },
    {
      id: 'EMP-001',
      nombre: 'Pereda, Emanuel',
      email: 'emanuel@express.com',
      telefono: '11-7654-3210',
      rol: 'gerente',
      especialidad: ['gestion'],
      estado: 'activo',
      enCalle: 0,
      ordenesAsignadas: 0,
      disponible: false,
      ultimaLocalizacion: null,
      documentoId: '34567890',
      fechaContratacion: '2019-01-01'
    }
  ];

  // Órdenes
  const ordenes = [
    {
      id: 'ORD-0001',
      cliente: clientes[0],
      tecnico: empleados[0],
      productos: [
        { id: 'SKU-001', codigo: '410001', nombre: 'ONU Huawei HG8310', cantidad: 1 }
      ],
      estado: 'pendiente',
      fechaCreacion: new Date('2025-04-05'),
      fechaEntrega: new Date('2025-04-06'),
      notas: 'Primera instalación FTTH',
      prioridad: 'alta'
    },
    {
      id: 'ORD-0002',
      cliente: clientes[0],
      tecnico: empleados[1],
      productos: [
        { id: 'SKU-002', codigo: '120200', nombre: 'Morseto de 3 bulones', cantidad: 5 }
      ],
      estado: 'en-progreso',
      fechaCreacion: new Date('2025-04-04'),
      fechaEntrega: new Date('2025-04-07'),
      notas: 'Mantenimiento preventivo',
      prioridad: 'normal'
    },
    {
      id: 'ORD-0003',
      cliente: clientes[1],
      tecnico: empleados[0],
      productos: [
        { id: 'SKU-003', codigo: '112400', nombre: 'Conector óptico de campo SC/APC', cantidad: 2 }
      ],
      estado: 'completada',
      fechaCreacion: new Date('2025-04-01'),
      fechaEntrega: new Date('2025-04-03'),
      notas: 'Instalación comercial',
      prioridad: 'normal'
    }
  ];

  // Inventario
  const inventario = [
    {
      id: 'INV-001',
      codigo: '120204',
      material: 'Morseto de 3 bulones',
      categoria: 'instalacion',
      stock: 142,
      stockMinimo: 50,
      stockMaximo: 500,
      unidad: 'u',
      proveedor: 'Proveedor A',
      precioUnitario: 15.50,
      ubicacion: 'Almacén A - Estante 3',
      ultimaActualizacion: new Date(),
      movimientos: []
    },
    {
      id: 'INV-002',
      codigo: '112400',
      material: 'Conector óptico de campo SC/APC',
      categoria: 'equipo',
      stock: 18,
      stockMinimo: 50,
      stockMaximo: 200,
      unidad: 'u',
      proveedor: 'Proveedor B',
      precioUnitario: 45.75,
      ubicacion: 'Almacén B - Estante 1',
      ultimaActualizacion: new Date(),
      movimientos: []
    },
    {
      id: 'INV-003',
      codigo: '410001',
      material: 'ONU Huawei HG8310',
      categoria: 'equipo',
      stock: 75,
      stockMinimo: 30,
      stockMaximo: 150,
      unidad: 'u',
      proveedor: 'Huawei',
      precioUnitario: 125.00,
      ubicacion: 'Almacén A - Estante 5',
      ultimaActualizacion: new Date(),
      movimientos: []
    },
    {
      id: 'INV-004',
      codigo: 'DROP-50M',
      material: 'Cable Drop preconectorizado 50M',
      categoria: 'fibra',
      stock: 8,
      stockMinimo: 20,
      stockMaximo: 100,
      unidad: 'm',
      proveedor: 'Proveedor C',
      precioUnitario: 8.50,
      ubicacion: 'Almacén A - Rollo 2',
      ultimaActualizacion: new Date(),
      movimientos: []
    }
  ];

  // Fibra Óptica
  const fibra = [
    {
      id: 'BOB-12-001',
      tipo: '12h',
      metrosOriginales: 5000,
      metrosRestantes: 3240,
      nodo: 'NODO NORTE 15',
      historial: []
    }
  ];

  // Alertas
  const alertas = [
    {
      id: 'ALT-001',
      tipo: 'stock_critico',
      nivel: 'critico',
      material: 'Cable Drop precon. 50m',
      stockActual: 8,
      stockMinimo: 20,
      accion: 'Solicitar compra urgente',
      fechaGeneracion: new Date(),
      leida: false
    },
    {
      id: 'ALT-002',
      tipo: 'stock_bajo',
      nivel: 'advertencia',
      material: 'Conector óptico de campo SC/APC',
      stockActual: 18,
      stockMinimo: 50,
      accion: 'Hacer reorden',
      fechaGeneracion: new Date(),
      leida: false
    }
  ];

  return {
    clientes,
    empleados,
    ordenes,
    inventario,
    fibra,
    alertas,

    // Métodos helper
    getClienteById: (id) => clientes.find(c => c.id === id),
    getEmpleadoById: (id) => empleados.find(e => e.id === id),
    getOrdenById: (id) => ordenes.find(o => o.id === id),
    getInventarioById: (id) => inventario.find(i => i.id === id),

    // Cargar datos en StateManager
    loadToState: () => {
      StateManager.setState('clientes', clientes);
      StateManager.setState('empleados', empleados);
      StateManager.setState('ordenes', ordenes);
      StateManager.setState('inventario', inventario);
      StateManager.setState('fibra', fibra);
      StateManager.setState('alertas', alertas);
      StateManager.updateEstadisticas();
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MockData;
}
