$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path (Split-Path -Parent $repoRoot) "notes"
$destination = Join-Path $repoRoot "content"
$excludeDirs = @(".obsidian", ".git")
$excludeExtensions = @(".canvas", ".base")
$excludeRelativePatterns = @(
  "Research & Writing\*",
  "Research & Writing\Literature Notes\*"
)

if (-not (Test-Path $source)) {
  throw "Notes folder not found: $source"
}

if (Test-Path $destination) {
  Remove-Item -LiteralPath $destination -Recurse -Force
}

New-Item -ItemType Directory -Path $destination -Force | Out-Null

$sourceResolved = (Resolve-Path -LiteralPath $source).Path

Get-ChildItem -LiteralPath $sourceResolved -Recurse -Force | ForEach-Object {
  $full = $_.FullName

  if ($_.PSIsContainer) {
    return
  }

  # Skip Obsidian config dirs anywhere in the tree.
  foreach ($d in $excludeDirs) {
    if ($full -match [regex]::Escape([IO.Path]::DirectorySeparatorChar + $d + [IO.Path]::DirectorySeparatorChar)) {
      return
    }
  }

  if ($excludeExtensions -contains $_.Extension) {
    return
  }

  $relative = $full.Substring($sourceResolved.Length).TrimStart([IO.Path]::DirectorySeparatorChar)

  foreach ($pattern in $excludeRelativePatterns) {
    if ($relative -like $pattern) {
      return
    }
  }

  $destPath = Join-Path $destination $relative
  $destDir = Split-Path -Parent $destPath

  if (-not (Test-Path -LiteralPath $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
  }

  Copy-Item -LiteralPath $full -Destination $destPath -Force
}

Write-Output "Synced notes from $source to $destination"
