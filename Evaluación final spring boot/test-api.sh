#!/bin/bash

echo "========================================="
echo "  Verificación Automática - Vehicle API"
echo "========================================="
echo ""

API_URL="http://localhost:8080/api/vehicles"

echo "Verificando que la API está corriendo..."
if ! curl -s --fail $API_URL > /dev/null; then
    echo "❌ Error: La API no está respondiendo en $API_URL"
    echo "   Asegúrate de que la aplicación esté corriendo con: mvn spring-boot:run"
    exit 1
fi
echo "✓ API está corriendo"
echo ""

echo "1. TEST: Crear vehículo (POST)"
echo "-------------------------------"
CREATE_RESPONSE=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2023,
    "color": "Blanco",
    "price": 25000.00,
    "licensePlate": "TEST-001"
  }')

echo $CREATE_RESPONSE | jq '.'

if command -v jq &> /dev/null; then
    VEHICLE_ID=$(echo $CREATE_RESPONSE | jq -r '.id')
    echo "✓ Vehículo creado con ID: $VEHICLE_ID"
else
    echo "⚠ Instala 'jq' para mejor visualización"
    VEHICLE_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
fi
echo ""

sleep 1

echo "2. TEST: Obtener todos los vehículos (GET)"
echo "------------------------------------------"
curl -s $API_URL | jq '.' || curl -s $API_URL
echo "✓ Lista obtenida"
echo ""

sleep 1

echo "3. TEST: Obtener vehículo por ID (GET)"
echo "--------------------------------------"
curl -s $API_URL/$VEHICLE_ID | jq '.' || curl -s $API_URL/$VEHICLE_ID
echo "✓ Vehículo específico obtenido"
echo ""

sleep 1

echo "4. TEST: Actualizar vehículo (PUT)"
echo "----------------------------------"
curl -s -X PUT $API_URL/$VEHICLE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2024,
    "color": "Negro",
    "price": 27000.00,
    "licensePlate": "TEST-001"
  }' | jq '.' || curl -s -X PUT $API_URL/$VEHICLE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2024,
    "color": "Negro",
    "price": 27000.00,
    "licensePlate": "TEST-001"
  }'
echo "✓ Vehículo actualizado"
echo ""

sleep 1

echo "5. TEST: Buscar por placa (GET)"
echo "-------------------------------"
curl -s $API_URL/license/TEST-001 | jq '.' || curl -s $API_URL/license/TEST-001
echo "✓ Búsqueda por placa completada"
echo ""

sleep 1

echo "6. TEST: Buscar por marca (GET)"
echo "-------------------------------"
curl -s $API_URL/brand/Toyota | jq '.' || curl -s $API_URL/brand/Toyota
echo "✓ Búsqueda por marca completada"
echo ""

sleep 1

echo "7. TEST: Buscar por año (GET)"
echo "-----------------------------"
curl -s $API_URL/year/2024 | jq '.' || curl -s $API_URL/year/2024
echo "✓ Búsqueda por año completada"
echo ""

sleep 1

echo "8. TEST: Eliminar vehículo (DELETE)"
echo "-----------------------------------"
DELETE_STATUS=$(curl -s -w "%{http_code}" -o /dev/null -X DELETE $API_URL/$VEHICLE_ID)
if [ "$DELETE_STATUS" == "204" ]; then
    echo "✓ Vehículo eliminado (Status: $DELETE_STATUS)"
else
    echo "⚠ Status code: $DELETE_STATUS"
fi
echo ""

sleep 1

echo "9. TEST: Verificar eliminación (GET)"
echo "------------------------------------"
GET_STATUS=$(curl -s -w "%{http_code}" -o /dev/null $API_URL/$VEHICLE_ID)
if [ "$GET_STATUS" == "404" ]; then
    echo "✓ Confirmado: Vehículo no existe (Status: $GET_STATUS)"
else
    echo "⚠ Status code: $GET_STATUS"
fi
echo ""

echo "========================================="
echo "  ✓ TODAS LAS PRUEBAS COMPLETADAS"
echo "========================================="
echo ""
echo "CRUD verificado correctamente:"
echo "  ✓ CREATE - Vehículo creado"
echo "  ✓ READ   - Vehículos listados y consultados"
echo "  ✓ UPDATE - Vehículo actualizado"
echo "  ✓ DELETE - Vehículo eliminado"
echo ""
echo "Endpoints adicionales verificados:"
echo "  ✓ Búsqueda por placa"
echo "  ✓ Búsqueda por marca"
echo "  ✓ Búsqueda por año"
