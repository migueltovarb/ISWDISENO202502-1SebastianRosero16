# 🚀 Instrucciones de Ejecución - FAST

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- ✅ **Java 17** o superior ([Descargar](https://www.oracle.com/java/technologies/downloads/#java17))
- ✅ **Maven 3.6** o superior ([Descargar](https://maven.apache.org/download.cgi))
- ✅ **Node.js 16** o superior ([Descargar](https://nodejs.org/))
- ✅ **Cuenta en MongoDB Atlas** ([Crear cuenta gratis](https://www.mongodb.com/cloud/atlas/register))

### Verificar instalaciones:

```bash
java -version
mvn -version
node -version
npm -version
```

---

## 🗄️ Paso 1: Configurar MongoDB Atlas

1. Inicia sesión en [MongoDB Atlas](https://cloud.mongodb.com/)
2. Crea un cluster (puedes usar el tier gratuito M0)
3. Crea un usuario de base de datos con permisos de lectura/escritura
4. Agrega tu IP a la whitelist (o permite acceso desde cualquier IP: `0.0.0.0/0`)
5. Obtén tu connection string (debe verse así):
   ```
   mongodb+srv://usuario:contraseña@cluster.mongodb.net/fast_db
   ```

---

## 🔧 Paso 2: Configurar el Backend

1. Navega a la carpeta del backend:
   ```bash
   cd "Backend Fast/backend"
   ```

2. Abre el archivo `src/main/resources/application.properties`

3. Actualiza la URI de MongoDB con tus credenciales:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://TU_USUARIO:TU_CONTRASEÑA@TU_CLUSTER.mongodb.net/fast_db?retryWrites=true&w=majority
   spring.data.mongodb.database=fast_db
   ```

4. Guarda el archivo

---

## ▶️ Paso 3: Ejecutar el Backend

### Opción 1: Con Maven (Recomendado)

```bash
# Desde la carpeta Backend Fast/backend
mvn clean install
mvn spring-boot:run
```

### Opción 2: Con el JAR compilado

```bash
# Compilar
mvn clean package

# Ejecutar
java -jar target/fast-pedidos-1.0.0.jar
```

**✅ El backend estará corriendo en:** `http://localhost:8080`

Deberías ver este mensaje:
```
===============================================
🍽️  FAST Backend iniciado exitosamente
📍 URL: http://localhost:8080
📊 MongoDB: fast_db
✅ 4 HUs implementadas
===============================================
```

---

## 🎨 Paso 4: Ejecutar el Frontend

**Abre una NUEVA terminal** (deja el backend corriendo en la otra)

1. Navega a la carpeta del frontend:
   ```bash
   cd "Frontend Fast"
   ```

2. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

**✅ El frontend estará corriendo en:** `http://localhost:3000`

Se abrirá automáticamente en tu navegador.

---

## 📦 Paso 5: Cargar Datos Iniciales (Opcional)

Si quieres cargar productos de ejemplo en MongoDB:

1. Asegúrate de que el backend esté corriendo
2. Usa Postman o cualquier cliente HTTP
3. Importa los productos desde `Backend Fast/datos/productos-iniciales.json`

O crea productos manualmente desde el panel de administración del frontend.

---

## ✅ Verificación de Funcionamiento

### Backend:
1. Abre: `http://localhost:8080/api/productos/menu`
2. Deberías ver un JSON con productos (puede estar vacío al inicio)

### Frontend:
1. Abre: `http://localhost:3000`
2. Deberías ver la página principal con el menú
3. Navega a `/admin` para el panel de administración

### MongoDB Atlas:
1. Ve a tu cluster en MongoDB Atlas
2. Click en "Browse Collections"
3. Deberías ver la base de datos `fast_db` con las colecciones:
   - `productos`
   - `pedidos`
   - `clientes`
   - `administradores`

---

## 🔄 Flujo de Prueba Completo

### Como Cliente:

1. **Ver el menú**: Abre `http://localhost:3000`
2. **Personalizar pedido**: Click en un producto → Selecciona tamaño e ingredientes
3. **Agregar al carrito**: Click en "Agregar al Carrito"
4. **Confirmar pedido**: 
   - Ve al carrito
   - Ingresa tu correo
   - Selecciona tipo de entrega
   - Click en "Confirmar Pedido"
5. **Seguir pedido**: Copia el ID del pedido y ve a "Estado de Pedido"

### Como Administrador:

1. **Ver pedidos**: Abre `http://localhost:3000/admin`
2. **Actualizar estado**: Click en los botones de estado
3. **Verificar notificación**: Se enviará automáticamente al cliente

---

## 🛑 Detener el Proyecto

### Backend:
- Presiona `Ctrl + C` en la terminal donde corre el backend

### Frontend:
- Presiona `Ctrl + C` en la terminal donde corre el frontend

---

## ⚠️ Solución de Problemas

### Error: "Cannot connect to MongoDB"
- ✅ Verifica que tu IP esté en la whitelist de MongoDB Atlas
- ✅ Verifica que el usuario y contraseña sean correctos
- ✅ Verifica que la connection string esté bien escrita

### Error: "Port 8080 already in use"
- ✅ Detén cualquier otra aplicación que use el puerto 8080
- ✅ O cambia el puerto en `application.properties`: `server.port=8081`

### Error: "Port 3000 already in use"
- ✅ Detén cualquier otra aplicación que use el puerto 3000
- ✅ O usa otro puerto cuando npm lo pregunte

### Frontend no se conecta al Backend
- ✅ Verifica que el backend esté corriendo en `http://localhost:8080`
- ✅ Verifica que no haya errores de CORS en la consola del navegador

---

## 📞 Contacto

Si tienes problemas, revisa:
- Los logs del backend en la terminal
- La consola del navegador (F12) para errores del frontend
- Las colecciones en MongoDB Atlas

---

## 🎉 ¡Listo!

Tu sistema FAST está corriendo correctamente. Ahora puedes:
- Crear pedidos como cliente
- Gestionar pedidos como administrador
- Ver las notificaciones en tiempo real
- Personalizar productos con diferentes tamaños e ingredientes

**¡Disfruta tu plataforma FAST!** 🍽️
