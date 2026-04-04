$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$env:Path = "C:\Program Files\nodejs;C:\Program Files\Git\cmd;$env:Path"

Push-Location $repoRoot
try {
  # Avoid npm.ps1/npx.ps1 (blocked by ExecutionPolicy) by calling the .cmd shims explicitly.
  & "C:\Program Files\nodejs\npm.cmd" run sync-notes
  & "C:\Program Files\nodejs\npx.cmd" quartz sync
} finally {
  Pop-Location
}
