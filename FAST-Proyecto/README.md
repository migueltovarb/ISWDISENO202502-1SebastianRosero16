# 🍽️ FAST - Fast And Smart Takeout

Sistema de pedidos en línea para restaurantes desarrollado con Spring Boot, React y MongoDB Atlas.

## 📋 Descripción

FAST es una plataforma completa que permite a los clientes realizar pedidos en línea, personalizar sus órdenes y recibir notificaciones en tiempo real sobre el estado de sus pedidos. Los administradores pueden gestionar productos y actualizar estados de pedidos de manera eficiente.

## 🚀 Tecnologías Utilizadas

### Backend
- **Java 17** (LTS)
- **Spring Boot 3.2.0**
- **Spring Data MongoDB**
- **MongoDB Atlas** (Base de datos en la nube)
- **Maven** (Gestión de dependencias)
- **API REST** (Arquitectura)

### Frontend
- **React 18**
- **Tailwind CSS** (Estilos)
- **Axios** (Peticiones HTTP)
- **React Router** (Navegación)

## ✨ Funcionalidades Principales

### Para Clientes
- ✅ Visualización del menú completo con productos disponibles
- ✅ Personalización de pedidos (tamaño e ingredientes)
- ✅ Selección de tipo de entrega (recoger o domicilio)
- ✅ Seguimiento en tiempo real del estado del pedido
- ✅ Notificaciones automáticas cuando el pedido está listo

### Para Administradores
- ✅ Gestión de productos (crear, actualizar, eliminar)
- ✅ Control de disponibilidad de productos
- ✅ Actualización de estados de pedidos
- ✅ Vista de todos los pedidos con filtros por estado
- ✅ Envío automático de notificaciones a clientes

## 📁 Estructura del Proyecto

```
FAST/
├── Backend Fast/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/fast/pedidos/
│   │   │   │   │   ├── config/         # Configuración (CORS)
│   │   │   │   │   ├── controller/     # Controladores REST
│   │   │   │   │   ├── dto/            # Data Transfer Objects
│   │   │   │   │   ├── model/          # Entidades del dominio
│   │   │   │   │   ├── repository/     # Repositorios MongoDB
│   │   │   │   │   ├── service/        # Lógica de negocio
│   │   │   │   │   └── FastApplication.java
│   │   │   │   └── resources/
│   │   │   │       └── application.properties
│   │   └── pom.xml
│   └── datos/
│       └── productos-iniciales.json
│
└── Frontend Fast/
    ├── public/
    ├── src/
    │   ├── components/      # Componentes React
    │   ├── services/        # Servicios API
    │   ├── utils/           # Utilidades
    │   └── App.jsx
    ├── package.json
    └── tailwind.config.js
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Java 17 o superior
- Node.js 16 o superior
- Maven 3.6 o superior
- Cuenta en MongoDB Atlas

### Backend

1. Navega a la carpeta del backend:
```bash
cd "Backend Fast/backend"
```

2. Configura la conexión a MongoDB Atlas en `src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://usuario:contraseña@cluster.mongodb.net/fast_db
spring.data.mongodb.database=fast_db
```

3. Compila y ejecuta el proyecto:
```bash
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

### Frontend

1. Navega a la carpeta del frontend:
```bash
cd "Frontend Fast"
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

El frontend estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### Productos
- `GET /api/productos/menu` - Obtener productos disponibles
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/{id}` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

### Pedidos
- `POST /api/pedidos` - Crear nuevo pedido
- `GET /api/pedidos` - Obtener todos los pedidos
- `GET /api/pedidos/{id}` - Obtener pedido por ID
- `GET /api/pedidos/estado/{estado}` - Filtrar por estado
- `PUT /api/pedidos/{id}/estado` - Actualizar estado del pedido

## 🎯 Historias de Usuario Implementadas

### HU005 - Visualización del Menú
Permite al cliente ver todos los productos disponibles con nombre, descripción, precio y disponibilidad.

### HU008 - Personalizar Pedido
Permite al cliente personalizar su pedido eligiendo tamaño (pequeño, mediano, grande) y agregando/removiendo ingredientes.

### HU010 - Notificación al Cliente
El sistema envía notificaciones automáticas cuando el pedido cambia de estado (Listo, Enviado).

### HU011 - Actualizar Estado del Pedido
Permite al administrador cambiar el estado del pedido (Pendiente → En Preparación → Listo → Enviado → Entregado).

## 💰 Sistema de Precios

- **Tamaño Pequeño**: Precio base
- **Tamaño Mediano**: +$3.000 COP
- **Tamaño Grande**: +$5.000 COP
- **Ingrediente Extra**: +$2.000 COP cada uno

## 🔄 Estados de Pedido

1. **PENDIENTE**: Pedido recibido, esperando confirmación
2. **EN_PREPARACION**: Pedido en proceso de preparación
3. **LISTO**: Pedido listo para recoger
4. **ENVIADO**: Pedido en camino (para domicilio)
5. **ENTREGADO**: Pedido completado

## 👥 Autores

- Sebastian Orlando Manchabajoy Rosero

## 📄 Licencia

Este proyecto fue desarrollado como trabajo académico para la Universidad de Nariño.

## 🙏 Agradecimientos

- Profesor del curso de Arquitectura de Software
- Universidad de Nariño
- Comunidad de Spring Boot y React
