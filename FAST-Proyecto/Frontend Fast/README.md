# 🎨 FAST Frontend

Interfaz de usuario del sistema FAST desarrollada con React y Tailwind CSS.

## 🚀 Tecnologías

- React 18
- Tailwind CSS
- React Router DOM
- Axios
- JavaScript (ES6+)

## 📁 Estructura

```
src/
├── components/        # Componentes React
│   ├── AdminPanel.jsx    # Panel de administración
│   ├── Cart.jsx          # Carrito de compras
│   ├── Menu.jsx          # Visualización del menú
│   ├── OrderStatus.jsx   # Estado del pedido
│   └── Toast.jsx         # Notificaciones
├── services/          # Servicios API
│   └── api.js            # Configuración Axios
├── utils/             # Utilidades
│   └── formatCurrency.js # Formato de moneda
├── App.jsx            # Componente principal
└── index.js           # Punto de entrada
```

## ⚙️ Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🎨 Características

### Para Clientes
- ✅ Visualización del menú con productos disponibles
- ✅ Personalización de pedidos (tamaño e ingredientes)
- ✅ Carrito de compras con cálculo automático de precios
- ✅ Selección de tipo de entrega (recoger/domicilio)
- ✅ Seguimiento en tiempo real del pedido
- ✅ Notificaciones automáticas de cambios de estado

### Para Administradores
- ✅ Panel de gestión de pedidos
- ✅ Filtros por estado de pedido
- ✅ Actualización de estados con confirmación
- ✅ Vista detallada de cada pedido
- ✅ Notificaciones modernas (sin alertas del navegador)

## 🎨 Estilos

El proyecto usa Tailwind CSS con una configuración personalizada:

```javascript
// tailwind.config.js
colors: {
  'fast-blue': '#1e40af',
  'fast-orange': '#f97316',
}
```

## 📡 Conexión con Backend

El frontend se conecta al backend en `http://localhost:8080`. Configura la URL base en `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🔔 Sistema de Notificaciones

- Toast moderno para mensajes de éxito/error
- Modal de confirmación para acciones importantes
- Notificaciones en tiempo real de cambios de estado
- Polling automático cada 10 segundos en seguimiento de pedidos

## 📦 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Crea build de producción
- `npm test` - Ejecuta las pruebas

## 🌐 Navegación

- `/` - Página principal con menú
- `/carrito` - Carrito de compras
- `/pedido/:id` - Estado del pedido
- `/admin` - Panel de administración

## 💡 Componentes Principales

### Menu.jsx
Muestra todos los productos disponibles con opción de personalización.

### Cart.jsx
Gestiona el carrito de compras y el proceso de checkout.

### OrderStatus.jsx
Permite seguir el estado de un pedido en tiempo real.

### AdminPanel.jsx
Panel completo de administración con gestión de pedidos.

### Toast.jsx
Sistema de notificaciones moderno y elegante.

## 🎯 Formato de Moneda

Los precios se muestran en pesos colombianos (COP) con el formato:
```
$15.000 COP
```

Implementado en `utils/formatCurrency.js`
