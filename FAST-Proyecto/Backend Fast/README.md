# 🔧 FAST Backend

Backend del sistema FAST desarrollado con Spring Boot, Java 17 y MongoDB Atlas.

## 🚀 Tecnologías

- Java 17 (LTS)
- Spring Boot 3.2.0
- Spring Data MongoDB
- MongoDB Atlas
- Maven

## 📁 Estructura

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/fast/pedidos/
│   │   │   ├── config/         # Configuración CORS
│   │   │   ├── controller/     # Controladores REST
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── model/          # Entidades del dominio
│   │   │   ├── repository/     # Repositorios MongoDB
│   │   │   ├── service/        # Lógica de negocio
│   │   │   └── FastApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## ⚙️ Configuración

1. Configura MongoDB Atlas en `application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://usuario:contraseña@cluster.mongodb.net/fast_db
spring.data.mongodb.database=fast_db
server.port=8080
```

2. Compila el proyecto:
```bash
mvn clean install
```

3. Ejecuta la aplicación:
```bash
mvn spring-boot:run
```

O ejecuta el JAR generado:
```bash
java -jar target/fast-pedidos-1.0.0.jar
```

## 📡 Endpoints Principales

### Productos
- `GET /api/productos/menu` - Menú disponible
- `POST /api/productos` - Crear producto
- `PUT /api/productos/{id}` - Actualizar producto

### Pedidos
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos/{id}` - Obtener pedido
- `PUT /api/pedidos/{id}/estado` - Actualizar estado

## 🗄️ Colecciones MongoDB

- `productos` - Productos del menú
- `pedidos` - Pedidos realizados
- `clientes` - Información de clientes
- `administradores` - Usuarios administradores

## 🔐 Seguridad

- CORS configurado para `http://localhost:3000`
- Validación de datos en todos los endpoints
- Manejo de errores con respuestas JSON estructuradas

## 📦 Dependencias Principales

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

## 🧪 Pruebas

Usa Postman o cualquier cliente HTTP para probar los endpoints. Los datos de ejemplo están en `datos/productos-iniciales.json`.
