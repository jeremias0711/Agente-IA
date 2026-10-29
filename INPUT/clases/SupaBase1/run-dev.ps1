# Servidor estático para ver el ejercicio desde el celular (misma red Wi-Fi).
# Uso: .\run-dev.ps1 [-Port 8080]
param([int]$Port = 8080)

$root = $PSScriptRoot
$mime = @{
  '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
  '.css' = 'text/css; charset=utf-8';   '.json' = 'application/json; charset=utf-8'
  '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.webp' = 'image/webp'
  '.svg' = 'image/svg+xml'; '.ico' = 'image/x-icon'
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
$listener.Start()

Write-Host "Sirviendo $root" -ForegroundColor Green
Write-Host "En el PC:      http://localhost:$Port/"
Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object { $_.IPAddress -notmatch '^(127|169\.254)' } |
  ForEach-Object { Write-Host "En el celular: http://$($_.IPAddress):$Port/   ($($_.InterfaceAlias))" -ForegroundColor Cyan }
Write-Host "Ctrl+C para detener.`n"

function Send($stream, $status, $type, [byte[]]$body) {
  $head = "HTTP/1.1 $status`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
  $h = [Text.Encoding]::ASCII.GetBytes($head)
  $stream.Write($h, 0, $h.Length)
  $stream.Write($body, 0, $body.Length)
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $client.ReceiveTimeout = 2000
      $stream = $client.GetStream()
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 4096, $true)
      $line = $reader.ReadLine()
      if (-not $line) { continue }
      $parts = $line.Split(' ')
      $rel = [Uri]::UnescapeDataString(($parts[1] -split '\?')[0]).TrimStart('/')
      if ($rel -eq '' -or $rel.EndsWith('/')) { $rel += 'index.html' }
      $full = [IO.Path]::GetFullPath((Join-Path $root $rel))

      if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or $full -like '*run-dev.ps1') {
        Send $stream '403 Forbidden' 'text/plain' ([Text.Encoding]::UTF8.GetBytes('403'))
        $code = 403
      } elseif (Test-Path -LiteralPath $full -PathType Leaf) {
        $type = $mime[[IO.Path]::GetExtension($full).ToLower()]
        if (-not $type) { $type = 'application/octet-stream' }
        Send $stream '200 OK' $type ([IO.File]::ReadAllBytes($full))
        $code = 200
      } else {
        Send $stream '404 Not Found' 'text/plain' ([Text.Encoding]::UTF8.GetBytes('404 no encontrado'))
        $code = 404
      }
      Write-Host "$code /$rel"
    } catch {
      # conexión cortada por el navegador: se ignora
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
