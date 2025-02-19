param (
    [string]$folder
)

if (-not $folder) {
    Write-Host "Which folder do you want to deploy to GitHub Pages?"
    exit 1
}

git subtree push --prefix $folder origin gh-pages