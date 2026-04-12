param(
  [string]$Message = "",
  [string]$Branch = "v4"
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$env:Path = "C:\Program Files\nodejs;C:\Program Files\Git\cmd;$env:Path"

Push-Location $repoRoot
try {
  if ([string]::IsNullOrWhiteSpace($Message)) {
    $Message = "Publish site $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  }

  & "C:\Program Files\nodejs\npm.cmd" run build

  & git add -A

  & git diff --cached --quiet
  if ($LASTEXITCODE -eq 0) {
    Write-Output "No changes to publish."
    exit 0
  }

  $currentBranch = (& git branch --show-current).Trim()
  if ($currentBranch -ne $Branch) {
    throw "Current branch is '$currentBranch'. Switch to '$Branch' before publishing."
  }

  & git commit -m $Message
  & git push origin $Branch
} finally {
  Pop-Location
}
