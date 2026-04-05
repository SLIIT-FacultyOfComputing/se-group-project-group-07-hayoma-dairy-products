#!/bin/bash

# Cypress Test Report Merge Script
# This script merges multiple Mochawesome JSON reports into a single HTML report

REPORTS_DIR="cypress/reports"

echo "Merging Cypress test reports..."

if [ ! -d "$REPORTS_DIR" ]; then
  echo "Reports directory not found: $REPORTS_DIR"
  exit 1
fi

# Find all JSON report files
json_files=$(find "$REPORTS_DIR" -name "mochawesome*.json" 2>/dev/null | head -n 20)

if [ -z "$json_files" ]; then
  echo "No JSON reports found in $REPORTS_DIR"
  exit 1
fi

echo "Found JSON reports:"
echo "$json_files"

# Merge reports
npx mochawesome-merge "$REPORTS_DIR"/mochawesome*.json --output "$REPORTS_DIR"/report.json

# Generate HTML report
npx mochawesome-report-generator "$REPORTS_DIR"/report.json --output "$REPORTS_DIR"/report.html

echo "Report generation complete!"
echo "View report at: $REPORTS_DIR/report.html"
