$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path (Split-Path -Parent $repoRoot) "Everything"
$destination = Join-Path $repoRoot "content"

if (-not (Test-Path $source)) {
  throw "Notes folder not found: $source"
}

if (Test-Path $destination) {
  Remove-Item -LiteralPath $destination -Recurse -Force
}

New-Item -ItemType Directory -Path $destination -Force | Out-Null

robocopy $source $destination /E /NFL /NDL /NJH /NJS /NP | Out-Null

if ($LASTEXITCODE -gt 7) {
  throw "robocopy failed with exit code $LASTEXITCODE"
}

foreach ($excluded in @(".obsidian", ".git")) {
  $excludedPath = Join-Path $destination $excluded
  if (Test-Path $excludedPath) {
    Remove-Item -LiteralPath $excludedPath -Recurse -Force
  }
}

Write-Output "Synced notes from $source to $destination"
