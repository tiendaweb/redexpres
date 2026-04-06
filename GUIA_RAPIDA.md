# 🚀 Guía Rápida - Express

## Inicio en 3 pasos

### 1️⃣ **Abrir la aplicación**
```bash
# Simplemente abre index.html en tu navegador
# La aplicación se inicializa automáticamente
```

### 2️⃣ **Navegar por los módulos**
```
Sidebar izquierdo:
📊 Dashboard  → Ver KPIs y estadísticas
📋 Órdenes    → Gestionar órdenes de trabajo
📦 Inventario → Control de stock
👥 Clientes   → Directorio de clientes
👨‍💼 Empleados  → Gestión de técnicos
📈 Reportes   → Exportar datos (PDF, Excel, CSV)
⚙️ Admin      → Configuración del sistema
🌙 Tema       → Cambiar entre dark/light mode
```

### 3️⃣ **Usar funcionalidades**
```
En cada módulo:
+ Nueva... → Crear nuevo registro
Editar     → Modificar registro existente
Eliminar   → Eliminar registro (confirmación)
Filtros    → Buscar y filtrar
```

---

## 🎨 Tema Light/Dark Mode

**Botón**: Sidebar inferior (círculo oscuro/claro)
- **Dark** (☀️): Tema moderno con colores neón
- **Light** (🌙): Tema claro con excelente contraste
- Se **guarda automáticamente** en navegador

---

## 📊 Dashboard - Lo Primero que Ves

```
┌─────────────────────────────────────────────┐
│ 📊 ÓRDENES    📦 INVENTARIO  👨‍💼 TÉCNICOS  👥 CLIENTES
│   142 total      18 items      2 libres     8 activos
│   25 pendientes  3 críticos
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ ⚠️ ALERTAS CRÍTICAS
│ • Cable Drop bajo stock (8 de 20) → Reorden
│ • Conector óptico bajo (18 de 50) → Reorden
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ ÓRDENES RECIENTES
│ ORD-0001 | García, Juan | Torres, Pablo
│ ORD-0002 | Guaycari, G. | Mendez, Silvia
└─────────────────────────────────────────────┘
```

---

## 📋 Cómo Crear una Orden

### Paso a Paso:
1. **Haz clic** en "📋 Órdenes" (sidebar)
2. **Clickea** "**+ Nueva Orden**" (arriba derecha)
3. **Completa el formulario**:
   - Cliente (desplegable)
   - Técnico disponible (desplegable)
   - Productos del inventario (agregar)
   - Prioridad (baja/normal/alta)
   - Fecha de entrega
   - Notas (opcional)
4. **Haz clic** "Crear"
5. **Verás notificación** "✓ Orden creada"

### Estados de Orden:
```
Pendiente → En progreso → Completada
                    ↓
                Cancelada (si es necesario)
```

---

## 📦 Cómo Gestionar Inventario

### Ver Stock:
1. **Haz clic** en "📦 Inventario"
2. **Verás tabla** con todos los artículos
3. **Badges de color**:
   - 🔴 **Rojo** = Stock crítico (< 50% del mínimo)
   - 🟠 **Naranja** = Stock bajo (< mínimo)
   - 🟢 **Verde** = Stock OK

### Crear Artículo:
1. **Clickea** "+ Nuevo Artículo"
2. **Completa**:
   - Código (ej: SKU-001)
   - Material/Descripción
   - Categoría (nodo, instalación, equipo, consumible, fibra)
   - Stock inicial
   - Stock mínimo
   - Stock máximo
   - Precio unitario
3. **Guardar**

### Alertas Automáticas:
Se generan automáticamente cuando:
- Stock cae por debajo del mínimo
- Stock crítico (< 50% del mínimo)
Aparecen en **Dashboard** y **Alertas**

---

## 👥 Cómo Gestionar Clientes

### Crear Cliente:
1. **Haz clic** "👥 Clientes"
2. **Clickea** "+ Nuevo Cliente"
3. **Completa**:
   - Nombre completo
   - Email
   - Teléfono
   - Tipo (residencial/comercial/industrial)
   - Dirección y ciudad
   - RUT (opcional)
4. **Guardar**

### Ver Historial:
Haz clic **sobre una orden** para ver:
- Órdenes previas del cliente
- Deuda o saldo
- Notas de interés

---

## 👨‍💼 Cómo Gestionar Empleados

### Crear Empleado:
1. **Haz clic** "👨‍💼 Empleados"
2. **Clickea** "+ Nuevo Empleado"
3. **Completa**:
   - Nombre
   - Email de empresa
   - Teléfono
   - Rol (técnico/gerente/supervisor/admin)
   - Especialidades (instalación, diagnostico, etc)
   - Documento ID
4. **Guardar**

### Disponibilidad:
- Técnicos marcados como "disponible" aparecen en asignación automática
- El sistema asigna por disponibilidad y especialidad
- Puedes cambiar manualmente en la orden

---

## 📈 Reportes y Exportación

### Crear Reporte:
1. **Haz clic** "📈 Reportes"
2. **Verás resumen** de:
   - Total de órdenes por estado
   - Ítems de inventario
   - Stock bajo
3. **Exportar**:
   - 📄 PDF (con logo y formato)
   - 📊 Excel (datos crudos)
   - 📋 CSV (compatible con otros sistemas)
   - 🖨️ Imprimir (listo para papel)

---

## ⚙️ Administración del Sistema

### Backup de Datos:
1. **Haz clic** "⚙️ Admin"
2. **Clickea** "💾 Hacer Backup"
3. Se descarga archivo de respaldo con toda la data

### Restaurar Datos:
1. **En Admin**
2. **Clickea** "♻️ Restaurar Datos"
3. **Confirma** (cuidado: reemplazará datos actuales)

### Limpieza:
1. **Clickea** "🗑️ Limpiar Caché"
2. Libera espacio del navegador

---

## 🔍 Búsqueda y Filtros

### Buscar Globalmente:
```
Barra superior derecha: Búsqueda de órdenes por ID
```

### Filtrar en Módulos:
```
Órdenes:   Por estado, técnico, cliente, fecha
Inventario: Por categoría, stock (bajo/crítico/ok)
Clientes:   Por estado, tipo
Empleados:  Por rol, disponibilidad, estado
```

---

## 🎯 Atajos Útiles

| Función | Atajo |
|---------|-------|
| Cambiar tema | Click en botón 🌙/☀️ sidebar |
| Nueva orden | Dashboard → + Nueva Orden |
| Ver alertas | Dashboard → Alertas críticas |
| Backup | Admin → Hacer Backup |
| Imprimir reporte | Reportes → Imprimir |

---

## 💾 Datos Guardados

**Todos tus datos se guardan automáticamente en el navegador**

### Ubicación:
- **Chrome**: Settings → Privacy → Clear browsing data → Cookies and cached images
- **Firefox**: Settings → Privacy → Cookies and Site Data
- **Safari**: Preferences → Privacy → Manage Website Data

⚠️ **Si limpias el almacenamiento del navegador, se pierden los datos**
→ Usa "Backup" regularmente

---

## 🐛 Solucionar Problemas

### La app no carga:
1. Refresca la página (Ctrl+R o Cmd+R)
2. Borra caché (Ctrl+Shift+Delete)
3. Abre en pestaña privada/incógnito

### Datos no se guardan:
1. Verifica que el navegador no esté en modo privado
2. Comprueba Storage disponible en sistema operativo
3. Intenta hacer backup y restaurar

### Animaciones lentas:
1. Desactiva extensiones del navegador
2. Cierra otras pestañas
3. Prueba en otro navegador

### Tema no persiste:
Limpia cookies y vuelve a seleccionar tema

---

## 📱 En Teléfono/Tablet

La app es **100% responsive**:
- Sidebar se oculta automáticamente
- Menú se adapta al tamaño
- Todas las funciones disponibles
- Touch-friendly buttons

---

## 🎓 Tips Profesionales

### 1. Usar Prioridades:
- 🔴 **CRÍTICA**: Problemas de servicio, clientes VIP
- 🔴 **ALTA**: Instalaciones nuevas, mantenimiento urgente
- 🟠 **NORMAL**: Servicio estándar
- 🟡 **BAJA**: Tareas administrativas

### 2. Alertas de Stock:
- Revisa el **Dashboard** cada mañana
- Haz **reordenes anticipadas** cuando aparezca alerta "bajo"
- No esperes a stock **crítico**

### 3. Asignación de Técnicos:
- Sistema asigna automáticamente si es posible
- Si no: asigna manualmente considerando:
  - Disponibilidad
  - Especialidad requerida
  - Distancia (próximo a trabajar)

### 4. Reportes Semanales:
- Genera reporte de órdenes completadas
- Analiza productividad por técnico
- Identifica cuellos de botella

### 5. Respaldos:
- Haz **backup** al menos 1x/semana
- Guarda en almacenamiento externo
- Documenta fecha del backup

---

## 📞 ¿Necesitas Ayuda?

### Recursos:
- 📖 Lee el **README.md** completo
- 🎬 Ver tutoriales (próximamente)
- 💬 Comunidad (próximamente)
- 📧 Contacto: support@express.com

### Reportar Bugs:
- GitHub Issues: github.com/tiendaweb/redexpres/issues
- Email: bugs@express.com

---

## 🎉 ¡Bienvenido a Express!

Ahora estás listo para comenzar. **¡Vamos a gestionar tu negocio! 💪**

---

**Última actualización**: Abril 2025  
**Versión**: 1.0.0

