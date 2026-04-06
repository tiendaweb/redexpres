# 🚀 EXPRESS - Sistema de Gestión Integral

**Sistema modular y escalable de gestión de órdenes, inventario y personal para servicios FTTH**

## 📋 Características Principales

### ✅ Funcionalidades Implementadas

#### 1. **Dashboard Inteligente**
- KPI en tiempo real (órdenes, inventario, técnicos, clientes)
- Alertas críticas automáticas
- Últimas órdenes procesadas
- Vista general del sistema

#### 2. **Gestión de Órdenes** (CRUD)
- Crear/leer/actualizar/eliminar órdenes
- Asignación automática de técnicos
- Estados: pendiente, en-progreso, completada, cancelada
- Prioridades: baja, normal, alta, crítica
- Historial de cambios

#### 3. **Gestión de Inventario** (CRUD)
- Artículos con código único
- Control de stock (mínimo/máximo/crítico)
- Alertas automáticas de stock bajo
- Historial de movimientos
- Clasificación por categoría
- Valuación de inventario

#### 4. **Gestión de Clientes** (CRUD)
- Registro de clientes (residencial, comercial, industrial)
- Historial de órdenes por cliente
- Contacto y ubicación
- Estados: activo, inactivo, suspendido

#### 5. **Gestión de Empleados/Técnicos** (CRUD)
- Registro de personal
- Roles: admin, gerente, supervisor, técnico, operador
- Control de disponibilidad
- Especialidades
- Productividad y estadísticas

#### 6. **Reportes y Exportación**
- Reportes dinámicos por período
- Exportación a PDF, Excel, CSV
- Gráficos e histogramas
- Imprimir reportes

#### 7. **Administración del Sistema**
- Configuración general
- Gestión de usuarios y permisos
- Backup y restauración de datos
- Logs del sistema
- Umbrales de alertas

### 🎨 Tema Light/Dark Mode

- **Dark Mode** (default): Tema moderno con colores neón
- **Light Mode**: Tema claro con excelente contraste
- **Cambio automático**: Respeta preferencia del sistema operativo
- **Persistencia**: Guarda la preferencia del usuario

### 📱 Diseño Responsive

- **Desktop**: Layout completo con sidebar y navbar
- **Tablet**: Sidebar colapsable
- **Mobile**: Interfaz optimizada con menú hamburguesa

---

## 🏗️ Arquitectura del Proyecto

```
redexpres/
├── index.html                    # Shell HTML (SPA)
├── css/
│   ├── variables.css             # Variables globales (colores, espacios)
│   ├── base.css                  # Reset y estilos base
│   ├── glass-design.css          # Sistema de glass morphism
│   ├── components.css            # Componentes (btn, badge, alert, form)
│   └── animations.css            # Keyframes y transiciones
├── js/
│   ├── core/
│   │   ├── state-manager.js      # Gestión centralizada de estado
│   │   ├── router.js             # Enrutamiento SPA
│   │   ├── event-bus.js          # Bus de eventos global
│   │   └── app.js                # Inicializador principal
│   ├── services/
│   │   ├── api-service.js        # Cliente HTTP
│   │   ├── storage-service.js    # LocalStorage
│   │   └── notification-service.js # Notificaciones toast
│   ├── components/
│   │   ├── modal.js              # Modal genérico
│   │   ├── table.js              # Tabla con paginación
│   │   └── form.js               # Formulario con validación
│   ├── modules/
│   │   ├── dashboard/
│   │   ├── ordenes/
│   │   ├── inventario/
│   │   ├── clientes/
│   │   ├── empleados/
│   │   ├── reportes/
│   │   └── admin/
│   ├── utils/
│   │   ├── theme.js              # Gestor de tema light/dark
│   │   ├── validators.js         # Funciones de validación
│   │   ├── formatters.js         # Formateo de datos
│   │   └── constants.js          # Constantes de la app
│   └── db/
│       └── mock-data.js          # Datos de ejemplo
├── docs/                          # Documentación
└── README.md                       # Este archivo
```

---

## 🔧 Cómo Usar

### 1. **Iniciar la Aplicación**

```bash
# Abrir index.html en el navegador
# La app se inicializa automáticamente
```

### 2. **Cambiar Tema**

- Haz clic en el botón de tema en la barra lateral
- Se alterna entre dark mode ☀️ y light mode 🌙
- La preferencia se guarda automáticamente

### 3. **Navegar entre Módulos**

- Usa el sidebar izquierdo para navegar
- Las rutas son: `/#dashboard`, `/#ordenes`, `/#inventario`, etc.
- La navegación es instantánea sin recargar la página

### 4. **Crear/Editar/Eliminar Registros**

Cada módulo (Órdenes, Inventario, Clientes, Empleados) ofrece:

```javascript
// Crear
Modal abre formulario → Guardar → Notificación de éxito

// Editar
Click en botón "Editar" → Modal abre → Cambiar datos → Guardar

// Eliminar
Click en botón "Eliminar" → Confirmar → Se elimina con soft-delete
```

---

## 📊 Estructura de Datos

### **Orden**
```javascript
{
  id: 'ORD-0001',
  cliente: { id, nombre, email, telefono, direccion },
  tecnico: { id, nombre, disponible },
  productos: [{ id, codigo, nombre, cantidad }],
  estado: 'pendiente' | 'en-progreso' | 'completada' | 'cancelada',
  prioridad: 'baja' | 'normal' | 'alta' | 'critica',
  fechaCreacion: Date,
  fechaEntrega: Date,
  notas: string
}
```

### **Inventario**
```javascript
{
  id: 'INV-001',
  codigo: '120204',
  material: string,
  categoria: 'nodo' | 'instalacion' | 'equipo' | 'consumible' | 'fibra',
  stock: number,
  stockMinimo: number,
  stockMaximo: number,
  unidad: 'u' | 'm' | 'kg' | 'l',
  proveedor: string,
  precioUnitario: number,
  ubicacion: string,
  movimientos: [{ tipo, cantidad, fecha, razon }]
}
```

### **Cliente**
```javascript
{
  id: 'CLI-001',
  nombre: string,
  tipo: 'residencial' | 'comercial' | 'industrial',
  email: string,
  telefono: string,
  direccion: string,
  ciudad: string,
  rut: string,
  estado: 'activo' | 'inactivo' | 'suspendido',
  ordenes: [id, ...],
  fechaRegistro: Date
}
```

### **Empleado/Técnico**
```javascript
{
  id: 'TEC-001',
  nombre: string,
  email: string,
  telefono: string,
  rol: 'admin' | 'gerente' | 'supervisor' | 'tecnico' | 'operador',
  especialidad: [string, ...],
  estado: 'activo' | 'inactivo' | 'licencia',
  disponible: boolean,
  ordenesAsignadas: number,
  documentoId: string,
  fechaContratacion: Date
}
```

---

## 🎯 Módulos y Funcionalidades

### **Dashboard** 📊
- **Función**: Panel de control central con KPIs
- **Datos**: Estadísticas en tiempo real
- **Alertas**: Muestra alertas críticas de inventario
- **Acciones**: Ver órdenes recientes

### **Órdenes** 📋
- **Crear**: Nueva orden con cliente, técnico, productos, prioridad
- **Leer**: Tabla filtrable por estado, técnico, cliente, fecha
- **Actualizar**: Cambiar estado, técnico, productos, fecha entrega
- **Eliminar**: Cancelar orden (soft-delete)
- **Acciones**: Historial, ver detalles, asignar técnico

### **Inventario** 📦
- **Crear**: Nuevo artículo con código, categoría, stock
- **Leer**: Tabla con filtros por categoría y estado de stock
- **Actualizar**: Ajustar stock, cambiar mínimos/máximos, precio
- **Eliminar**: Marcar como discontinuado
- **Alertas**: Automáticas para stock bajo/crítico

### **Clientes** 👥
- **Crear**: Registro de nuevo cliente
- **Leer**: Directorio con búsqueda
- **Actualizar**: Cambiar datos de contacto, dirección, estado
- **Eliminar**: Archivar cliente
- **Historial**: Ver órdenes asociadas

### **Empleados** 👨‍💼
- **Crear**: Registro de nuevo empleado
- **Leer**: Lista con disponibilidad y productividad
- **Actualizar**: Cambiar rol, especialidades, disponibilidad
- **Eliminar**: Cambiar a inactivo
- **Productividad**: Órdenes completadas, tiempo promedio

### **Reportes** 📈
- **Reportes**: Órdenes, inventario, productividad
- **Exportación**: PDF, Excel, CSV
- **Gráficos**: Visualización de datos
- **Impresión**: Formato listo para imprimir

### **Admin** ⚙️
- **Configuración**: General, usuarios, roles, alertas
- **Mantenimiento**: Backup, restauración, limpieza
- **Logs**: Auditoría de cambios
- **Información**: Versión, almacenamiento usado

---

## 🎨 Sistema de Diseño

### **Colores**
```css
Dark Mode (Default):
--bg-base: #080c12 (fondo principal)
--text-primary: #e8edf5 (texto principal)
--cyan: #00e5ff (acento principal)
--emerald: #00ffa3 (éxito)
--red: #ff3b6b (peligro)
--amber: #ffb020 (advertencia)
--blue: #0ea5e9 (información)

Light Mode:
--bg-base: #f5f7fa (fondo principal)
--text-primary: #1a202c (texto principal)
--cyan: #0891b2 (acento adaptado)
--emerald: #059669 (éxito adaptado)
--red: #dc2626 (peligro adaptado)
--amber: #d97706 (advertencia adaptada)
```

### **Componentes**
- **Botones**: primary, secondary, success, danger, warning, ghost, text
- **Badges**: cyan, emerald, red, amber, blue, purple, lime
- **Alerts**: success, error, warning, info
- **Cards**: con shadow y glass effect
- **Forms**: inputs validados con feedback visual

### **Animaciones**
- fadeIn, slideInDown/Up/Left/Right
- scaleIn, pulse, bounce, spin, glow
- Transiciones suaves en todos los elementos

---

## 💾 Persistencia de Datos

### **LocalStorage**
- Datos guardados en el navegador
- Persisten entre sesiones
- Clave de prefijo: `express_`

### **Mock Data**
- Datos de ejemplo para demostración
- Se cargan en el estado al iniciar
- Fáciles de reemplazar con datos reales

### **Métodos**
```javascript
// Guardar
StorageService.save('key', data)

// Cargar
const data = StorageService.load('key')

// Backup
AdminModule.backupData()

// Restaurar
AdminModule.restoreData()
```

---

## 🔐 Autenticación y Permisos

### **Roles**
- **Admin**: Acceso completo a todos los módulos
- **Gerente**: Leer/actualizar órdenes, inventario, ver reportes
- **Supervisor**: Leer/actualizar órdenes, empleados
- **Técnico**: Leer órdenes, inventario
- **Operador**: Leer solamente

### **Permisos por Rol** (Extensible)
```javascript
{
  admin: { ordenes: ['crear', 'leer', 'actualizar', 'eliminar'], ... },
  gerente: { ordenes: ['crear', 'leer', 'actualizar'], ... },
  // ...
}
```

---

## 🔄 Validaciones

### **Integradas**
- Email válido
- Teléfono formato correcto
- Números positivos
- Fechas válidas
- RUT válido (Argentina/Chile)
- URLs válidas
- Campos requeridos

### **Uso**
```javascript
Form.create({
  fields: [
    {
      name: 'email',
      label: 'Correo',
      type: 'email',
      required: true,
      validate: Validators.email
    }
  ]
})
```

---

## 📅 Formateo de Datos

### **Disponibles**
```javascript
Formatters.date(value) // DD/MM/YYYY
Formatters.currency(value) // $1.234,56
Formatters.number(value) // 1.234
Formatters.percentage(value) // 25%
Formatters.status(value) // <badge>
Formatters.capitalize(value) // Capitalizado
Formatters.truncate(value, 20) // Cortado...
```

---

## 🚀 Cómo Extender

### **Agregar Nuevo Módulo**

1. **Crear archivo del módulo**
```javascript
// js/modules/nuevo/nuevo.js
const NuevoModule = (() => {
  const render = (container) => {
    container.innerHTML = '<h2>Mi nuevo módulo</h2>'
  }
  return { render }
})()
```

2. **Incluir en HTML**
```html
<script src="js/modules/nuevo/nuevo.js"></script>
```

3. **Registrar en Router**
```javascript
// En js/core/app.js
Router.register('nuevo', NuevoModule)
```

4. **Agregar en Sidebar**
```html
<a href="#nuevo" class="sidebar-item" data-route="nuevo">
  Nuevo
</a>
```

### **Agregar CRUD a un Módulo**

Usa los componentes disponibles:
```javascript
// Tabla
Table.render(container, {
  data: items,
  columns: [{ key: 'nombre', label: 'Nombre' }],
  acciones: [
    { texto: 'Editar', onClick: (row) => {} }
  ]
})

// Modal
Modal.show({
  title: 'Crear Item',
  content: '<form>...</form>',
  buttons: [...]
})

// Formulario
const form = Form.create({
  fields: [...],
  onSubmit: (datos) => {}
})

// Notificación
NotificationService.success('¡Listo!')
```

---

## 🔌 Integración con Backend

### **API Service**
```javascript
// GET
const datos = await APIService.get('/ordenes')

// POST
await APIService.post('/ordenes', { ...orden })

// PUT
await APIService.put('/ordenes/1', { ...cambios })

// DELETE
await APIService.delete('/ordenes/1')
```

### **Cambiar URL de API**
```javascript
// En config
const API_BASE_URL = 'https://tu-api.com/api'

// O dinámicamente
APIService.setBaseURL('https://api-produccion.com')
```

---

## 🐛 Debugging

### **Console Logs**
```javascript
// Ver estado actual
console.log(StateManager.getState())

// Ver ruta actual
console.log(Router.getCurrent())

// Ver datos de módulo
console.log(StateManager.getState('ordenes'))
```

### **DevTools**
- Abrir Developer Tools (F12)
- Console para ejecutar comandos
- Application → LocalStorage para ver datos persistidos
- Network para ver requests

---

## 📈 Mejoras Futuras

- [ ] Integración real de API
- [ ] Autenticación con JWT
- [ ] Gráficos dinámicos (Chart.js)
- [ ] Maps para localización de técnicos
- [ ] WebSockets para tiempo real
- [ ] Tests automatizados
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Sincronización de datos
- [ ] Soporte multi-idioma
- [ ] Exportación avanzada (PDF con logo)
- [ ] Búsqueda global fulltext

---

## 📚 Referencias

### **Tecnologías Usadas**
- HTML5 / CSS3 / JavaScript (Vanilla)
- LocalStorage API
- Fetch API
- Modern CSS (Grid, Flexbox, Variables)

### **Fuentes y Tipografía**
- **Inter**: Texto principal
- **Syne**: Títulos y display
- **Space Mono**: Código y monoespaciado

### **Paleta de Colores**
Inspirada en diseño moderno con neones y glassmorphism

---

## 📞 Soporte

Para dudas o sugerencias:
- 📧 Email: support@express.com
- 🐙 GitHub: tiendaweb/redexpres
- 💬 Discord: (enlace al servidor)

---

**Versión**: 1.0.0  
**Última actualización**: Abril 2025  
**Licencia**: MIT  
**Autor**: Express Team

---

## 🎉 ¡Gracias por usar Express!

Esperamos que disfrutes gestionar tu negocio FTTH con nuestra plataforma.

