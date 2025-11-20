# Vehicle API

## Descripción
Esta API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar vehículos. Está desarrollada en Java utilizando Spring Boot y MongoDB como base de datos.

## Requisitos
- Java 17 o superior
- Maven 3.8 o superior
- MongoDB Atlas (o una instancia local de MongoDB)

## Configuración
1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd VehicleAPI
   ```
3. Configura la conexión a MongoDB en el archivo `src/main/resources/application.properties`.

## Ejecución
1. Compila y ejecuta la aplicación:
   ```bash
   mvn spring-boot:run
   ```
2. La aplicación estará disponible en: `http://localhost:8080`

## Endpoints
### Base URL
`http://localhost:8080`

### Endpoints CRUD
- **GET /vehicles**: Obtiene la lista de todos los vehículos.
- **POST /vehicles**: Crea un nuevo vehículo.
  - Ejemplo de cuerpo JSON:
    ```json
    {
      "marca": "Toyota",
      "modelo": "Corolla",
      "anio": 2020,
      "color": "Rojo",
      "placa": "ABC123",
      "tipo": "Sedán"
    }
    ```
- **PUT /vehicles/{id}**: Actualiza un vehículo existente.
  - Ejemplo de cuerpo JSON:
    ```json
    {
      "marca": "Honda",
      "modelo": "Civic",
      "anio": 2021,
      "color": "Azul",
      "placa": "XYZ789",
      "tipo": "Sedán"
    }
    ```
- **DELETE /vehicles/{id}**: Elimina un vehículo por su ID.

## Pruebas con Postman
1. Importa la colección de Postman (si está disponible).
2. Realiza las pruebas de los endpoints utilizando la URL base `http://localhost:8080`.

## Notas
- Asegúrate de que MongoDB esté configurado correctamente y accesible desde la aplicación.
- Si necesitas cambiar el puerto, edita la propiedad `server.port` en `application.properties`.
