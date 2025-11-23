# ✅ Checklist de Verificación - FAST

Usa este checklist para verificar que todo esté correctamente instalado y configurado.

## 📋 Prerrequisitos

### Java
```bash
java -version
```
**Esperado:** `java version "17.x.x"` o superior

- [ ] Java 17 o superior instalado

### Maven
```bash
mvn -version
```
**Esperado:** `Apache Maven 3.6.x` o superior

- [ ] Maven instalado correctamente

### Node.js
```bash
node -version
```
**Esperado:** `v16.x.x` o superior

- [ ] Node.js instalado correctamente

### NPM
```bash
npm -version
```
**Esperado:** `8.x.x` o superior

- [ ] NPM instalado correctamente

---

## 🗄️ MongoDB Atlas

- [ ] Cuenta creada en MongoDB Atlas
- [ ] Cluster creado (M0 Free Tier está bien)
- [ ] Usuario de base de datos creado
- [ ] IP agregada a la whitelist (o `0.0.0.0/0` para permitir todas)
- [ ] Connection string obtenido

---

## 🔧 Configuración del Backend

- [ ] Archivo `Backend Fast/backend/src/main/resources/application.properties` existe
- [ ] Connection string de MongoDB actualizado con tus credenciales
- [ ] Puerto 8080 disponible (no usado por otra aplicación)

---

## 🎨 Configuración del Frontend

- [ ] Carpeta `Frontend Fast/node_modules` existe (después de `npm install`)
- [ ] Puerto 3000 disponible (no usado por otra aplicación)
- [ ] Archivo `Frontend Fast/src/services/api.js` apunta a `http://localhost:8080`

---

## ▶️ Ejecución del Backend

### Compilar el proyecto:
```bash
cd "Backend Fast/backend"
mvn clean install
```

**Verificar:**
- [ ] Compilación exitosa (BUILD SUCCESS)
- [ ] No hay errores en la consola
- [ ] Archivo `target/fast-pedidos-1.0.0.jar` creado

### Ejecutar el backend:
```bash
mvn spring-boot:run
```

**Verificar:**
- [ ] Backend inicia sin errores
- [ ] Mensaje de éxito aparece en consola
- [ ] Se conecta a MongoDB Atlas correctamente
- [ ] Puerto 8080 está escuchando

### Probar endpoint:
Abre en el navegador: `http://localhost:8080/api/productos/menu`

**Verificar:**
- [ ] Responde con JSON (puede estar vacío: `[]`)
- [ ] No hay error 404 o 500

---

## 🎨 Ejecución del Frontend

### Instalar dependencias:
```bash
cd "Frontend Fast"
npm install
```

**Verificar:**
- [ ] Instalación exitosa
- [ ] Carpeta `node_modules` creada
- [ ] No hay errores críticos

### Ejecutar el frontend:
```bash
npm start
```

**Verificar:**
- [ ] Frontend inicia sin errores
- [ ] Se abre automáticamente en `http://localhost:3000`
- [ ] No hay errores en la consola del navegador (F12)

---

## 🧪 Pruebas Funcionales

### Visualización del Menú (HU005)
- [ ] La página principal carga correctamente
- [ ] Se muestra el menú (puede estar vacío al inicio)
- [ ] No hay errores en la consola

### Crear Producto (Administrador)
- [ ] Puedes acceder a `/admin`
- [ ] El panel de administración carga correctamente

### Personalizar Pedido (HU008)
- [ ] Puedes hacer click en un producto
- [ ] Se abre el modal de personalización
- [ ] Puedes seleccionar tamaño
- [ ] Puedes agregar ingredientes extra
- [ ] El precio se actualiza correctamente

### Crear Pedido
- [ ] Puedes agregar productos al carrito
- [ ] El carrito muestra los productos correctamente
- [ ] Puedes ingresar correo y dirección
- [ ] Puedes confirmar el pedido
- [ ] Recibes un ID de pedido

### Actualizar Estado (HU011)
- [ ] En el panel admin, puedes ver el pedido creado
- [ ] Puedes cambiar el estado del pedido
- [ ] Aparece el modal de confirmación (no alert feo)
- [ ] Se muestra notificación de éxito (toast verde)

### Notificación al Cliente (HU010)
- [ ] Al cambiar estado a LISTO o ENVIADO
- [ ] Se muestra mensaje de notificación enviada
- [ ] En la vista de seguimiento, se actualiza el estado

---

## 🗄️ Verificación en MongoDB Atlas

1. Ve a MongoDB Atlas → Browse Collections
2. Selecciona la base de datos `fast_db`

**Verificar:**
- [ ] Colección `productos` existe
- [ ] Colección `pedidos` existe (si creaste algún pedido)
- [ ] Los datos se guardan correctamente

---

## 🎯 Prueba Completa del Flujo

### Flujo Cliente:
1. [ ] Abrir `http://localhost:3000`
2. [ ] Ver el menú
3. [ ] Click en un producto
4. [ ] Personalizar (tamaño MEDIANO + 2 ingredientes extra)
5. [ ] Agregar al carrito
6. [ ] Ir al carrito
7. [ ] Ingresar correo: `test@gmail.com`
8. [ ] Seleccionar "Domicilio"
9. [ ] Ingresar dirección: `Calle 123`
10. [ ] Confirmar pedido
11. [ ] Copiar ID del pedido
12. [ ] Ir a "Estado de Pedido"
13. [ ] Buscar con el ID
14. [ ] Ver estado PENDIENTE

### Flujo Administrador:
1. [ ] Abrir `http://localhost:3000/admin`
2. [ ] Ver el pedido en la lista
3. [ ] Click en "Mover a EN_PREPARACION"
4. [ ] Confirmar en el modal
5. [ ] Ver toast de éxito
6. [ ] Click en "Marcar LISTO"
7. [ ] Confirmar
8. [ ] Ver mensaje de notificación enviada

### Verificación Final:
1. [ ] Volver a la vista de seguimiento del cliente
2. [ ] Click en "Actualizar Estado"
3. [ ] Ver que el estado cambió a LISTO
4. [ ] Ver el mensaje de notificación

---

## ✅ Resultado Final

Si todos los checkboxes están marcados:

🎉 **¡Tu plataforma FAST está funcionando perfectamente!**

Estás listo para:
- ✅ Subir el proyecto al repositorio
- ✅ Presentarlo al profesor
- ✅ Demostrar todas las funcionalidades

---

## ⚠️ Si algo no funciona:

1. **Revisa los logs del backend** en la terminal
2. **Revisa la consola del navegador** (F12 → Console)
3. **Verifica MongoDB Atlas** (Collections → fast_db)
4. **Consulta** `INSTRUCCIONES_EJECUCION.md` para solución de problemas

---

## 📊 Resumen de Tecnologías Verificadas

- ✅ Java 17
- ✅ Spring Boot 3.2.0
- ✅ API REST (endpoints funcionando)
- ✅ MongoDB Atlas (conexión exitosa)
- ✅ React 18
- ✅ Tailwind CSS
- ✅ 4 Historias de Usuario implementadas

**¡Todo listo para subir al repositorio!** 🚀
