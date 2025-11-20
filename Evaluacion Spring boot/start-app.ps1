# start-app.ps1
# Script para compilar y arrancar la aplicación en background en Windows PowerShell
# 1) Compila el proyecto (skip tests)
# 2) Ejecuta el JAR generado en segundo plano en el puerto 8081
# 3) Verifica el endpoint /api/vehicles

Param(
    [int]$Port = 8081
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

Write-Host "1) Compilando proyecto (mvn -DskipTests package)" -ForegroundColor Cyan
mvn -DskipTests package

Write-Host "2) Iniciando JAR en segundo plano (puerto $Port)" -ForegroundColor Cyan
# Ejecuta el JAR en background usando Start-Job para que la terminal quede libre
$jarPath = Join-Path -Path $root -ChildPath "target\vehicle-api-1.0.0.jar"
if (-Not (Test-Path $jarPath)) {
    Write-Host "ERROR: No se encontró $jarPath" -ForegroundColor Red
    exit 1
}

Start-Job -ScriptBlock {
    param($jar, $port)
    Set-Location (Split-Path -Parent $jar)
    & java -jar $jar --server.port=$port
} -ArgumentList $jarPath, $Port | Out-Null

Write-Host "Esperando 8 segundos para que la aplicación arranque..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

Write-Host "3) Verificando endpoint http://localhost:$Port/api/vehicles" -ForegroundColor Cyan
try {
    $resp = Invoke-RestMethod -Uri "http://localhost:$Port/api/vehicles" -Method GET -ErrorAction Stop
    Write-Host "✅ API responde correctamente en puerto $Port" -ForegroundColor Green
    Write-Host "Total de vehículos: $($resp.Count)" -ForegroundColor Yellow
} catch {
    Write-Host "⚠️ No se pudo alcanzar la API en http://localhost:$Port/api/vehicles" -ForegroundColor Yellow
    Write-Host "Revisa que MongoDB esté corriendo y que el puerto $Port esté libre." -ForegroundColor Yellow
}

Write-Host "Para ver los logs del job, usa: Get-Job | Receive-Job -Keep" -ForegroundColor Cyan
Write-Host "Para detener el job: Get-Job | Stop-Job; Get-Job | Remove-Job" -ForegroundColor Cyan
