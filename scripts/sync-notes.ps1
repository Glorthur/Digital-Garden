$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path (Split-Path -Parent $repoRoot) "notes"
$destination = Join-Path $repoRoot "content"

if (-not (Test-Path $source)) {
  throw "Notes folder not found: $source"
}

if (Test-Path $destination) {
  Remove-Item -LiteralPath $destination -Recurse -Force
}

New-Item -ItemType Directory -Path $destination -Force | Out-Null

Get-ChildItem -LiteralPath $source -Force | ForEach-Object {
  Copy-Item -LiteralPath $_.FullName -Destination $destination -Recurse -Force
}

foreach ($excluded in @(".obsidian", ".git")) {
  $excludedPath = Join-Path $destination $excluded
  if (Test-Path $excludedPath) {
    Remove-Item -LiteralPath $excludedPath -Recurse -Force
  }
}

Write-Output "Synced notes from $source to $destination"
