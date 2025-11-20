<#
crud-test.ps1
Script de pruebas CRUD para Vehicle API (PowerShell)
Usar: Ejecutar con la API ya levantada en `http://localhost:8081`
#>
Param(
    [int]$Port = 8081
)

$api = "http://localhost:$Port/api/vehicles"
Write-Host "== CRUD TEST AUTOMÁTICO (PowerShell) ==" -ForegroundColor Cyan

Write-Host 'POST -> crear vehículo de prueba' -ForegroundColor Yellow
$body = @{ brand='TestBrand'; model='T1'; year=2025; color='Blue'; price=12345.67; licensePlate='UT-TEST-PS' } | ConvertTo-Json
$resp = Invoke-RestMethod -Uri $api -Method Post -Body $body -ContentType 'application/json' -ErrorAction Stop
if ($resp -ne $null) { Write-Host "CREADO ID: $($resp.id)" -ForegroundColor Green } else { Write-Host 'Fallo en CREATE' -ForegroundColor Red }
$id = $resp.id

Write-Host 'GET -> todos' -ForegroundColor Yellow
Invoke-RestMethod -Uri $api -Method Get | ConvertTo-Json -Depth 4 | Write-Host

Write-Host 'GET -> por id' -ForegroundColor Yellow
Invoke-RestMethod -Uri ("$api/$id") -Method Get | ConvertTo-Json -Depth 4 | Write-Host

Write-Host 'PUT -> actualizar año a 2026' -ForegroundColor Yellow
$upd = @{ brand='TestBrand'; model='T1'; year=2026; color='Black'; price=13000; licensePlate='UT-TEST-PS' } | ConvertTo-Json
Invoke-RestMethod -Uri ("$api/$id") -Method Put -Body $upd -ContentType 'application/json' | ConvertTo-Json -Depth 4 | Write-Host

Write-Host 'GET -> por placa' -ForegroundColor Yellow
Invoke-RestMethod -Uri ("$api/license/UT-TEST-PS") -Method Get | ConvertTo-Json -Depth 4 | Write-Host

Write-Host 'GET -> por marca' -ForegroundColor Yellow
Invoke-RestMethod -Uri ("$api/brand/TestBrand") -Method Get | ConvertTo-Json -Depth 4 | Write-Host

Write-Host 'GET -> por año 2026' -ForegroundColor Yellow
Invoke-RestMethod -Uri ("$api/year/2026") -Method Get | ConvertTo-Json -Depth 4 | Write-Host

Write-Host 'DELETE -> borrar creado' -ForegroundColor Yellow
try { Invoke-RestMethod -Uri ("$api/$id") -Method Delete; Write-Host 'DELETE OK (204 expected)' -ForegroundColor Green } catch { Write-Host "DELETE returned: $($_.Exception.Message)" -ForegroundColor Red }

Write-Host 'GET -> verificar eliminación (debe fallar)' -ForegroundColor Yellow
try { Invoke-RestMethod -Uri ("$api/$id") -Method Get -ErrorAction Stop; Write-Host 'ERROR: sigue existiendo' -ForegroundColor Red } catch { Write-Host 'Confirmado: no encontrado (404) o error similar' -ForegroundColor Green }

Write-Host '== FIN PRUEBAS CRUD ==' -ForegroundColor Cyan
