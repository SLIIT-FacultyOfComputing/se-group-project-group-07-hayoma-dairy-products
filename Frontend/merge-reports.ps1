# Cypress Test Report Merge Script
# This script merges multiple Mochawesome JSON reports into a single HTML report
# Run: .\merge-reports.ps1

$REPORTS_DIR = "cypress/reports"

Write-Host "Merging Cypress test reports..." -ForegroundColor Green

if (-not (Test-Path $REPORTS_DIR)) {
    Write-Host "Reports directory not found: $REPORTS_DIR" -ForegroundColor Red
    exit 1
}

# Find all JSON report files
$json_files = Get-ChildItem -Path $REPORTS_DIR -Filter "mochawesome*.json" | Select-Object -ExpandProperty FullName

if ($json_files.Count -eq 0) {
    Write-Host "No JSON reports found in $REPORTS_DIR" -ForegroundColor Yellow
    exit 1
}

Write-Host "Found JSON reports:" -ForegroundColor Cyan
$json_files | ForEach-Object { Write-Host "  - $_" }

# Merge reports
Write-Host "`nMerging reports..." -ForegroundColor Green
$json_pattern = Join-Path $REPORTS_DIR "mochawesome*.json"
npx mochawesome-merge $json_pattern --output (Join-Path $REPORTS_DIR "report.json")

# Generate HTML report
Write-Host "`nGenerating HTML report..." -ForegroundColor Green
npx mochawesome-report-generator (Join-Path $REPORTS_DIR "report.json") --output (Join-Path $REPORTS_DIR "report.html")

Write-Host "`nReport generation complete!" -ForegroundColor Green
Write-Host "View report at: $REPORTS_DIR/report.html" -ForegroundColor Cyan
