<#
Downloads the Supabase CLI Windows binary and adds it to the current user's PATH.

Usage (PowerShell - run as normal user):
  ./scripts/install-supabase.ps1

Notes:
- This installs to "$env:USERPROFILE\tools\supabase" and updates the user PATH via `setx`.
- You must restart any open shells for PATH changes to take effect.
- If you prefer a different location, set the $InstallDir variable.
#>

param()

try {
    $ErrorActionPreference = 'Stop'

    $InstallDir = Join-Path $env:USERPROFILE 'tools\supabase'
    $ExePath = Join-Path $InstallDir 'supabase.exe'
    if (-not (Test-Path $InstallDir)) {
        New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    }

    Write-Host "Downloading Supabase CLI to $ExePath ..."
    $latestUrl = 'https://github.com/supabase/cli/releases/latest/download/supabase-windows-amd64.exe'
    Invoke-WebRequest -Uri $latestUrl -OutFile $ExePath -UseBasicParsing

    Write-Host "Download complete. Making executable and updating user PATH..."
    # Ensure file exists
    if (-not (Test-Path $ExePath)) {
        throw "Download failed: $ExePath not found"
    }

    # Add install dir to user PATH if missing
    $currentUserPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
    if (-not ($currentUserPath -split ';' | Where-Object { $_ -eq $InstallDir })) {
        $newPath = "$currentUserPath;$InstallDir"
        setx PATH $newPath | Out-Null
        Write-Host "Added $InstallDir to user PATH. Restart shells to pick up change."
    } else {
        Write-Host "$InstallDir already present in user PATH."
    }

    Write-Host "Supabase CLI installed at: $ExePath"
    Write-Host "Run 'supabase --version' in a new shell to verify."
} catch {
    Write-Error "Installation failed: $_"
    exit 1
}
