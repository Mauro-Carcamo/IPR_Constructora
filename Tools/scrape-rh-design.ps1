param(
  [string]$Url = "https://www.rh.design/",
  [string]$OutDir = ""
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function New-Dir([string]$Path) {
  if ([string]::IsNullOrWhiteSpace($Path)) { throw "OutDir vacío." }
  New-Item -ItemType Directory -Force -Path $Path | Out-Null
}

function To-FileName([string]$url) {
  $u = [uri]$url
  $name = [IO.Path]::GetFileName($u.AbsolutePath)
  if ([string]::IsNullOrWhiteSpace($name)) { $name = "index" }
  # remover querystring para guardar
  $name = $name -replace "\?.*$", ""
  return $name
}

function Save-Text([string]$path, [string]$content) {
  $dir = Split-Path -Parent $path
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  [IO.File]::WriteAllText($path, $content, [Text.Encoding]::UTF8)
}

function Save-Bytes([string]$path, [byte[]]$bytes) {
  $dir = Split-Path -Parent $path
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  [IO.File]::WriteAllBytes($path, $bytes)
}

function Get-AbsoluteUrl([string]$baseUrl, [string]$maybeRelative) {
  try {
    $uri = [uri]$maybeRelative
    if ($uri.IsAbsoluteUri) { return $uri.AbsoluteUri }
  } catch {}
  return ([uri]::new([uri]$baseUrl, $maybeRelative)).AbsoluteUri
}

function Download-Text([string]$url) {
  return (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
}

function Download-Bytes([string]$url) {
  $res = Invoke-WebRequest -Uri $url -UseBasicParsing
  if ($res.RawContentStream) {
    $ms = New-Object System.IO.MemoryStream
    try {
      $res.RawContentStream.CopyTo($ms)
      return ,$ms.ToArray()
    } finally {
      $ms.Dispose()
    }
  }
  # fallback
  return ,[Text.Encoding]::UTF8.GetBytes([string]$res.Content)
}

function Extract-AssetUrls([string]$html, [string]$baseUrl) {
  $urls = New-Object System.Collections.Generic.HashSet[string]
  $patternLink = '<link[^>]+href=(?:"|'')([^"''<>]+)(?:"|'')[^>]*>'
  $patternScript = '<script[^>]+src=(?:"|'')([^"''<>]+)(?:"|'')[^>]*>'

  # <link href="...">
  foreach ($m in [regex]::Matches($html, $patternLink, "IgnoreCase")) {
    $href = $m.Groups[1].Value
    if ($href -match "^(mailto:|tel:)") { continue }
    $abs = Get-AbsoluteUrl $baseUrl $href
    [void]$urls.Add($abs)
  }

  # <script src="...">
  foreach ($m in [regex]::Matches($html, $patternScript, "IgnoreCase")) {
    $src = $m.Groups[1].Value
    if ([string]::IsNullOrWhiteSpace($src)) { continue }
    $abs = Get-AbsoluteUrl $baseUrl $src
    [void]$urls.Add($abs)
  }

  return $urls
}

function Extract-CssUrls([string]$css, [string]$baseUrl) {
  $urls = New-Object System.Collections.Generic.HashSet[string]
  foreach ($m in [regex]::Matches($css, "url\\(([^\\)]+)\\)", "IgnoreCase")) {
    $raw = $m.Groups[1].Value.Trim()
    $raw = $raw.Trim("'").Trim('"')
    if ([string]::IsNullOrWhiteSpace($raw)) { continue }
    if ($raw -match "^data:") { continue }
    $abs = Get-AbsoluteUrl $baseUrl $raw
    [void]$urls.Add($abs)
  }
  return $urls
}

if ([string]::IsNullOrWhiteSpace($OutDir)) {
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $OutDir = Join-Path (Get-Location) "Docs\\_scrapes\\rh.design\\$stamp"
}

New-Dir $OutDir

Write-Host "Scraping $Url -> $OutDir"

$html = Download-Text $Url
Save-Text (Join-Path $OutDir "index.html") $html

$assets = Extract-AssetUrls $html $Url

$manifest = [ordered]@{
  url = $Url
  scraped_at = (Get-Date).ToString("o")
  out_dir = $OutDir
  files = @()
}

function Save-Asset([string]$assetUrl) {
  $u = [uri]$assetUrl
  $ext = [IO.Path]::GetExtension($u.AbsolutePath)
  if ($null -eq $ext) { $ext = "" }
  $ext = $ext.ToLowerInvariant()
  $folder = "other"
  if ($ext -eq ".css") { $folder = "css" }
  elseif ($ext -eq ".js") { $folder = "js" }
  elseif ($ext -match "^\\.(png|jpg|jpeg|webp|avif|gif|svg)$") { $folder = "img" }
  elseif ($ext -match "^\\.(woff2|woff|ttf|otf|eot)$") { $folder = "fonts" }

  $name = To-FileName $assetUrl
  $path = Join-Path $OutDir (Join-Path $folder $name)

  if (Test-Path $path) { return $path }

  try {
    if ($ext -eq ".css" -or $ext -eq ".js" -or $ext -eq ".svg") {
      $content = Download-Text $assetUrl
      Save-Text $path $content
    } else {
      $bytes = Download-Bytes $assetUrl
      Save-Bytes $path $bytes
    }
    return $path
  } catch {
    return $null
  }
}

foreach ($a in $assets) {
  $saved = Save-Asset $a
  $manifest.files += [ordered]@{ url = $a; saved = $saved }
}

# Segunda pasada: bajar assets referenciados en CSS (fonts/images)
$cssFiles = Get-ChildItem -Path (Join-Path $OutDir "css") -File -ErrorAction SilentlyContinue
foreach ($f in $cssFiles) {
  $css = Get-Content -Raw $f.FullName
  $base = "https://$([uri]$Url).Host/"
  foreach ($u in (Extract-CssUrls $css $base)) {
    $saved = Save-Asset $u
    if ($saved) { $manifest.files += [ordered]@{ url = $u; saved = $saved } }
  }
}

Save-Text (Join-Path $OutDir "manifest.json") ($manifest | ConvertTo-Json -Depth 6)

Write-Host "Done. Saved: $($manifest.files.Count) references."
Write-Host "Index: $(Join-Path $OutDir 'index.html')"
Write-Host "Manifest: $(Join-Path $OutDir 'manifest.json')"
