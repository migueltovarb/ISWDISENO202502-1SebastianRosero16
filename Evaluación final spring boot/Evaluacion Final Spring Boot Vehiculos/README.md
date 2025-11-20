# Evaluacion Final Spring Boot Vehiculos

Este directorio contiene el proyecto "Vehicle API" (Java + Spring Boot + MongoDB).

Si ves este README es porque fue restaurado después de un cambio en el árbol del repositorio.

Para ejecutar localmente:

1. Asegúrate de tener Java 17, Maven y MongoDB instalados y en ejecución.
2. Compilar: `mvn -DskipTests package`
3. Ejecutar: `java -jar target/vehicle-api-1.0.0.jar --server.port=8081`

Endpoints principales:
- `GET /api/vehicles`
- `POST /api/vehicles`
- `PUT /api/vehicles/{id}`
- `DELETE /api/vehicles/{id}`
